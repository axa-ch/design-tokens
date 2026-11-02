import {
  breakpointQueries,
  splitResponsiveTokens,
} from "./responsive-helpers.js";

const mobileViewport = "xs";
const desktopViewport = "lg";
const identifierPattern = /^[A-Za-z_$][\w$]*$/;
const indexPattern = /^(0|[1-9]\d*)$/;
const referencePattern = /^\{([^{}]+)\}$/;

const toCamelCase = (segment) =>
  segment
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toLowerCase() + word.slice(1)
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join("");

export const formatKey = (key) =>
  identifierPattern.test(key) || indexPattern.test(key)
    ? key
    : JSON.stringify(key);

export const formatAccessor = ([root, ...keys]) =>
  root +
  keys
    .map((key) =>
      identifierPattern.test(key)
        ? `.${key}`
        : `[${indexPattern.test(key) ? key : JSON.stringify(key)}]`,
    )
    .join("");

const isPrefix = (prefix, keys) =>
  prefix.length <= keys.length &&
  prefix.every((key, index) => key === keys[index]);

const sortByDependencies = (items, getDependencies, describe) => {
  const sorted = [];
  const states = new Map();
  const visit = (item) => {
    if (states.get(item) === "done") return;
    if (states.get(item) === "visiting") {
      throw new Error(`Reference cycle through ${describe(item)}.`);
    }
    states.set(item, "visiting");
    getDependencies(item).forEach(visit);
    states.set(item, "done");
    sorted.push(item);
  };

  items.forEach(visit);
  return sorted;
};

// Tree of Maps (groups) and leaves: { keys, literal } or { keys, reference, viewport }.
export const buildResponsiveObject = (dictionary) => {
  const { sortedBreakpointTokens, variableTokens, desktopOverrides } =
    splitResponsiveTokens(dictionary);
  const root = new Map();
  const sources = new Map();
  const leaves = [];

  const insert = (keys, leaf, source) => {
    if (keys.some((key) => key === "")) {
      throw new Error(`Token "${source}" has a path segment without letters or digits.`);
    }
    if (!identifierPattern.test(keys[0])) {
      throw new Error(`Token "${source}" maps to the invalid export name "${keys[0]}".`);
    }

    let node = root;
    keys.forEach((key, index) => {
      const pathKey = keys.slice(0, index + 1).join("\0");
      const existing = node.get(key);
      const isLeaf = index === keys.length - 1;

      if (existing && (isLeaf || !(existing instanceof Map))) {
        throw new Error(
          `Tokens "${sources.get(pathKey)}" and "${source}" both map to "${formatAccessor(keys.slice(0, index + 1))}".`,
        );
      }
      if (!existing) {
        node.set(key, isLeaf ? leaf : new Map());
        sources.set(pathKey, source);
      }
      node = node.get(key);
    });
    leaves.push(leaf);
  };

  const createLeaf = (keys, token, viewport) => {
    const match =
      typeof token.original.value === "string" &&
      token.original.value.match(referencePattern);

    return match
      ? { keys, reference: match[1], viewport }
      : { keys, literal: token.value };
  };

  sortedBreakpointTokens.forEach((token, index, tokens) => {
    const viewport = toCamelCase(token.path.at(-1));
    const { up, down, only } = breakpointQueries(token, index, tokens);
    const source = token.path.join(".");

    insert(["breakpoint", viewport], { literal: token.value }, source);
    insert(["media", "up", viewport], { literal: up }, source);
    insert(["media", "down", viewport], { literal: down }, source);
    insert(["media", "only", viewport], { literal: only }, source);
  });

  const desktopTokensByPath = new Map(
    desktopOverrides.map((token) => [token.path.slice(1).join("."), token]),
  );
  const keysByPath = new Map();

  variableTokens.forEach((token) => {
    const path = token.path.join(".");
    const keys = token.path.map(toCamelCase);
    const desktopToken = desktopTokensByPath.get(path);

    keysByPath.set(path, keys);
    if (desktopToken) {
      const mobileKeys = [...keys, mobileViewport];
      const desktopKeys = [...keys, desktopViewport];
      insert(mobileKeys, createLeaf(mobileKeys, token, mobileViewport), path);
      insert(desktopKeys, createLeaf(desktopKeys, desktopToken, desktopViewport), path);
    } else {
      insert(keys, createLeaf(keys, token), path);
    }
  });

  const referenceLeaves = leaves.filter((leaf) => leaf.reference);

  referenceLeaves.forEach((leaf) => {
    const targetKeys = keysByPath.get(leaf.reference);

    if (!targetKeys) {
      throw new Error(`Reference "{${leaf.reference}}" doesn't point at an exported token.`);
    }
    // Inside a responsive token, point at the matching viewport of a responsive target.
    leaf.targetKeys =
      leaf.viewport && desktopTokensByPath.has(leaf.reference)
        ? [...targetKeys, leaf.viewport]
        : targetKeys;
    leaf.deferred = leaf.targetKeys[0] === leaf.keys[0];
  });

  const groupDependencies = new Map([...root.keys()].map((name) => [name, new Set()]));
  referenceLeaves
    .filter((leaf) => !leaf.deferred)
    .forEach((leaf) => groupDependencies.get(leaf.keys[0]).add(leaf.targetKeys[0]));

  const groupNames = sortByDependencies(
    [...root.keys()],
    (name) => groupDependencies.get(name),
    (name) => `the "${name}" group`,
  );

  const deferredLeaves = referenceLeaves.filter((leaf) => leaf.deferred);
  const deferred = sortByDependencies(
    deferredLeaves,
    (leaf) => deferredLeaves.filter((other) => isPrefix(leaf.targetKeys, other.keys)),
    (leaf) => `"${formatAccessor(leaf.keys)}"`,
  );

  const getNode = (keys) => keys.reduce((node, key) => node.get(key), root);
  const valueOf = (node) => {
    if (node instanceof Map) {
      return Object.fromEntries(
        [...node].map(([key, child]) => [key, valueOf(child)]),
      );
    }
    return "literal" in node ? node.literal : valueOf(getNode(node.targetKeys));
  };

  return {
    groups: groupNames.map((name) => ({ name, node: root.get(name) })),
    deferred,
    valueOf,
  };
};

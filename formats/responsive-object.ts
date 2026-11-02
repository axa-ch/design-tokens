import type { Dictionary, TransformedToken } from "style-dictionary/types";
import { breakpointQueries, splitResponsiveTokens } from "./responsive-helpers";

const mobileViewport = "xs";
const desktopViewport = "lg";
const identifierPattern = /^[A-Za-z_$][\w$]*$/;
const indexPattern = /^(0|[1-9]\d*)$/;
const referencePattern = /^\{([^{}]+)\}$/;

type LiteralLeaf = { keys: string[]; literal: unknown };
type ReferenceLeaf = {
  keys: string[];
  reference: string;
  viewport?: string;
  targetKeys?: string[];
  deferred?: boolean;
};
type ResponsiveLeaf = LiteralLeaf | ReferenceLeaf;
type ResponsiveNode = Map<string, ResponsiveNode> | ResponsiveLeaf;
type ResolvedReferenceLeaf = ReferenceLeaf & {
  targetKeys: string[];
  deferred: boolean;
};

type ResponsiveGroup = { name: string; node: ResponsiveNode };

type ResponsiveObject = {
  groups: ResponsiveGroup[];
  deferred: ResolvedReferenceLeaf[];
  valueOf: (node: ResponsiveNode) => unknown;
};

export const getReferenceTargetKeys = (leaf: ReferenceLeaf): string[] => {
  if (leaf.targetKeys === undefined) {
    throw new Error(`Reference "{${leaf.reference}}" has not been resolved.`);
  }

  return leaf.targetKeys;
};

export const toCamelCase = (segment: string) =>
  segment
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toLowerCase() + word.slice(1)
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join("");

export const formatKey = (key: string) =>
  identifierPattern.test(key) || indexPattern.test(key)
    ? key
    : JSON.stringify(key);

export const formatAccessor = ([root, ...keys]: string[]) =>
  root +
  keys
    .map((key) =>
      identifierPattern.test(key)
        ? `.${key}`
        : `[${indexPattern.test(key) ? key : JSON.stringify(key)}]`,
    )
    .join("");

const isPrefix = (prefix: string[], keys: string[]) =>
  prefix.length <= keys.length &&
  prefix.every((key, index) => key === keys[index]);

const sortByDependencies = <T>(
  items: T[],
  getDependencies: (item: T) => Iterable<T>,
  describe: (item: T) => string,
) => {
  const sorted: T[] = [];
  const states = new Map<T, "done" | "visiting">();
  const visit = (item: T) => {
    if (states.get(item) === "done") {
      return;
    }

    if (states.get(item) === "visiting") {
      throw new Error(`Reference cycle through ${describe(item)}.`);
    }

    states.set(item, "visiting");

    for (const dependency of getDependencies(item)) {
      visit(dependency);
    }

    states.set(item, "done");
    sorted.push(item);
  };

  items.forEach(visit);
  return sorted;
};

export const buildResponsiveObject = (
  dictionary: Dictionary,
): ResponsiveObject => {
  const { sortedBreakpointTokens, variableTokens, desktopOverrides } =
    splitResponsiveTokens(dictionary);

  const root = new Map<string, ResponsiveNode>();
  const sources = new Map<string, string>();
  const leaves: ResponsiveLeaf[] = [];

  const insert = (keys: string[], leaf: ResponsiveLeaf, source: string) => {
    if (keys.some((key) => key === "")) {
      throw new Error(
        `Token "${source}" has a path segment without letters or digits.`,
      );
    }

    if (!identifierPattern.test(keys[0])) {
      throw new Error(
        `Token "${source}" maps to the invalid export name "${keys[0]}".`,
      );
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
        node.set(key, isLeaf ? leaf : new Map<string, ResponsiveNode>());
        sources.set(pathKey, source);
      }

      if (!isLeaf) {
        const child = node.get(key);

        if (!(child instanceof Map)) {
          throw new Error(`Token path "${source}" collides with a value.`);
        }

        node = child;
      }
    });

    leaves.push(leaf);
  };

  const createLeaf = (
    keys: string[],
    token: TransformedToken,
    viewport?: string,
  ): ResponsiveLeaf => {
    const match =
      typeof token.original.value === "string" &&
      token.original.value.match(referencePattern);

    return match
      ? { keys, reference: match[1], viewport }
      : { keys, literal: token.value };
  };

  sortedBreakpointTokens.forEach((token, index, tokens) => {
    const queries = breakpointQueries(token, index, tokens);
    const viewport = toCamelCase(queries.viewport);
    const { up, down, only } = queries;
    const source = token.path.join(".");

    insert(
      ["breakpoint", viewport],
      { keys: ["breakpoint", viewport], literal: token.value },
      source,
    );
    insert(
      ["media", "up", viewport],
      { keys: ["media", "up", viewport], literal: up },
      source,
    );
    insert(
      ["media", "down", viewport],
      { keys: ["media", "down", viewport], literal: down },
      source,
    );
    insert(
      ["media", "only", viewport],
      { keys: ["media", "only", viewport], literal: only },
      source,
    );
  });

  const desktopTokensByPath = new Map(
    desktopOverrides.map((token) => [token.path.slice(1).join("."), token]),
  );
  const keysByPath = new Map<string, string[]>();

  variableTokens.forEach((token) => {
    const path = token.path.join(".");
    const keys = token.path.map(toCamelCase);
    const desktopToken = desktopTokensByPath.get(path);

    keysByPath.set(path, keys);

    if (desktopToken) {
      const mobileKeys = [...keys, mobileViewport];
      const desktopKeys = [...keys, desktopViewport];
      insert(mobileKeys, createLeaf(mobileKeys, token, mobileViewport), path);
      insert(
        desktopKeys,
        createLeaf(desktopKeys, desktopToken, desktopViewport),
        path,
      );
    } else {
      insert(keys, createLeaf(keys, token), path);
    }
  });

  const referenceLeaves = leaves.filter(
    (leaf): leaf is ReferenceLeaf => "reference" in leaf,
  );

  referenceLeaves.forEach((leaf) => {
    const targetKeys = keysByPath.get(leaf.reference);

    if (!targetKeys) {
      throw new Error(
        `Reference "{${leaf.reference}}" doesn't point at an exported token.`,
      );
    }

    leaf.targetKeys =
      leaf.viewport && desktopTokensByPath.has(leaf.reference)
        ? [...targetKeys, leaf.viewport]
        : targetKeys;
    leaf.deferred = leaf.targetKeys[0] === leaf.keys[0];
  });

  const groupDependencies = new Map(
    [...root.keys()].map((name) => [name, new Set<string>()]),
  );
  referenceLeaves
    .filter((leaf): leaf is ResolvedReferenceLeaf => leaf.deferred === false)
    .forEach((leaf) => {
      groupDependencies.get(leaf.keys[0])?.add(leaf.targetKeys[0]);
    });

  const groupNames = sortByDependencies(
    [...root.keys()],
    (name) => groupDependencies.get(name) ?? [],
    (name) => `the "${name}" group`,
  );

  const deferred = referenceLeaves.filter(
    (leaf): leaf is ResolvedReferenceLeaf => leaf.deferred === true,
  );
  const sortedDeferred = sortByDependencies(
    deferred,
    (leaf) => deferred.filter((other) => isPrefix(leaf.targetKeys, other.keys)),
    (leaf) => `"${formatAccessor(leaf.keys)}"`,
  );

  const getNode = (keys: string[]): ResponsiveNode => {
    let node: ResponsiveNode = root;

    for (const key of keys) {
      if (!(node instanceof Map)) {
        throw new Error(`Reference target "${keys.join(".")}" is not a group.`);
      }

      const child = node.get(key);

      if (!child) {
        throw new Error(`Reference target "${keys.join(".")}" was not found.`);
      }

      node = child;
    }

    return node;
  };

  const resolveValue = (node: ResponsiveNode): unknown => {
    if (node instanceof Map) {
      return Object.fromEntries(
        [...node].map(([key, child]) => [key, resolveValue(child)]),
      );
    }

    return "literal" in node
      ? node.literal
      : resolveValue(getNode(getReferenceTargetKeys(node)));
  };

  return {
    groups: groupNames.map((name) => {
      const node = root.get(name);

      if (node === undefined) {
        throw new Error(`Export group "${name}" was not found.`);
      }

      return { name, node };
    }),
    deferred: sortedDeferred,
    valueOf: resolveValue,
  };
};

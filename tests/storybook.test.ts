import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { compileString } from "sass";
import StyleDictionary from "style-dictionary";
import config from "../config";
import { TokenDocumentation } from "../stories/components/token-documentation/token-documentation";

test("the build generates semantic-token category stories without primitives", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "axa-storybook-"));
  try {
    const dictionary = new StyleDictionary({
      ...config,
      platforms: Object.fromEntries(
        Object.entries(config.platforms).map(([name, platform]) => [
          name,
          { ...platform, buildPath: `${directory}/${name}/` },
        ]),
      ),
    });
    await dictionary.buildAllPlatforms();
    const catalog = JSON.parse(
      await readFile(join(directory, "storybook/catalog.json"), "utf8"),
    );
    assert.deepEqual(
      catalog.categories.map((category: { name: string }) => category.name),
      [
        "Breakpoints", "Colors", "Containers", "Effects", "Grid",
        "Motion", "Shapes", "Spacing", "Typography",
      ],
    );
    const colors = catalog.categories.find(
      (category: { name: string }) => category.name === "Colors",
    );
    assert.ok(colors.tokens.some((token: { path: string }) => token.path === "bg.base"));
    assert.ok(colors.tokens.some((token: { path: string }) =>
      token.path === "bg.interaction.secondary.soft.default"));
    assert.deepEqual(catalog.categories.flatMap(
      (category: { tokens: { path: string }[] }) =>
        category.tokens.filter((token) =>
          /^(white|gray|dimension|desktop-mode)\./.test(token.path)),
    ), []);
    assert.ok(catalog.categories.find(
      (category: { name: string }) => category.name === "Typography",
    ).tokens.some((token: { path: string }) => token.path === "fontSize.16"));
    const stories = await readFile(
      join(directory, "storybook/tokens.stories.tsx"), "utf8",
    );
    assert.match(stories, /export const Colors/);
    assert.match(stories, /export const Typography/);
    await t.test("documents actual platform APIs and pairs responsive values", () => {
      const find = (path: string) => {
        const token = catalog.categories.flatMap(
          (category: { tokens: { path: string }[] }) => category.tokens,
        ).find((token: { path: string }) => token.path === path);
        assert.ok(token, `Missing token ${path}`);
        return token;
      };
      const background = find("bg.base");
      assert.equal(background.value, "#ffffff");
      assert.match(background.description, /standard background/);
      assert.equal(background.usage.css, ".example { background-color: var(--axa-bg-base); }");
      assert.match(background.usage.scss, /@include tokens\.axa-tokens\(\)/);
      assert.match(background.usage.scss, /var\(--axa-bg-base\)/);
      assert.doesNotMatch(background.usage.scss, /\$axa-bg-base/);
      assert.match(background.usage.js, /import \{ bg \}/);
      assert.match(background.usage.js, /bg\.base/);
      assert.match(background.usage.tailwind, /bg-bg-base/);
      for (const [root, prefix] of [["text", "text"], ["stroke", "border"], ["focus", "outline"]]) {
        const color = colors.tokens.find((token: { path: string }) =>
          token.path.startsWith(`${root}.`),
        );
        assert.ok(color, `Missing ${root} color example`);
        assert.ok(color.usage.tailwind.includes(`class="${prefix}-${color.name}"`));
      }
      const title = find("title.serif.lg.font-size");
      assert.equal(title.value, 32);
      assert.equal(title.desktopValue, 40);
      assert.equal(catalog.desktopBreakpoint, "992px");
      assert.match(title.usage.css, /calc\(var\(--axa-title-serif-lg-font-size\) \* 1px\)/);
      assert.match(title.usage.js, /title\.serif\.lg\.fontSize\.xs/);
      assert.match(title.usage.js, /title\.serif\.lg\.fontSize\.lg/);
      assert.match(title.usage.tailwind, /text-title-serif-lg/);
      assert.equal(title.preview.style["font-size"], "32px");
      assert.equal(title.preview.style["line-height"], "40px");
      assert.equal(title.desktopPreview.style["font-size"], "40px");
      assert.equal(title.desktopPreview.style["line-height"], "48px");
      assert.match(find("device.lg").usage.css, /@media \(--axa-media-up-lg\)/);
      assert.match(find("device.lg").usage.js, /media\.up\.lg/);
      assert.match(find("column.lg").usage.tailwind, /No generated Tailwind utility/);
      assert.match(find("xs").usage.css, /calc\(var\(--axa-xs\) \* 1ms\)/);
    });
    await t.test("renders generated category documentation with copyable platform examples", () => {
      const html = renderToStaticMarkup(createElement(TokenDocumentation, {
        category: colors,
        desktopBreakpoint: catalog.desktopBreakpoint,
      }));
      assert.match(html, /bg\.base/);
      assert.match(html, /standard background surfaces/);
      assert.match(html, /Copy CSS example/);
      assert.match(html, /Copy SCSS example/);
      assert.match(html, /Copy JavaScript example/);
      assert.match(html, /Copy Tailwind example/);
      assert.match(html, /#ffffff/);
      assert.doesNotMatch(html, />white\.100</);
    });
    await t.test("examples match generated CSS, SCSS, JavaScript and both Tailwind outputs", async () => {
      const css = await readFile(join(directory, "css/tokens.css"), "utf8");
      assert.match(css, /--axa-bg-base: var\(--axa-white-100\)/);
      assert.match(css, /--axa-title-serif-lg-font-size:/);
      const background = colors.tokens.find(
        (token: { path: string }) => token.path === "bg.base",
      );
      const compiled = compileString(background.usage.scss.replace(
        "./build/scss/tokens.scss", "tokens.scss",
      ), { loadPaths: [join(directory, "scss")] }).css;
      assert.match(compiled, /background-color: var\(--axa-bg-base\)/);
      assert.match(compiled, /@media \(min-width: 992px\)/);
      const js = await import(pathToFileURL(join(directory, "js/tokens.js")).href);
      assert.equal(js.bg.base, "#ffffff");
      assert.equal(js.title.serif.lg.fontSize.xs, 32);
      assert.equal(js.title.serif.lg.fontSize.lg, 40);
      assert.equal(js.media.up.lg, "(min-width: 992px)");
      const preset = await import(pathToFileURL(join(directory, "tailwind/tokens.js")).href);
      assert.equal(preset.default.theme.extend.colors["bg-base"], "#ffffff");
      assert.deepEqual(preset.default.theme.extend.fontSize["title-serif-lg"], [
        "var(--axa-tailwind-title-serif-lg-font-size)",
        { lineHeight: "var(--axa-tailwind-title-serif-lg-line-height)" },
      ]);
      const theme = await readFile(join(directory, "tailwind-theme-css/theme.css"), "utf8");
      assert.match(theme, /--color-bg-base: #ffffff/);
      assert.match(theme, /--text-title-serif-lg: var\(--axa-tailwind-title-serif-lg-font-size\)/);
      const initialCatalog = await readFile(join(directory, "storybook/catalog.json"), "utf8");
      await dictionary.cleanPlatform("storybook");
      await dictionary.buildPlatform("storybook");
      assert.equal(
        await readFile(join(directory, "storybook/catalog.json"), "utf8"),
        initialCatalog,
      );
    });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

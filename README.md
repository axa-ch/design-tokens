# AXA Design Tokens

Run `npm run build` to generate CSS, SCSS, JavaScript/TypeScript and Tailwind
outputs from `tokens/**/*.json`, plus generated Storybook documentation.
Run `npm test` to validate documentation generation and rendering.

## Storybook demo

Run `npm run storybook` to build the tokens and start the demo on port 6006.
Run `npm run build-storybook` to build the static Storybook site.
The `storybook` Style Dictionary platform writes `build/storybook/catalog.json`
and `build/storybook/tokens.stories.tsx` on every build. These generated files are
ignored by Git and cleaned with the other platform outputs. Do not edit them.

Stories are grouped by the exported token collections: Colors, Typography,
Spacing, Shapes, Effects, Breakpoints, Containers, Grid and Motion. Collections
named "primitives" are excluded. Tokens also defined in a non-primitive
collection remain documented, including foundations stored in Typography.
Supplemental files in `tokens/primitives/` still participate in resolving values;
their presence does not hide a token also defined in a documented collection.
Figma publishing visibility does not affect documentation.

Each token page includes descriptions where supplied, resolved values,
type-appropriate previews, Mobile/Desktop values and copyable CSS, SCSS,
JavaScript and Tailwind usage. Related typography and shadow values are combined
for previews. Tailwind examples use the same mapping as both Tailwind outputs;
unmapped tokens are explicitly identified. The Platforms page documents setup
for all outputs, including both Tailwind integrations. Welcome and migration
pages remain handwritten, as do the reusable documentation components.

CSS custom-media queries require a custom-media processor. SCSS emits native
responsive queries through `@include tokens.axa-tokens()`; individual token
values are CSS custom properties, not Sass variables. JavaScript responsive
values must be selected explicitly by the consumer.

## Tailwind JavaScript preset

The `tailwind` platform generates `build/tailwind/tokens.js`, an ES module preset
that extends Tailwind's default theme:

```js
import axaTokens from "./build/tailwind/tokens.js";

export default {
  presets: [axaTokens],
  content: ["./src/**/*.{html,js,ts,tsx}"],
};
```

Also import the generated responsive variables in your application stylesheet:

```css
@import "./build/tailwind/tokens.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Tailwind v4 CSS theme

The `tailwind-theme-css` platform generates a standalone
`build/tailwind/theme.css`. Import it after Tailwind:

```css
@import "tailwindcss";
@import "./build/tailwind/theme.css";
```

This file includes both the `@theme inline` declarations and the responsive
variables; it does not require the JavaScript preset or its companion stylesheet.
Adjust the relative paths in these examples to match your application.

## Token mappings

Both platforms share the same mappings:

| Tokens | Tailwind theme |
| --- | --- |
| Color tokens | `colors` / `--color-*` |
| `device.*` | `screens` / `--breakpoint-*` |
| `dimension.*`, `gap.*`, `padding.*` | `spacing` / `--spacing-*` |
| `radius.*` | `borderRadius` / `--radius-*` |
| Font families and weights | `fontFamily`, `fontWeight` / `--font-*`, `--font-weight-*` |
| Font sizes and paired line heights | `fontSize`, `lineHeight` / `--text-*`, `--leading-*` |
| Letter spacing | `letterSpacing` / `--tracking-*` |
| `blur.size.*` | `blur` / `--blur-*` |
| `stroke.width.*` | `borderWidth` / `--border-width-*` |
| `container.size.*` | `maxWidth` / `--container-*` |
| `drop-shadow.*` geometry | `boxShadow` / `--shadow-*` |

Names use kebab case. For example, `bg.base` becomes `bg-bg-base`,
`gap.sm` becomes `gap-gap-sm`, and `title.serif.lg` becomes `text-title-serif-lg`.
Numbers representing lengths use pixels; `radius.circle` uses percent.
Shadow colors are optional and otherwise inherit CSS `currentColor`.

Typography uses Mobile values by default and switches to Desktop values at
`device.lg` (currently 992px), without separate desktop utility names.
Both platforms require `device.lg`; Desktop tokens must have Mobile counterparts.
Tokens without a mapping, such as grid column counts, are not exposed as utilities.

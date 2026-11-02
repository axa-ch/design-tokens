# AXA Design Tokens

Run `npm run build` to generate CSS, SCSS, JavaScript/TypeScript and Tailwind
outputs from `tokens/**/*.json`. Run `npm test` to validate the Tailwind outputs.

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

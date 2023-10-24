# AXA CH Design Tokens

[![Build Status][ci-image]][ci-url]
[![MIT License][license-image]][license-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]

The AXA CH Design Tokens project exports design tokens for use in multiple technologies. The following technologies are supported:

- CSS Variables + Media Queries with [@custom-media](https://drafts.csswg.org/mediaqueries-5/#custom-mq)
- SCSS Variables
- JS/TS Variables
- Tailwind Config

If you need our design tokens for a web project you might check this [Online demo](https://axa-ch.github.io/design-tokens)

## Supported Tokens

The project supports the following design tokens:

- Animation: Variables needed to handle component animations.
- Breakpoints/Media Queries: AXA viewport breakpoints and additional media query utilities.
- Color: AXA colors.
- Radius: Box radius variables.
- Shadow: Box shadow variables.
- Spacing: AXA Design System spacing variables.
- Typography: AXA Design System font styles.

## Installation

To install the AXA CH Design Tokens, run the following command:

```shell
npm i @axa-ch/design-tokens
```

## Usage

To use the AXA CH Design Tokens in your project, import them based on your technology. Here are some implementation examples that may inspire you:

### CSS Usage

You can import the CSS variables into your files as follows:

```css
@import url('@axa-ch/design-tokens/tokens.css');

.component {
  width: var(--spacing-base-3);
}
```

Note that for CSS media queries via [@custom-media](https://drafts.csswg.org/mediaqueries-5/#custom-mq) you will need a [postCSS plugin](https://github.com/csstools/postcss-custom-media)

```css
@import url('@axa-ch/design-tokens/tokens.css');

.component {
  width: var(--spacing-base-3);

  @media (--mq-respond-up-sm) {
    width: var(--spacing-base-6);
  }
}
```

#### Plain CSS

If you want to simply import the pre-bundled css variables without relying on a build process, you can import the minified `tokens.min.css` file as follows:

```html
<link
  rel="stylesheet"
  href="@axa-ch/design-tokens/tokens.min.css"
/>
```

Note that the css above doesn't contain `@custom-media` variables because this directive is not yet supported by any modern browser.

### SCSS Usage

You can import the SCSS variables into your files as follows:

```scss
@use '@axa-ch/design-tokens/tokens.scss';

.component {
  width: tokens.$spacing-base-3;

  @media (tokens.$mq-respond-up-sm) {
    width: tokens.$spacing-base-6;
  }
}
```

In case you want to import and scope the css variables into your SCSS application, without relying on the `:root` global selector, you might want to use our mixins as follows:

```scss
@use '@axa-ch/design-tokens/tokens.scss';

.component {
  // scope the css variables under the .component class
  @include tokens.get-animation-css-vars;
  @include tokens.get-breakpoints-css-vars;
  @include tokens.get-color-css-vars;
  @include tokens.get-radius-css-vars;
  @include tokens.get-shadow-css-vars;
  @include tokens.get-spacing-css-vars;
  @include tokens.get-typography-css-vars;
}
```

### JS/TS Usage

You can import the JS variables into your files as follows:

```ts
import * as tokens from '@axa-ch/design-tokens';

console.log(tokens.ColorBaseAxaBlue);
```

### Tailwind Usage

You can extend your `tailwind.config.js` file as follows:

```js
module.exports = {
  presets: [require('@axa-ch/design-tokens/tailwind.config')],
  // ...
};
```

### Figma usage

You can import the [`tokens.json`](https://raw.githubusercontent.com/axa-ch/design-tokens/main/tokens.json) into figma via [Tokens Studio Plugin](https://docs.tokens.studio/).
This will allow to sync your figma library with the tokens exposed in this project.

[ci-image]: https://img.shields.io/github/actions/workflow/status/axa-ch/design-tokens/ci.yml?style=flat-square&branch=main
[ci-url]: https://github.com/axa-ch/design-tokens/actions
[license-image]: http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]: LICENSE
[npm-version-image]: https://img.shields.io/npm/v/@axa-ch/design-tokens.svg?style=flat-square
[npm-downloads-image]: https://img.shields.io/npm/dm/@axa-ch/design-tokens.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@axa-ch/design-tokens

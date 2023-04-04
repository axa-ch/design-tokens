# AXA CH Design Tokens

This projects exports the AXA Design Tokens for multiple technologies.
The following technologies are supported:

- CSS Variables + Media Queries with [@custom-media](https://drafts.csswg.org/mediaqueries-5/#custom-mq)
- SCSS Variables
- JS/TS Variables
- Tailwind Config

## Supported Tokens

- Animation -> Variables needed to handle component animations
- Breakpoints/Media Queries -> AXA Viewport breakpoints and additional media queries utils
- Color -> AXA colors
- Radius -> Box radius variables
- Shadow -> Box shadow variables
- Spacing -> AXA Design System spacings variables
- Typography -> AXA Design System font styles

## Installation

```shell
npm i @axa-ch/design-tokens
```

## Usage

Depending on your setup and technology you should be able to import the design tokens into your project without big problems.
Below you have some implementation examples that could inspire you:

### CSS Usage

You can simply import the CSS variables in your files as follows:

```css
@import url('@axa-ch/design-tokens/tokens.css');

.component {
  width: var(--spacing-base-3);
}
```

Notice that for the CSS media queries via [@custom-media](https://drafts.csswg.org/mediaqueries-5/#custom-mq) you will need a [postcss plugin](https://github.com/csstools/postcss-custom-media)

```css
@import url('@axa-ch/design-tokens/tokens.css');

.component {
  width: var(--spacing-base-3);

  @media (--mq-respond-up-sm) {
    width: var(--spacing-base-6);
  }
}
```

### SCSS Usage

You can simply import the SCSS variables in your files as follows:

```scss
@use '@axa-ch/design-tokens/tokens';

.component {
  width: tokens.$spacing-base-3;

  @media (tokens.$mq-respond-up-sm) {
    width: tokens.$spacing-base-6;
  }
}
```

### JS/TS Usage

You can simply import the JS variables in your files as follows:

```ts
import * as tokens from '@axa-ch/design-tokens';

console.log(tokens.ColorBaseAxaBlue);
```

### Tailwind Usage

You can extend you `tailwind.config.js` file as follows:

```js
module.exports = {
  presets: [require('@axa-ch/design-tokens/tailwind.config')],
  // ...
};
```

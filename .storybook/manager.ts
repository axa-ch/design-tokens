import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';
import { brand, gray } from '../build/js/tokens.js';

const theme = create({
  base: 'light',
  brandTitle: 'AXA',
  brandUrl: 'https://axa.ch',
  brandImage: 'images/logo-axa.svg',
  brandTarget: '_self',
  colorSecondary: brand.blue,
  appBg: gray[25],
  appBorderRadius: 0,
  inputBorderRadius: 0,
});

addons.setConfig({
  theme: theme,
});

import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';
import * as colors from '../build/js/color';

const theme = create({
  base: 'light',
  brandTitle: 'AXA',
  brandUrl: 'https://axa.ch',
  brandImage: 'images/logo-axa.svg',
  brandTarget: '_self',
  colorSecondary: colors.ColorBaseAxaBlue,
  appBg: colors.ColorGreyscale8,
  appBorderRadius: 0,
  inputBorderRadius: 0,
});

addons.setConfig({
  theme: theme,
});

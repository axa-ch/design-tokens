import { transformGroups } from 'style-dictionary/enums';
import type { PlatformConfig } from 'style-dictionary/types';
import { tailwindThemeCssFormatName } from '../formats/tailwind-theme-css';

export const tailwindThemeCss = {
  transformGroup: transformGroups.css,
  buildPath: 'build/tailwind/',
  files: [
    {
      destination: 'theme.css',
      format: tailwindThemeCssFormatName,
    },
  ],
} satisfies PlatformConfig;

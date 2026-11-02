import { transformGroups } from 'style-dictionary/enums';
import type { PlatformConfig } from 'style-dictionary/types';
import {
  tailwindFormatName,
  tailwindVariablesFormatName,
} from '../formats/tailwind';

export const tailwind = {
  transformGroup: transformGroups.css,
  buildPath: 'build/tailwind/',
  files: [
    {
      destination: 'tokens.js',
      format: tailwindFormatName,
    },
    {
      destination: 'tokens.css',
      format: tailwindVariablesFormatName,
    },
  ],
} satisfies PlatformConfig;

import styleDictionary from 'style-dictionary';
import { SHARED_TRANSFORM_LIST, MEDIA_QUERY_TOKEN_NAME } from './constants.js';

export const json = {
  buildPath: './',
  transforms: [...styleDictionary.hooks.transformGroups.web, ...SHARED_TRANSFORM_LIST, 'size/px'],
  files: [
    {
      destination: 'tokens.json',
      filter: (token) => token?.attributes?.category !== MEDIA_QUERY_TOKEN_NAME,
      format: 'json/tokens',
    },
  ],
};

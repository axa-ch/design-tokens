declare module 'style-dictionary/utils' {
  import type { LocalOptions, TransformedToken, PlatformConfig } from 'style-dictionary/types';

  export function outputReferencesFilter(token: TransformedToken, options: LocalOptions): boolean;
  export function outputReferencesTransformed(token: TransformedToken, options: LocalOptions): boolean;
  export function formattedVariables(config: PlatformConfig);
}

import { transformGroups } from "style-dictionary/enums";
import type { PlatformConfig } from "style-dictionary/types";
import {
  storybookCatalogFormatName,
  storybookStoriesFormatName,
} from "../formats/storybook";

export const storybook = {
  transformGroup: transformGroups.css,
  buildPath: "build/storybook/",
  files: [
    { destination: "catalog.json", format: storybookCatalogFormatName },
    { destination: "tokens.stories.tsx", format: storybookStoriesFormatName },
  ],
} satisfies PlatformConfig;

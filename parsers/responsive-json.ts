import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import type { DesignTokens, Parser } from "style-dictionary/types";

export const responsiveJsonParserName = "responsive-json";

export const responsiveJsonParser = {
  pattern: /\.json$/,
  parser: ({ contents, filePath }) => {
    const tokens = JSON.parse(contents) as DesignTokens;
    const isPairedDesktopFile =
      filePath?.endsWith("/Desktop.json") &&
      existsSync(join(dirname(filePath), "Mobile.json"));

    return isPairedDesktopFile ? { "desktop-mode": tokens } : tokens;
  },
} satisfies Omit<Parser, "name">;

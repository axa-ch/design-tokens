import StyleDictionary from "style-dictionary";
import config from "./config";

await new StyleDictionary(config).buildAllPlatforms();

import { isUndefined } from 'lodash-es';

export type RgbaObject = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

export type HexString = `#${string}`;
export type RgbaString = `rgba(${number}, ${number}, ${number}, ${number})`;

export const isHexColor = (value: string) => /^#[0-9A-F]{6}$/i.test(value);

// convert a rgba string into an objectt that can be parsed by sass
export const rgbaStringToRgbaObject = (rgba: string, name: string): RgbaObject => {
  const regex = /^rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/;
  const result = regex.exec(rgba);

  if (!result) throw new Error(`The value for ${name} doesn't seem to be an rgba string`);

  return {
    r: Number.parseInt(result[1], 10),
    g: Number.parseInt(result[2], 10),
    b: Number.parseInt(result[3], 10),
    a: Number.parseFloat(result[4]),
  };
};

// hex string into rgba object
export const hexToRgbaObject = (hex: HexString, name: string) => {
  if (isUndefined(hex)) throw new Error(`The value for ${name} is undefined`);
  if (!isHexColor(hex))
    throw new Error(`The value provided for ${name} doesn't seem to be in hex format. Current value: ${hex}`);

  try {
    return {
      r: Number.parseInt(hex.slice(1, 3), 16),
      g: Number.parseInt(hex.slice(3, 5), 16),
      b: Number.parseInt(hex.slice(5, 7), 16),
      a: 1,
    };
  } catch (error) {
    throw new Error(`The value for ${name} couldn't be properly converted into RGBA object`, { cause: error });
  }
};

// private helper to convert a value into hex
const toHex = (c: number): string => {
  const hex = c.toString(16);
  return hex.padStart(2, '0');
};

// Convert a rgb object into a hex string
export const rgbObjectToHexString = ({ r, g, b }: RgbaObject, name: string): HexString => {
  try {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  } catch (error) {
    throw new Error(`The value for ${name} couldn't be properly converted into hex string`, { cause: error });
  }
};

// borrowed from https://codepen.io/splintmi/pen/zwOLpO
// converting the alpha channel assuming that the background is white
export const rgbaStringToHexString = (color: RgbaString, name: string): HexString => {
  const channels = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

  if (!channels || channels.length !== 5) {
    throw new Error(`The value for ${name} doesn't seem to be an rgba string`);
  }
  const r = Math.round(Number(channels[1]) * Number(channels[4]) + 255 * (1 - Number(channels[4])));
  const g = Math.round(Number(channels[2]) * Number(channels[4]) + 255 * (1 - Number(channels[4])));
  const b = Math.round(Number(channels[3]) * Number(channels[4]) + 255 * (1 - Number(channels[4])));

  return rgbObjectToHexString({ r, g, b }, name);
};

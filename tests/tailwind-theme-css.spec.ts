import { describe, it, expect } from 'vitest';
import postcss, { type AtRule, type Declaration, type Rule } from 'postcss';
import { loadFile } from './utils';

const tailwindTheme = loadFile('/build/tailwind/tailwind-theme.css');

const getDeclarationsStartingWith = (filter: string) => {
  const root = postcss.parse(tailwindTheme);

  const tailwindThemeDeclarations = (root.nodes[0] as Rule).nodes.filter(
    ({ type }) => type === 'decl',
  ) as Declaration[];

  return tailwindThemeDeclarations.filter(({ prop }) => prop.startsWith(filter));
};

describe('Tailwind Theme specs', () => {
  it('Tokens get properly exported', () => {
    const root = postcss.parse(tailwindTheme);

    expect(root).toBeTypeOf('object');
    expect(root.nodes.length).toBe(1);

    expect(root.nodes[0].type).toBe('atrule');

    const themeNode = root.nodes[0] as AtRule;

    expect(themeNode.name).toBe('theme');
  });

  it('Correctly creates Font Size and Line Height Tokens', () => {
    const fontSizeDeclarations = getDeclarationsStartingWith('--text');

    // There should be 10 font sizes and 10 line heights
    expect(fontSizeDeclarations.length).toBe(20);

    const smallestFontSize = fontSizeDeclarations.find(({ prop }) => prop === '--text-xs');
    const smallestLineHeight = fontSizeDeclarations.find(({ prop }) => prop === '--text-xs--line-height');
    const largestFontSize = fontSizeDeclarations.find(({ prop }) => prop === '--text-6xl');
    const largestLineHeight = fontSizeDeclarations.find(({ prop }) => prop === '--text-6xl--line-height');

    expect(smallestFontSize).toBeDefined();
    expect(smallestLineHeight).toBeDefined();
    expect(largestFontSize).toBeDefined();
    expect(largestLineHeight).toBeDefined();
  });

  it('Correctly sets the font-families', () => {
    const expectedPrimaryFontFamily = "'Source Sans Pro', Arial, sans-serif";
    const expectedSecondaryFontFamily = "'Publico Headline', Georgia, serif";

    const primarySansFont = getDeclarationsStartingWith('--font-sans');
    const primaryFont = getDeclarationsStartingWith('--font-primary');

    expect(primarySansFont).toBeDefined();
    expect(primarySansFont[0].value).toBe(expectedPrimaryFontFamily);
    expect(primaryFont).toBeDefined();
    expect(primaryFont[0].value).toBe(expectedPrimaryFontFamily);

    const secondarySansSerifFont = getDeclarationsStartingWith('--font-serif');
    const secondaryFont = getDeclarationsStartingWith('--font-secondary');

    expect(secondarySansSerifFont).toBeDefined();
    expect(secondarySansSerifFont[0].value).toBe(expectedSecondaryFontFamily);
    expect(secondaryFont).toBeDefined();
    expect(secondaryFont[0].value).toBe(expectedSecondaryFontFamily);
  });

  it('correctly exports the radius tokens', () => {
    const radiusTokens = getDeclarationsStartingWith('--radius');

    expect(radiusTokens.length).toBeGreaterThan(0);
    radiusTokens.forEach(({ value }) => expect(value).toMatch(/rem$/));
  });

  it('correctly exports the breakpoint tokens', () => {
    const breakpointTokens = getDeclarationsStartingWith('--radius');

    expect(breakpointTokens.length).toBeGreaterThan(0);
    breakpointTokens.forEach(({ value }) => expect(value).toMatch(/px$/));
  });

  it('correctly exports the shadow tokens', () => {
    const shadowTokens = getDeclarationsStartingWith('--shadow');

    // only export the box shadows
    expect(shadowTokens.length).toBe(2);
    shadowTokens.forEach(({ value }) => expect(value).toMatch(/^(\d+px\s){4}rgba\((\d+(\.\d*)?,?\s?){4}\);$/));
  });

  it('correctly exports the animation tokens', () => {
    const animationTokens = getDeclarationsStartingWith('--radius');

    expect(animationTokens.length).toBeGreaterThan(0);
    animationTokens.forEach(({ value }) => expect(value).toMatch(/^cubic-bezier/));
  });
});

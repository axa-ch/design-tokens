import { describe, it, expect } from 'vitest';
// @ts-ignore
import defaultTailwindConfig from 'tailwindcss/stubs/config.full';
import tailwindConfig from '../build/tailwind/tailwind.config';

const allowedTailwindThemeProps = Object.keys(defaultTailwindConfig.theme);

describe('Tailwind Config specs', () => {
  it('The tailwind config file is properly generated', () => {
    const customTailwindConfigKeys = Object.keys(tailwindConfig.theme).reduce<string[]>(
      (acc, key) => [...(key === 'extend' ? Object.keys(tailwindConfig.theme.extend) : [key]), ...acc],
      [],
    );

    customTailwindConfigKeys.forEach((key) => expect(allowedTailwindThemeProps.includes(key)).toEqual(true));
  });

  it('Colors are exported in hex format', () => {
    Object.values(tailwindConfig.theme.extend.colors).forEach((color) => expect(color).toMatch(/#(\w){3,6}|rgba\(/));
  });

  it('Animations bezier values are provided as array', () => {
    expect(tailwindConfig.theme.extend.transitionTimingFunction.standard).toBeTypeOf('string');
    expect(tailwindConfig.theme.extend.transitionTimingFunction.decelerated).toBeTypeOf('string');
    expect(tailwindConfig.theme.extend.transitionTimingFunction.accelerated).toBeTypeOf('string');
  });

  it('Breakpoints are exported as numbers', () => {
    Object.values(tailwindConfig.theme.extend.screens).forEach((breakPoint) => expect(breakPoint).toMatch(/px$/));
  });

  it('Radius are exported as numbers', () => {
    Object.values(tailwindConfig.theme.extend.borderRadius).forEach((rd) => expect(rd).toMatch(/rem$/));
  });

  it('Shadow are exported as object', () => {
    Object.values(tailwindConfig.theme.extend.boxShadow).forEach((sd) => expect(sd).toMatch(/\)$/));
  });

  it('Spacing are exported as number', () => {
    Object.values(tailwindConfig.theme.extend.spacing).forEach((sp) => expect(sp).toMatch(/rem$/));
  });

  it('Typography variables are properly exported', () => {
    expect(tailwindConfig.theme.fontSize['primary-h5'][0]).toMatch(/rem$/);
    expect((tailwindConfig.theme.fontSize['primary-h5'][1] as { lineHeight: number }).lineHeight).toBeTypeOf('number');
    expect(tailwindConfig.theme.fontFamily.primary).toHaveLength(3);
    expect(tailwindConfig.theme.fontFamily.secondary).toHaveLength(3);
  });

  it('Font-size aliases are properly generated for text-* utilities', () => {
    expect(tailwindConfig.theme.fontSize.sm).toEqual(tailwindConfig.theme.fontSize['text-4']);
    expect(tailwindConfig.theme.fontSize.base).toEqual(tailwindConfig.theme.fontSize['text-3']);
    expect(tailwindConfig.theme.fontSize.lg).toEqual(tailwindConfig.theme.fontSize['text-2']);
    expect(tailwindConfig.theme.fontSize.xl).toEqual(tailwindConfig.theme.fontSize['text-1']);
  });

  it('Font-size <number> utilities are still available for backward compatibility', () => {
    expect(tailwindConfig.theme.fontSize['text-1'][0]).toMatch(/rem$/);
    expect(tailwindConfig.theme.fontSize['text-2'][0]).toMatch(/rem$/);
    expect(tailwindConfig.theme.fontSize['text-3'][0]).toMatch(/rem$/);
    expect(tailwindConfig.theme.fontSize['text-4'][0]).toMatch(/rem$/);
  });
});

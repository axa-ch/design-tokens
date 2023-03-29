import { describe, it, expect } from 'vitest';
import { loadFile } from './utils';
import postcss, { AtRule, Declaration, Rule } from 'postcss';
const animation = loadFile('/build/css/animation.css');
const breakpoints = loadFile('/build/css/breakpoints.css');
const color = loadFile('/build/css/color.css');
const mq = loadFile('/build/css/mq.css');
const radius = loadFile('/build/css/radius.css');
const shadow = loadFile('/build/css/shadow.css');
const spacing = loadFile('/build/css/spacing.css');
const typography = loadFile('/build/css/typography.css');

describe('Css Tokens specs', () => {
  it('Tokens get properly exported', () => {
    const cssFiles = [animation, breakpoints, color, mq, radius, shadow, spacing, typography];

    cssFiles.forEach((css) => expect(postcss.parse(css)).toBeTypeOf('object'));
  });

  it('Colors are properly exported', () => {
    const root = postcss.parse(color);
    const colorDeclarations = (root.nodes[1] as Rule).nodes as Declaration[];

    colorDeclarations.forEach(({ value }) => expect(value).toMatch(/^var\(|^#(\w){3,6}/));
  });

  it('Animations bezier values are provided as string', () => {
    const root = postcss.parse(animation);
    const easingDeclarations = ((root.nodes[1] as Rule).nodes as Declaration[]).filter(({ prop }) =>
      prop.includes('easing'),
    );

    easingDeclarations.forEach(({ value }) => expect(value).toBeTypeOf('string'));
  });

  it('Breakpoints are exported as numbers', () => {
    const root = postcss.parse(breakpoints);
    const breakPointDeclarations = (root.nodes[1] as Rule).nodes as Declaration[];

    breakPointDeclarations.forEach(({ value }) => {
      const breakpoint = Number(value); // css numbers are always parsed as strings, we need to cast them
      expect(breakpoint).toBeTypeOf('number');
      expect(isNaN(breakpoint)).toEqual(false);
    });
  });

  it('Media Queries are exported properly as strings', () => {
    const root = postcss.parse(mq);
    const mediaQueryDeclarations = root.nodes as AtRule[];

    mediaQueryDeclarations.forEach(({ params }) => expect(params).toMatch(/\(.+\)$/));
  });

  it('Radius are properly exported', () => {
    const root = postcss.parse(radius);
    const radiusDeclarations = (root.nodes[1] as Rule).nodes as Declaration[];

    radiusDeclarations.forEach(({ value }) => expect(value).toMatch(/rem$/));
  });

  it('Shadow are exported as string', () => {
    const root = postcss.parse(shadow);
    const shadowDeclarations = (root.nodes[1] as Rule).nodes as Declaration[];

    shadowDeclarations.forEach(({ value }) => expect(value).toMatch(/^var|\)$/));
  });

  it('Spacing are properly exported', () => {
    const root = postcss.parse(spacing);
    const spacingDeclarations = (root.nodes[1] as Rule).nodes as Declaration[];

    spacingDeclarations.forEach(({ value }) => expect(value).toMatch(/rem$/));
  });

  it('Typography variables are properly exported', () => {
    const root = postcss.parse(typography);
    const typographyDeclarations = (root.nodes[1] as Rule).nodes as Declaration[];
    const fontSize1 = typographyDeclarations.find(({ prop }) => prop?.includes('font-size-1')) as Declaration;
    const secondaryH5 = typographyDeclarations.find(({ prop }) => prop?.includes('secondary-h5')) as Declaration;
    const fontFamilyPrimary = typographyDeclarations.find(({ prop }) =>
      prop?.includes('font-family-primary'),
    ) as Declaration;

    expect(fontSize1.value).toMatch(/rem$/);
    expect(secondaryH5.value).toEqual('700 1.5rem/1.208 Publico Headline, Georgia, serif');
    expect(fontFamilyPrimary.value).toEqual('Source Sans Pro');
  });
});

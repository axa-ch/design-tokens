import { describe, it, expect } from 'vitest';
import type { Declaration } from 'postcss';
import postcss from 'postcss-scss';
import { loadFile } from './utils';

const animation = loadFile('/build/scss/animation.scss');
const breakpoints = loadFile('/build/scss/breakpoints.scss');
const color = loadFile('/build/scss/color.scss');
const mq = loadFile('/build/scss/mq.scss');
const radius = loadFile('/build/scss/radius.scss');
const shadow = loadFile('/build/scss/shadow.scss');
const spacing = loadFile('/build/scss/spacing.scss');
const typography = loadFile('/build/scss/typography.scss');

describe('SCSS Tokens specs', () => {
  it('Tokens get properly exported', () => {
    const cssFiles = [animation, breakpoints, color, mq, radius, shadow, spacing, typography];

    cssFiles.forEach((css) => expect(postcss.parse(css)).toBeTypeOf('object'));
  });

  it('Colors are properly exported', () => {
    const root = postcss.parse(color);
    const colorDeclarations = root.nodes.filter(({ type }) => type === 'decl') as Declaration[];

    colorDeclarations.forEach(({ value }) => expect(value).toMatch(/^\$|^#(\w){3,6}|rgba\(/));
  });

  it('Animations bezier values are provided as string', () => {
    const root = postcss.parse(animation);
    const easingDeclarations = root.nodes.filter(
      (node) => node.type === 'decl' && node?.prop.includes('easing'),
    ) as Declaration[];

    easingDeclarations.forEach(({ value }) => expect(value).toBeTypeOf('string'));
  });

  it('Breakpoints are exported as numbers', () => {
    const root = postcss.parse(breakpoints);
    const breakPointDeclarations = root.nodes.filter(({ type }) => type === 'decl') as Declaration[];

    breakPointDeclarations.forEach(({ value }) => {
      const breakpoint = Number(value); // css numbers are always parsed as strings, we need to cast them
      expect(breakpoint).toBeTypeOf('number');
      expect(Number.isNaN(breakpoint)).toEqual(false);
    });
  });

  it('Media Queries are exported properly as strings', () => {
    const root = postcss.parse(mq);
    const mediaQueryDeclarations = root.nodes.filter(({ type }) => type === 'decl') as Declaration[];

    mediaQueryDeclarations.forEach(({ value }) => expect(value).toMatch(/'\(.+\)'$/));
  });

  it('Radius are properly exported', () => {
    const root = postcss.parse(radius);
    const radiusDeclarations = root.nodes.filter(({ type }) => type === 'decl') as Declaration[];

    radiusDeclarations.forEach(({ value }) => expect(value).toMatch(/rem$/));
  });

  it('Shadow are exported as string', () => {
    const root = postcss.parse(shadow);
    const shadowDeclarations = root.nodes.filter(({ type }) => type === 'decl') as Declaration[];

    shadowDeclarations.forEach(({ value }) => expect(value).toMatch(/^\$|\)$/));
  });

  it('Spacing are properly exported', () => {
    const root = postcss.parse(spacing);
    const spacingDeclarations = root.nodes.filter(({ type }) => type === 'decl') as Declaration[];

    spacingDeclarations.forEach(({ value }) => expect(value).toMatch(/rem$/));
  });

  it('Typography variables are properly exported', () => {
    const root = postcss.parse(typography);
    const typographyDeclarations = root.nodes.filter(({ type }) => type === 'decl') as Declaration[];
    const fontSize1 = typographyDeclarations.find(({ prop }) => prop === '$typography-font-size-1') as Declaration;
    const secondaryH5 = typographyDeclarations.find(({ prop }) => prop === '$typography-secondary-h5') as Declaration;
    const fontFamilyPrimary = typographyDeclarations.find(
      ({ prop }) => prop === '$typography-font-family-primary',
    ) as Declaration;

    expect(fontSize1.value).toMatch(/rem$/);
    expect(secondaryH5.value).toEqual(`700 1.5rem/1.208 'Publico Headline',
  Georgia,
  serif`);
    expect(fontFamilyPrimary.value).toEqual("'Source Sans Pro'");
  });
});

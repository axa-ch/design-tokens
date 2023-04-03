import { describe, it, expect } from 'vitest';
import * as animation from '../build/js/animation';
import * as breakpoints from '../build/js/breakpoints';
import * as color from '../build/js/color';
import * as mq from '../build/js/mq';
import * as radius from '../build/js/radius';
import * as shadow from '../build/js/shadow';
import * as spacing from '../build/js/spacing';
import * as typography from '../build/js/typography';

describe('Javascript Tokens specs', () => {
  it('Tokens get properly exported', () => {
    const allTokens = [animation, breakpoints, color, mq, radius, shadow, spacing, typography];
    allTokens.forEach((tokens) => expect(tokens).toBeTypeOf('object'));
  });

  it('Colors are exported in hex format', () => {
    Object.values(color).forEach((c) => expect(c).toMatch(/#(\w){3,6}|rgba\(/));
  });

  it('Animations bezier values are provided as array', () => {
    expect(animation.AnimationEasingStandard).toHaveLength(4);
    expect(animation.AnimationEasingAccelerated).toHaveLength(4);
    expect(animation.AnimationEasingDecelerated).toHaveLength(4);
  });

  it('Breakpoints are exported as numbers', () => {
    Object.values(breakpoints).forEach((breakPoint) => expect(breakPoint).toBeTypeOf('number'));
  });

  it('Media Queries are exported properly as strings', () => {
    Object.values(mq).forEach((mediaQuery) => expect(mediaQuery).toMatch(/^\(.+\)$/));
  });

  it('Radius are exported as numbers', () => {
    Object.values(radius).forEach((rd) => expect(rd).toBeTypeOf('number'));
  });

  it('Shadow are exported as object', () => {
    Object.values(shadow).forEach((sd) => expect(sd).toBeTypeOf('object'));
  });

  it('Spacing are exported as number', () => {
    Object.values(spacing).forEach((sp) => expect(sp).toBeTypeOf('number'));
  });

  it('Typography variables are properly exported', () => {
    expect(typography.TypographyFontSize1).toBeTypeOf('number');
    expect(typography.TypographySecondaryH5).toBeTypeOf('object');
    expect(typography.TypographyFontFamilyPrimary).toBeTypeOf('string');
  });
});

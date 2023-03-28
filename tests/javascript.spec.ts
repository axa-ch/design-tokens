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
    Object.values(color).forEach((color) => expect(color).toMatch(/#(\w){3,6}/));
  });
});

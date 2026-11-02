import type { StoryObj, Meta } from '@storybook/react-vite';
// biome-ignore lint/suspicious/noTsIgnore: no types are provided for this package
// @ts-ignore
import colorUtil from 'color-util';
import { sortBy, chain } from 'lodash';
import {
  black,
  blue,
  brand,
  coral,
  cottonCandy,
  crimson,
  gray,
  green,
  grape,
  leafGreen,
  mintGreen,
  ocean,
  red,
  slate,
  skyblue,
  sunshine,
  teal,
  white,
  yellow,
} from '../build/js/tokens.js';
import { ColorList } from './components/color-list/color-list';
import { Heading } from './components/heading/heading';
import { Container } from './components/container/container';
import { Text } from './components/text/text';

type ColorTokens = string | { readonly [name: string]: ColorTokens };
type ColorEntry = { name: string; value: string };

const meta = {
  title: 'Colors',
  parameters: {
    layout: 'fullscreen',
  },
  component: ColorList,
} satisfies Meta<typeof ColorList>;

export default meta;

type Story = StoryObj<typeof meta>;

const flattenColors = (tokens: ColorTokens, prefix = ""): ColorEntry[] => {
  if (typeof tokens === "string") {
    return prefix ? [{ name: prefix, value: tokens }] : [];
  }

  return Object.entries(tokens).flatMap(([name, value]) =>
    flattenColors(value, prefix ? `${prefix}.${name}` : name),
  );
};

const withHsl = (entries: ColorEntry[]) =>
  entries.map(({ name, value }) => {
      const color = colorUtil.color(value);

      return { name, value, ...color.hsl };
  });

const palettes = {
  white,
  gray,
  black,
  blue,
  red,
  coral,
  teal,
  mintGreen,
  sunshine,
  cottonCandy,
  skyblue,
  grape,
  leafGreen,
  ocean,
  yellow,
  crimson,
  green,
  slate,
};

export const CoreAXAColors: Story = {
  args: {
    colors: chain(
      withHsl([
        { name: "brand.blue", value: brand.blue },
        { name: "brand.red", value: brand.red },
      ]),
    )
      .groupBy((color) => Math.round(color.h * 100))
      .values()
      .map((colorGroup) => sortBy(colorGroup, 'l'))
      .flatten()
      .value(),
  },
  render: (args) => (
    <Container>
      <Heading as={'h2'}>Core AXA Colors</Heading>
      <Text>Brand colors exposed by the v4 token set.</Text>
      <ColorList {...args} />
    </Container>
  ),
};

export const ColorPalettes: Story = {
  args: {
    colors: chain(withHsl(flattenColors(palettes)))
      .groupBy((color) => Math.round(color.h * 100))
      .values()
      .map((colorGroup) => sortBy(colorGroup, 'l').reverse())
      .flatten()
      .value()
      .reverse(),
  },
  render: (args) => (
    <Container>
      <Heading as={'h2'}>Color Palettes</Heading>
      <Text>Primitive color scales available in the v4 token set.</Text>
      <ColorList {...args} />
    </Container>
  ),
};

export const AccentPalettes: Story = {
  args: {
    colors: chain(
      withHsl(
        flattenColors({
          coral,
          cottonCandy,
          grape,
          leafGreen,
          mintGreen,
          skyblue,
          sunshine,
          teal,
        }),
      ),
    )
      .groupBy((color) => color.name.split('.')[0])
      .values()
      .map((colorGroup) => sortBy(colorGroup, 'l'))
      .flatten()
      .value(),
  },
  render: (args) => (
    <Container>
      <Heading as={'h2'}>Accent Palettes</Heading>
      <Text>Accent color families available in the v4 token set.</Text>
      <ColorList {...args} />
    </Container>
  ),
};

export const FeedbackPalettes: Story = {
  args: {
    colors: chain(withHsl(flattenColors({ ocean, yellow, crimson, green, red })))
      .groupBy((color) => Math.round(color.h * 100))
      .values()
      .map((colorGroup) => sortBy(colorGroup, 'l', 'desc'))
      .flatten()
      .value(),
  },
  render: (args) => (
    <Container>
      <Heading as={'h2'}>Feedback Palettes</Heading>
      <Text>Color families used for information, warning, error, and success states.</Text>
      <ColorList {...args} />
    </Container>
  ),
};

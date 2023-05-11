import { StoryObj, Meta } from '@storybook/react';
// @ts-ignore
import colorUtil from 'color-util';
import { sortBy, chain } from 'lodash';
import * as colors from '../build/js/color';
import { ColorList } from './components/color-list/color-list';
import { Heading } from './components/heading/heading';
import { Container } from './components/container/container';
import { Text } from './components/text/text';

const meta = {
  title: 'Colors',
  parameters: {
    layout: 'fullscreen',
  },
  component: ColorList,
} satisfies Meta<typeof ColorList>;

export default meta;

type Story = StoryObj<typeof meta>;

const filterColor = (fn: (name: string, value: string) => boolean) =>
  Object.entries(colors)
    .filter(([name, value]) => fn(name, value))
    .map(([name, value]) => {
      const color = colorUtil.color(value);

      return { name, value, ...color.hsl };
    });

export const CoreAXAColors: Story = {
  args: {
    colors: chain(filterColor((name) => /base/gi.test(name)))
      .groupBy((color) => Math.round(color.h * 100))
      .values()
      .map((colorGroup) => sortBy(colorGroup, 'l'))
      .flatten()
      .value(),
  },
  render: (args) => (
    <Container>
      <Heading as={'h2'}>Core AXA Colors</Heading>
      <Text>These should be used for the AXA logo. The AXA Red is reserved only for the Switch.</Text>
      <ColorList {...args} />
    </Container>
  ),
};

export const UIDesign: Story = {
  args: {
    colors: chain(filterColor((name) => /design/gi.test(name)))
      .groupBy((color) => Math.round(color.h * 100))
      .values()
      .map((colorGroup) => sortBy(colorGroup, 'l').reverse())
      .flatten()
      .value()
      .reverse(),
  },
  render: (args) => (
    <Container>
      <Heading as={'h2'}>UI Design</Heading>
      <Text>
        These should be used for text and borders. The AXA Blue can also be used also for buttons, links and icons.
        Burnt Sienna should be used only for buttons and links.
      </Text>
      <ColorList {...args} />
    </Container>
  ),
};

export const BackgroundsAndIllustrations: Story = {
  args: {
    colors: chain(filterColor((name) => /misc/gi.test(name)))
      .groupBy((color) => color.name.split(/(?=[A-Z])/)[2])
      .values()
      .map((colorGroup) => sortBy(colorGroup, 'l'))
      .flatten()
      .value(),
  },
  render: (args) => (
    <Container>
      <Heading as={'h2'}>Background and Illustration</Heading>
      <Text>These should be used for the background of text modules and illustration.</Text>
      <ColorList {...args} />
    </Container>
  ),
};

export const Status: Story = {
  args: {
    colors: chain(filterColor((name) => /status/gi.test(name)))
      .groupBy((color) => Math.round(color.h * 100))
      .values()
      .map((colorGroup) => sortBy(colorGroup, 'l', 'desc'))
      .flatten()
      .value(),
  },
  render: (args) => (
    <Container>
      <Heading as={'h2'}>Status-indicating Colors</Heading>
      <Text>
        These should only be used to identify the status of a given element. You can use these two colors to display a
        message of validation, availability or error in forms, alerts or quotes.
      </Text>
      <ColorList {...args} />
    </Container>
  ),
};

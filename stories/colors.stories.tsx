import * as colors from '../build/js/color';
import { ColorList } from './components/color-list/color-list';
import { StoryObj, Meta } from '@storybook/react';
import { Heading } from './components/heading/heading';
import { Container } from './components/container/container';
import { Text } from './components/text/text';
// @ts-ignore
import colorUtil from 'color-util';

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
    .sort(([, valueA], [, valueB]) => {
      const colorA = colorUtil.color(valueA);
      const colorB = colorUtil.color(valueB);

      if (colorA.hsl.h - colorA.hsl.l + colorA.hsl.s < colorB.hsl.h - colorB.hsl.l + colorB.hsl.s) return 1;
      if (colorA.hsl.h - colorA.hsl.l + colorA.hsl.s > colorB.hsl.h - colorB.hsl.l + colorB.hsl.s) return -1;
      return 0;
    });

export const CoreAxaColors: Story = {
  args: {
    colors: filterColor((name) => /base/gi.test(name)),
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
    colors: filterColor((name) => /design/gi.test(name)),
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
    colors: filterColor((name) => /misc/gi.test(name)),
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
    colors: filterColor((name) => /status/gi.test(name)),
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

export const Components: Story = {
  args: {
    // filter out all the above colors
    colors: filterColor((name) => /^color(?!status|uidesign|base|misc|greyscale).*/gi.test(name)),
  },
  render: (args) => (
    <Container>
      <Heading as={'h2'}>Components Specific colors</Heading>
      <Text>These colors might help you building AXA components keeping your design consistent across products.</Text>
      <ColorList {...args} />
    </Container>
  ),
};

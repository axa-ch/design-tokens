import { StoryObj, Meta } from '@storybook/react';
// @ts-ignore
import colorUtil from 'color-util';
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

type SortingFn = (a: string[], b: string[]) => number;

const sortBySaturation: SortingFn = ([, valueA], [, valueB]) => {
  const colorA = colorUtil.color(valueA);
  const colorB = colorUtil.color(valueB);

  if (colorA.hsl.s - colorA.hsl.l < colorB.hsl.s - colorB.hsl.l) return 1;
  if (colorA.hsl.s - colorA.hsl.l > colorB.hsl.s - colorB.hsl.l) return -1;
  return 0;
};

const sortBySaturationAndLuminosity: SortingFn = ([, valueA], [, valueB]) => {
  const colorA = colorUtil.color(valueA);
  const colorB = colorUtil.color(valueB);

  if (colorA.hsl.h - colorA.hsl.s < colorB.hsl.h - colorB.hsl.s) return 1;
  if (colorA.hsl.h - colorA.hsl.s > colorB.hsl.h - colorB.hsl.s) return -1;
  return 0;
};

const filterColor = (fn: (name: string, value: string) => boolean, sortingFn = sortBySaturation) =>
  Object.entries(colors)
    .filter(([name, value]) => fn(name, value))
    .sort(sortingFn);

export const CoreAXAColors: Story = {
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
    colors: filterColor((name) => /status/gi.test(name), sortBySaturationAndLuminosity),
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

export const Accent: Story = {
  args: {
    colors: filterColor((name) => /primary|secondary/gi.test(name)),
  },
  render: (args) => (
    <Container>
      <Heading as={'h2'}>Accent Colors</Heading>
      <Text>Only a selection of the available colors can be used in our UI Components.</Text>
      <Text as={'div'}>
        <p>
          Each key accent color (primary, secondary, and tertiary) is provided as a group of 4 compatible colors with
          different tones that can be applied for differing emphasis and visual expression, and paired for visual
          contrast.
        </p>
        <p>
          <strong>Accent colors:&nbsp;</strong>
          <strong>Primary, secondary,&nbsp;</strong>and <strong>tertiary</strong> roles are formed following the same
          pattern of a 4-color group.
        </p>
        <p>Primary is used here as an example:</p>
        <ul>
          <li>
            <strong>Primary</strong> base color
          </li>
          <li>
            <strong>On-primary</strong> is applied to content (icons, text, etc.) that sits on top of{' '}
            <strong>primary</strong>
          </li>
          <li>
            <strong>Primary container</strong> is applied to elements needing less emphasis than{' '}
            <strong>primary</strong>
          </li>
          <li>
            <strong>On-primary container</strong> is applied to content (icons, text, etc.) that sits on top of{' '}
            <strong>primary container</strong>
          </li>
        </ul>
      </Text>
      <ColorList {...args} />
    </Container>
  ),
};

export const Components: Story = {
  args: {
    // filter out all the above colors
    colors: filterColor((name) => /^color(?!status|uidesign|base|misc|greyscale|primary|secondary|on).*/gi.test(name)),
  },
  render: (args) => (
    <Container>
      <Heading as={'h2'}>Components Specific colors</Heading>
      <Text>These colors might help you building AXA components keeping your design consistent across products.</Text>
      <ColorList {...args} />
    </Container>
  ),
};

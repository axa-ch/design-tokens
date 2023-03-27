import { StoryObj } from '@storybook/react';
import { Heading } from './components/heading/heading';
import { ShadowList } from './components/shadows/shadow-list';
import { Container } from './components/container/container';
import { Text } from './components/text/text';
// @ts-ignore
import colorUtil from 'color-util';

const meta = {
  title: 'Shadows',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Shadows: Story = {
  render: () => (
    <Container>
      <Heading as={'h2'}>Shadows</Heading>
      <Text>
        Shadows are used to suggest elevations and are used as a functional element. Shadows should not be used as a
        decorative element. The intent is to show the user that some elements are higher than others. Example a sticky
        footer lets the content below it so it has a shadow
      </Text>
      <ShadowList />
    </Container>
  ),
};

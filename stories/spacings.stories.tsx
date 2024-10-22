import type { StoryObj } from '@storybook/react';
import { Heading } from './components/heading/heading';
import { Container } from './components/container/container';
import { Text } from './components/text/text';
import { SpacingList } from './components/spacing-list/spacing-list';

const meta = {
  title: 'Spacings',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Spacings: Story = {
  render: () => (
    <Container>
      <Heading as={'h2'}>Spacings</Heading>
      <Text>
        Spacing methods use baseline grids, keylines, padding, and incremental spacing to adjust ratios, containers.
      </Text>
      <Text>
        The spaces between objects are predefined. That ensures fast working and allows to spot errors fast due to any
        value not represented in the list.
      </Text>
      <SpacingList />
    </Container>
  ),
};

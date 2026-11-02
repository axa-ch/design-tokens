import type { StoryObj } from '@storybook/react-vite';
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
        Dimension tokens define the available spacing values used throughout the design system.
      </Text>
      <Text>
        Each sample below uses a value from the v4 dimension scale.
      </Text>
      <SpacingList />
    </Container>
  ),
};

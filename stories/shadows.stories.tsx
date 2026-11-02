import type { StoryObj } from '@storybook/react-vite';
import { Heading } from './components/heading/heading';
import { ShadowList } from './components/shadows/shadow-list';
import { Container } from './components/container/container';
import { Text } from './components/text/text';

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
        Shadows express elevation, helping users distinguish foreground elements from surrounding content.
      </Text>
      <ShadowList />
    </Container>
  ),
};

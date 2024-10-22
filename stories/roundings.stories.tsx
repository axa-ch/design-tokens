import type { StoryObj } from '@storybook/react';
import { Heading } from './components/heading/heading';
import { Container } from './components/container/container';
import { Text } from './components/text/text';
import '../build/css/color.css';
import '../build/css/spacing.css';
import '../build/css/radius.css';

const meta = {
  title: 'Roundings',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Roundings: Story = {
  render: () => (
    <Container>
      <Heading as={'h2'}>Roundings</Heading>
      <Text>
        Components are organized into three categories, based on their relative size. Components linked to their
        category will inherit the shape values assigned to the category. Alternatively, individual component corners can
        be shaped independent of their category’s values.
      </Text>
      <Heading
        as={'h4'}
        facet={'primary'}
      >
        Small Components
      </Heading>
      <div
        style={{
          aspectRatio: 3 / 1,
          minWidth: '130px',
          width: '15%',
          borderRadius: 'var(--radius-base-small)',
          background: 'var(--color-ui-design-burnt-sienna)',
        }}
      />
      <Heading
        as={'h4'}
        facet={'primary'}
      >
        Medium Components
      </Heading>
      <div
        style={{
          aspectRatio: 2 / 1,
          minWidth: '230px',
          width: '40%',
          borderRadius: 'var(--radius-base-medium)',
          background: 'var(--color-misc-pacific)',
        }}
      />
      <Heading
        as={'h4'}
        facet={'primary'}
      >
        Large Components
      </Heading>
      <div
        style={{
          aspectRatio: 8 / 6,
          minWidth: '320px',
          width: '70%',
          borderRadius: 'var(--radius-base-large)',
          background: 'var(--color-misc-igloo)',
        }}
      />
      <Heading
        as={'h4'}
        facet={'primary'}
      >
        Pill Components
      </Heading>
      <div
        style={{
          width: '155px',
          height: '40px',
          borderRadius: '20px',
          background: 'var(--color-misc-greyjoy)',
        }}
      />
    </Container>
  ),
};

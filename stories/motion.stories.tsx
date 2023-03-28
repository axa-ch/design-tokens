import { StoryObj } from '@storybook/react';
import { Heading } from './components/heading/heading';
import { Container } from './components/container/container';
import { Text } from './components/text/text';
import { MotionTest } from './components/motion-test/motion-test';

const meta = {
  title: 'Motion',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Motion: Story = {
  render: () => (
    <Container>
      <Heading as={'h2'}>Motion</Heading>
      <Text>
        Motion helps make a UI expressive and easy to use. Motion design informs users by highlighting relationships
        between elements, action availability, and action outcomes. Motion focuses attention on what's important,
        without creating unnecessary distraction. Regardless of an animation’s style, transitions shouldn’t be jarringly
        fast or so slow that users feel as though they’re waiting. The right combination of duration and easing produces
        smooth and clear transitions.
      </Text>
      <Heading
        as={'h3'}
        facet={'primary'}
      >
        Transition area
      </Heading>
      <Text>
        Transitions that cover small areas of the screen have shorter durations than those that traverse larger areas.
        Transitions that close, dismiss, or collapse an element use shorter durations than transitions that open, enter
        or expand. Exit transitions may be faster because they require less attention than the user’s next task.
      </Text>
      <Heading
        as={'h4'}
        facet={'primary'}
      >
        Small
      </Heading>
      <Text>Elements with small transition areas, such as icons and selection controls, have short durations.</Text>
      <MotionTest
        size={'small'}
        easing={'standard'}
      />
      <Heading
        as={'h4'}
        facet={'primary'}
      >
        Medium
      </Heading>
      <Text>
        Elements with larger transition areas, such as bottom sheets and expanding chips, have slightly longer
        durations.
      </Text>
      <MotionTest
        size={'medium'}
        easing={'standard'}
      />
      <Heading
        as={'h4'}
        facet={'primary'}
      >
        Large
      </Heading>
      <Text>Animated elements that traverse a large portion of the screen have the longest durations.</Text>
      <MotionTest
        size={'large'}
        easing={'standard'}
      />
      <Heading
        as={'h3'}
        facet={'primary'}
      >
        Easing
      </Heading>
      <Text>
        Easing adjusts an animation’s rate of change, allowing transitioning elements to speed up and slow down, rather
        than move at a constant rate. In the physical world, objects don’t start or stop instantaneously. Instead, they
        take time to speed up and slow down.
      </Text>
      <Heading
        as={'h4'}
        facet={'primary'}
      >
        Standard easing
      </Heading>
      <Text>
        Standard easing subtly brings attention to the end of an animation by taking more time to decelerate than
        accelerate. Standard easing is the most common form of easing. its best used for objects which move from one
        place to another in the ui.
      </Text>
      <MotionTest
        size={'medium'}
        easing={'standard'}
      />
      <Heading
        as={'h4'}
        facet={'primary'}
      >
        Decelerated easing
      </Heading>
      <Text>
        Incoming elements are animated using decelerated easing, in which transitions begin at peak velocity (the
        fastest point in an element's movement) and end at rest.
      </Text>
      <MotionTest
        size={'medium'}
        easing={'decelerated'}
      />
      <Heading
        as={'h4'}
        facet={'primary'}
      >
        Accelerated easing
      </Heading>
      <Text>
        Elements exiting a screen use accelerated easing, a transition in which the element starts at rest and ends at
        peak velocity.
      </Text>
      <MotionTest
        size={'medium'}
        easing={'accelerated'}
      />
    </Container>
  ),
};

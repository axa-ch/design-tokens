import type { StoryObj } from '@storybook/react-vite';
import { Heading } from './components/heading/heading';
import { Container } from './components/container/container';
import { Text } from './components/text/text';
import { radius } from '../build/js/tokens.js';

const meta = {
  title: 'Roundings',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const radiusTokens = [
  { name: "none", value: radius.none },
  { name: "xs", value: radius.xs },
  { name: "sm", value: radius.sm },
  { name: "md", value: radius.md },
  { name: "lg", value: radius.lg },
  { name: "xl", value: radius.xl },
  { name: "button.default", value: radius.button.default },
  { name: "popover.container", value: radius.popover.container },
  { name: "forms.input", value: radius.forms.input },
  { name: "image.sm", value: radius.image.sm },
  { name: "image.lg", value: radius.image.lg },
  { name: "circle", value: radius.circle },
];

export const Roundings: Story = {
  render: () => (
    <Container>
      <Heading as={'h2'}>Roundings</Heading>
      <Text>
        Radius values available in the v4 token set. Length values are shown in pixels; the circle token is a percentage.
      </Text>
      <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {radiusTokens.map(({ name, value }) => (
          <div key={name}>
            <Text as="span">{`radius.${name}: ${value}${name === "circle" ? "%" : "px"}`}</Text>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: name === "circle" ? `${value}%` : `${value}px`,
                background: "var(--axa-brand-blue)",
              }}
            />
          </div>
        ))}
      </div>
    </Container>
  ),
};

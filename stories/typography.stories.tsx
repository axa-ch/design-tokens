import type { StoryObj } from '@storybook/react';
import { startCase } from 'lodash';
import { Heading } from './components/heading/heading';
import { Container } from './components/container/container';
import { Text, type TextProps } from './components/text/text';
import { ResponsiveHeadings } from './components/responsive-headings/responsive-headings';

const meta = {
  title: 'Typography',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dapibus nunc nec tempus suscipit. Nunc quis mattis arcu, ut malesuada eros. Mauris quis fermentum arcu. Vivamus est magna, tincidunt nec mi ac, iaculis aliquam leo. Phasellus fermentum magna a turpis suscipit ultricies. Proin ac nisi nec elit tempus pellentesque. Integer aliquet placerat nunc non maximus. Nulla sollicitudin lobortis vestibulum. Mauris accumsan erat posuere, condimentum metus non, fermentum turpis. Proin convallis mollis molestie. Phasellus tincidunt semper orci, eu luctus lorem varius ac. Praesent in nunc non quam luctus vestibulum. Nullam in nibh sit amet leo porta scelerisque at a augue. Maecenas congue sem eu arcu porttitor pharetra. Maecenas ultrices nisi a libero pretium scelerisque.';

export const Typography: Story = {
  render: () => (
    <Container>
      <Heading as={'h2'}>Typography</Heading>
      <Text>
        AXA has two main typefaces – <b>Publico Headline</b> and <b>Source Sans Pro</b>. Publico Headline is the first
        official serif typeface at AXA. Coupled to Source Sans Pro it enhances the design by adding rythm, creating a
        clear hierarchy and providing a strong visual identity.
      </Text>
      <Heading
        as={'h3'}
        facet={'primary'}
      >
        Examples:
      </Heading>
      <ResponsiveHeadings>
        <Heading
          facet={'primary'}
          as={'h4'}
        >
          Source Sans Pro Heading 4
        </Heading>
        <Heading as={'h4'}>Publico Heading 4</Heading>
        <Text>Standard Text</Text>
      </ResponsiveHeadings>
    </Container>
  ),
};

export const PrimaryHeadings: Story = {
  render: () => (
    <Container>
      <Heading as={'h2'}>Headings Primary Font - Source Sans Pro</Heading>
      <Text>
        Source Sans Pro should be mainly used for UI design. <br />
        <i>Notice that the headings in this example are responsive, and behave accordingly to our design system.</i>
      </Text>
      <ResponsiveHeadings>
        <Heading
          facet={'primary'}
          as={'h1'}
        >
          Heading 1
        </Heading>
        <Heading
          facet={'primary'}
          as={'h2'}
        >
          Heading 2
        </Heading>
        <Heading
          facet={'primary'}
          as={'h3'}
        >
          Heading 3
        </Heading>
        <Heading
          facet={'primary'}
          as={'h4'}
        >
          Heading 4
        </Heading>
        <Heading
          facet={'primary'}
          as={'h5'}
        >
          Heading 5
        </Heading>
        <Heading
          facet={'primary'}
          as={'h6'}
        >
          Heading 6
        </Heading>
      </ResponsiveHeadings>
    </Container>
  ),
};

export const SecondaryHeadings: Story = {
  render: () => (
    <Container>
      <Heading as={'h2'}>Headings Secondary Font - Publico</Heading>
      <Text>
        Publico should mainly be used for headlines on landinpages. <br />
        <i>Notice that the headings in this example are responsive, and behave accordingly to our design system.</i>
      </Text>
      <ResponsiveHeadings>
        <Heading as={'h1'}>Heading 1</Heading>
        <Heading as={'h2'}>Heading 2</Heading>
        <Heading as={'h3'}>Heading 3</Heading>
        <Heading as={'h4'}>Heading 4</Heading>
        <Heading as={'h5'}>Heading 5</Heading>
        <Heading as={'h6'}>Heading 6</Heading>
      </ResponsiveHeadings>
    </Container>
  ),
};

const textAliases = {
  'text-1': 'text-xl',
  'text-2': 'text-lg',
  'text-3': 'text-base',
  'text-4': 'text-sm',
};

export const Texts: Story = {
  render: () => (
    <Container>
      <Heading as={'h2'}>Standard Texts</Heading>
      {Array.from({ length: 4 }, (_, index) => `text-${index + 1}` as TextProps<'p'>['facet']).map((facet) => (
        <div key={facet}>
          <Heading
            as={'h3'}
            facet={'primary'}
          >
            {startCase(facet)} (alias {textAliases[facet as keyof typeof textAliases]})
          </Heading>
          <Text facet={facet}>{lorem}</Text>
          <Text facet={facet}>{lorem}</Text>
        </div>
      ))}
    </Container>
  ),
};

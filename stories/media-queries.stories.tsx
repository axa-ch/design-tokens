import type { Meta, StoryFn } from '@storybook/react-vite';
import { Prism } from 'react-syntax-highlighter';
import { materialOceanic as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { breakpoint, media } from '../build/js/tokens.js';
import { Container } from './components/container/container';
import { Heading } from './components/heading/heading';
import { Text } from './components/text/text';

const mediaRules = Object.entries(media)
  .flatMap(([direction, queries]) =>
    Object.entries(queries).map(
      ([name, query]) => `@custom-media --axa-media-${direction}-${name} ${query};`,
    ),
  )
  .join('\n');

const meta = {
  title: 'Media Queries',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

export const MediaQueries: StoryFn = () => (
  <Container>
    <Heading as='h2'>Media Queries</Heading>
    <Text>
      The v4 media queries are exported as CSS custom media, SCSS variables, and JavaScript values. They let components
      respond to the supported viewport breakpoints.
    </Text>
    <Text>{`Breakpoints: ${Object.entries(breakpoint)
      .map(([name, value]) => `${name}: ${value}px`)
      .join(', ')}`}</Text>
    <Text>
      Highly inspired by&nbsp;
      <a
        href='https://getbootstrap.com/docs/5.0/layout/breakpoints/'
        target='_blank'
        rel='noreferrer'
      >
        <b>bootstrap</b>
      </a>
      &nbsp;breakpoints.
    </Text>
    <Text>Let&apos;s check for example how you can use them with plain CSS:</Text>
    <Prism
      style={style}
      language='css'
    >
      {`@import url('./build/css/tokens.css');

.component {
  width: 100px;

  @media (--axa-media-up-sm) {
    width: 200px;
  }
}`}
    </Prism>
    <Text>
      Note that for CSS media queries via&nbsp;
      <a href='https://drafts.csswg.org/mediaqueries-5/#custom-mq'>
        <b>@custom-media</b>
      </a>
      &nbsp; you will need a&nbsp;
      <a href='https://github.com/csstools/postcss-custom-media'>
        <b>postCSS plugin</b>
      </a>
    </Text>
    <Text>Let&apos;s see the example above in SCSS syntax:</Text>
    <Prism
      style={style}
      language='scss'
    >
      {`@use './build/scss/tokens.scss' as tokens;

.component {
  width: 100px;

  @media #{tokens.$axa-media-up-sm} {
    width: 200px;
  }
}`}
    </Prism>
    <Text>You can combine multiple media queries for specific use cases:</Text>
    <Prism
      style={style}
      language='css'
    >
      {`@import url('./build/css/tokens.css');

.component {
  width: 100px;

  @media (--axa-media-up-sm) and (--axa-media-down-lg) {
    width: 200px;
  }
}`}
    </Prism>
    <Text>
      The generated CSS defines these custom media queries:
    </Text>
    <Prism
      style={style}
      language='css'
    >
      {mediaRules}
    </Prism>
  </Container>
);

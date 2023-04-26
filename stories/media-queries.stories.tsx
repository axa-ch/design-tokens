import { Meta, StoryFn } from '@storybook/react';
import { Prism } from 'react-syntax-highlighter';
import { materialOceanic as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Container } from './components/container/container';
import { Heading } from './components/heading/heading';
import { Text } from './components/text/text';

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
      The AXA Media Queries are exported in different formats (CSS, SCSS and Javascript) and might be used to customize
      your components on several screen sizes. All the variables exposed allow you to target specific device features
      like touch support or user preferences.
    </Text>
    <Text>Let&apos;s check for example how you can use them with plain CSS:</Text>
    <Prism
      style={style}
      language='css'
    >
      {`@import url('@axa-ch/design-tokens/tokens.css');

.component {
  width: 100px;

  @media (--mq-respond-up-sm) {
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
      {`@use '@axa-ch/design-tokens/tokens';

.component {
  width: 100px;

  @media (tokens.$mq-respond-up-sm) {
    width: 200px;
  }
}`}
    </Prism>
    <Text>You can combine multiple media queries for specific use cases:</Text>
    <Prism
      style={style}
      language='css'
    >
      {`@import url('@axa-ch/design-tokens/tokens.css');

.component {
  width: 100px;

  /* Big monitors with OS dark theme enabled */
  @media (--mq-respond-up-sm) and (--mq-base-scheme-dark) {
    width: 200px;
  }
}`}
    </Prism>
    <Text>
      Here you can read the list of available media query variables. However you will likely need in most of cases only
      the <code>--md-respond-*</code> variables.
    </Text>
    <Prism
      style={style}
      language='css'
    >
      {`/* Raw media queries for advanced usage */
@custom-media --mq-base-xs-max (max-width: 575.98px);
@custom-media --mq-base-sm (min-width: 576px);
@custom-media --mq-base-sm-max (max-width: 767.98px);
@custom-media --mq-base-md (min-width: 768px);
@custom-media --mq-base-md-max (max-width: 991.98px);
@custom-media --mq-base-lg (min-width: 992px);
@custom-media --mq-base-lg-max (max-width: 1199.98px);
@custom-media --mq-base-xl (min-width: 1200px);
@custom-media --mq-base-xl-max (max-width: 1439.98px);
@custom-media --mq-base-xxl (min-width: 1440px);

/* User preferences and helper media queries */
@custom-media --mq-base-hd-color (dynamic-range: high);
@custom-media --mq-base-touch (hover: none) and (pointer: coarse);
@custom-media --mq-base-stylus (hover: none) and (pointer: fine);
@custom-media --mq-base-pointer (hover) and (pointer: coarse);
@custom-media --mq-base-mouse (hover) and (pointer: fine);
@custom-media --mq-base-scheme-dark (prefers-color-scheme: dark);
@custom-media --mq-base-scheme-light (prefers-color-scheme: light);
@custom-media --mq-base-motion-safe (prefers-reduced-motion: no-preference);
@custom-media --mq-base-motion-reduce (prefers-reduced-motion: reduce);
@custom-media --mq-base-opacity-safe (prefers-reduced-transparency: no-preference);
@custom-media --mq-base-opacity-reduce (prefers-reduced-transparency: reduce);
@custom-media --mq-base-data-safe (prefers-reduced-data: no-preference);
@custom-media --mq-base-data-reduce (prefers-reduced-data: reduce);
@custom-media --mq-base-contrast-more (prefers-contrast: more);
@custom-media --mq-base-contrast-less (prefers-contrast: less);
@custom-media --mq-base-portrait (orientation: portrait);
@custom-media --mq-base-landscape (orientation: landscape);

/* Responsive design media queries */
@custom-media --mq-respond-down-sm (max-width: 575.98px);
@custom-media --mq-respond-down-md (max-width: 767.98px);
@custom-media --mq-respond-down-lg (max-width: 991.98px);
@custom-media --mq-respond-down-xl (max-width: 1199.98px);
@custom-media --mq-respond-down-xxl (max-width: 1439.98px);
@custom-media --mq-respond-up-sm (min-width: 576px);
@custom-media --mq-respond-up-md (min-width: 768px);
@custom-media --mq-respond-up-lg (min-width: 992px);
@custom-media --mq-respond-up-xl (min-width: 1200px);
@custom-media --mq-respond-up-xxl (min-width: 1440px);
@custom-media --mq-respond-only-xs (max-width: 575.98px);
@custom-media --mq-respond-only-sm (min-width: 576px) and (max-width: 767.98px);
@custom-media --mq-respond-only-md (min-width: 768px) and (max-width: 991.98px);
@custom-media --mq-respond-only-lg (min-width: 992px) and (max-width: 1199.98px);
@custom-media --mq-respond-only-xl (min-width: 1200px) and (max-width: 1439.98px);
@custom-media --mq-respond-only-xxl (min-width: 1440px);
`}
    </Prism>
  </Container>
);

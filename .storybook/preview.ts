import type { Preview } from '@storybook/react';
import { ensure, themes } from '@storybook/theming';

// load custom fonts
import '../stories/assets/css/fonts.css';
// load the tokens
import '../tokens.css';

const preview: Preview = {
  parameters: {
    options: {
      showPanel: false,
      storySort: {
        order: ['Welcome'],
      },
    },
    docs: {
      theme: ensure(themes.normal),
    },
  },
};

export default preview;

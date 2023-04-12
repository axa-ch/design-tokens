import type { Preview } from '@storybook/react';
import { themes, ensure } from '@storybook/theming';

// load custom fonts
import '../stories/assets/css/fonts.css';

const preview: Preview = {
  parameters: {
    options: {
      showPanel: false,
    },
    docs: {
      theme: ensure(themes.normal),
    },
  },
};

export default preview;

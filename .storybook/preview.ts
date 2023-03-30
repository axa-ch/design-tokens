import type { Preview } from '@storybook/react';
// load custom fonts
import '../stories/assets/css/fonts.css';

const preview: Preview = {
  parameters: {
    options: {
      showPanel: false,
    },
  },
};

export default preview;

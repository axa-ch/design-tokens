import customMedia from 'postcss-custom-media';
import globalData from '@csstools/postcss-global-data';

export default () => {
  return {
    plugins: [
      globalData({
        files: ['./build/css//mq.css'],
      }),
      customMedia(),
    ],
  };
};

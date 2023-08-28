import content from '@originjs/vite-plugin-content';
import { join } from 'path';
const { mergeConfig } = require('vite');
const twig = require('vite-plugin-twig-loader');

const reduceArrayToObject = (arr) => {
  return arr.reduce((result, item) => {
    result[item[0]] = item[1];
    return result;
  }, {});
};

import filters from 'drupal-twig-extensions/filters/twig';
// update when https://github.com/JohnAlbin/drupal-twig-extensions/pull/56 merged
// + check helpers.
import functions from '../node_modules/drupal-twig-extensions/dist/functions/twig.cjs';

module.exports = {
  stories: [
    '../components/**/*.dynamic-stories.@(js|jsx|ts|tsx)',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials', './addons/sdc-sb/preset'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [
        content(),
        twig({
          filters: { ...reduceArrayToObject(filters) },
          functions: { ...reduceArrayToObject(functions) },
          settings: {
            allowAsync: false,
            'twig options': {
              allowInlineIncludes: true,
              namespaces: {
                sdc: join(__dirname, '../components'),
              },
            },
          },
        }),
      ],
      resolve: {
        alias: {
          '@sdc': join(__dirname, '../components/'),
        },
      },
    });
  },
  docs: {
    autodocs: true,
  },
};

import type { StoryIndexer, IndexedCSFFile } from '@storybook/types';
import { loadCsf } from '@storybook/csf-tools';
import { compile } from './compile';
import { vite, webpack, STORIES_REGEX } from './unplugin';

const logger = console;

const dynamicIndexer: StoryIndexer = {
  test: STORIES_REGEX,
  indexer: async (fileName, opts) => {
    delete require.cache[fileName];
    const compiled = await compile(fileName, opts);
    const indexed = (await loadCsf(compiled, {
      ...opts,
      fileName,
    }).parse()) as IndexedCSFFile;
    return indexed;
  },
};

export const storyIndexers: StoryIndexer[] = [dynamicIndexer];

export const viteFinal = async (config: any) => {
  const { plugins = [] } = config;
  plugins.push(vite());
  config.plugins = plugins;
  return config;
};

export const webpackFinal = async (config: any) => {
  const { plugins = [] } = config;
  plugins.push(webpack());
  config.plugins = plugins;
  return config;
};

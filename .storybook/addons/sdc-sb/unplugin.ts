import { createUnplugin } from 'unplugin';
import { compile } from './compile';

export const STORIES_REGEX = /\.dynamic-stories\.[tj]sx?/;

export const unplugin = createUnplugin((options) => {
  return {
    name: 'unplugin-dynamic-stories',
    enforce: 'pre',
    loadInclude(id) {
      return STORIES_REGEX.test(id);
    },
    async load(fileName) {
      delete require.cache[fileName];
      const result = await compile(fileName);
      return result;
    },
  };
});

export const { esbuild } = unplugin;
export const { webpack } = unplugin;
export const { rollup } = unplugin;
export const { vite } = unplugin;

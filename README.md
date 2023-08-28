# Drupal-Umami-SDC-Dynamic-Storybook
Rendering SDC in storybook with custom indexing

## What is it?

This is umami theme from Drupal OOB demo_umami profile.

1. With recently created(not merged) Banner/Card/Title/Read-more SDC components:
https://git.drupalcode.org/project/drupal/-/merge_requests/4652
https://git.drupalcode.org/project/drupal/-/merge_requests/4651/diffs

2. With vite-html storybook + twig.js

3. With custom indexer for specific `*.dynamic-stories.js` which allows to check:
If story directory contains `*.component.yml` then its `props/slots` parsed as `args` and `argTypes` and automatically attached to stories. So minimal story will be:
```
export default {
  title: 'Disclaimer',
};

export const Basic = {};
```
more info in `.storybook/addons/sdc-sb/compile.js` and
https://storybook.js.org/docs/react/configure/sidebar-and-urls#story-indexers

4. Some simple stories and styles added just to display Page and cards grid View in `./stories` directory.

## How to test?

- `yarn && yarn storybook` for dynamic testing.
- `yarn && yarn build-storybook` will generate static storybook which is presented in:
https://64eb6ad4ee3f7a70edb6fe5a--incredible-quokka-2f6254.netlify.app/?path=/story/page--basic

Or clone this theme into `/core/profiles/demo_umami/themes/` on 11.x Drupal and test on Drupal side how components work.
<details>
  <summary>Spoiler warning</summary>
  They work!
</details>

#### Any feedback will be much appreciated!
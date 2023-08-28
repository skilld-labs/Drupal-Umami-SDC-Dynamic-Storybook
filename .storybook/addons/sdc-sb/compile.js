import { dedent } from 'ts-dedent';
import { builders, generateCode, parseModule } from 'magicast';
import { load } from 'js-yaml';
import { existsSync, readFileSync } from 'fs';
import objectMapper from 'object-mapper';
import { COMPONENT_TO_STORY } from './maps';

export const compile = async (fileName, opts) => {
  const { src } =
    checkAndGetYamlFileContent(
      fileName.replace('.dynamic-stories.js', '.component.yml'),
      'component',
    ) || false;

  if (!src) return;

  const { args, argTypes, template } = getComponent(src, fileName);

  const result =
    dedent`
  import { addDrupalExtensions } from 'drupal-twig-extensions/twig';
  import Twig from 'twig';
  addDrupalExtensions(Twig);
  import { path, ctx, globals, settings } from '${template}';
  import DA from 'drupal-attribute';
  const twg = Twig.twig({
    data: ctx,
    allowInlineIncludes: true,
  });
  const render = (args) => {
    const attributes = new DA();
    return twg.render({ attributes, ...args })
  };
  const play = async ({ canvasElement }) => {
    Drupal.attachBehaviors(canvasElement, drupalSettings);
  }

  ` + readFileSync(fileName, 'utf8');

  const parsed = parseModule(result);

  parsed.exports.default.args ||= {};
  if (args) {
    parsed.exports.default.args = Object.assign(
      args,
      parsed.exports.default.args,
    );
  }

  parsed.exports.default.argTypes ||= {};
  if (argTypes) {
    parsed.exports.default.argTypes = Object.assign(
      argTypes,
      parsed.exports.default.argTypes,
    );
  }

  parsed.exports.default.render = builders.raw(`render`);
  parsed.exports.default.play = builders.raw(`play`);

  const { code } = generateCode(parsed);
  return code;
};

const checkAndGetYamlFileContent = (fileName) => {
  if (existsSync(fileName)) {
    return {
      src: load(readFileSync(fileName, 'utf8')),
    };
  }
};

const getComponent = (yaml, fileName) => {
  const result = {
    template: fileName.replace('.dynamic-stories.js', '.twig'),
    ...objectMapper({ yaml }, COMPONENT_TO_STORY),
  };

  return result;
};

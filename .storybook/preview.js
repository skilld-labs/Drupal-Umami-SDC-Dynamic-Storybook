import Twig from 'twig';
import once from '@drupal/once';

// Here we import theme css.
import.meta.glob(['../css/classy/components/**/*.css'], {
  import: 'default',
  eager: true,
});
import '../css/base.css';
import.meta.glob(['../css/components/**/*.css', '../css/layout/**/*.css'], {
  import: 'default',
  eager: true,
});

// we heed to have cashed twig templates to have `include @namespace`
const allTwigTemplates = import.meta.glob(['../components/**/*.twig'], {
  as: 'raw',
  import: 'default',
  eager: true,
});

// here we initiate all twig templates to save them in cache of Twig.Templates.registry
// and get by reference in render.
for (const [path, data] of Object.entries(allTwigTemplates)) {
  Twig.twig({
    id: path.replace('../components/', '@sdc/'),
    data: data,
  });
}

export default {
  parameters: {
    layout: 'fullscreen',
  },
};

// Drupal + drupalSettings + once

window.Drupal = { behaviors: {} };
window.drupalSettings = {};
window.once = once;

((Drupal, drupalSettings) => {
  // Simplified Drupal.t() function just to be able to use such constructions
  // directly from component's js behaviors.
  Drupal.t = function (str) {
    return str;
  };

  Drupal.throwError = function (error) {
    setTimeout(function () {
      throw error;
    }, 0);
  };

  Drupal.attachBehaviors = function (context, settings) {
    context = context || document;
    settings = settings || drupalSettings;
    const behaviors = Drupal.behaviors;
    // Execute all of them.
    Object.keys(behaviors || {}).forEach((i) => {
      if (typeof behaviors[i].attach === 'function') {
        // Don't stop the execution of behaviors in case of an error.
        try {
          behaviors[i].attach(context, settings);
        } catch (e) {
          Drupal.throwError(e);
        }
      }
    });
  };
})(Drupal, window.drupalSettings);

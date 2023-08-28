export const COMPONENT_TO_STORY = {
  yaml: [
    {
      transform: (
        sourceValue,
        sourceObject,
        destinationObject,
        destinationKey,
      ) => {
        const args = {};
        const argTypes = {};
        if (sourceValue?.props?.properties) {
          Object.entries(sourceValue.props.properties).forEach(
            ([argName, argValue]) => {
              argTypes[argName] = {
                ...(argValue.title && { name: argValue.title }),
                ...(argValue.description && {
                  description: argValue.description,
                }),
                ...(argValue.type && {
                  control: {
                    type: transformComponentControlToStorybook(argValue.type),
                    ...(argValue.required && { required: true }),
                  },
                }),
                ...(argValue.enum && {
                  options: Object.values(argValue.enum),
                }),
                table: {
                  category: 'Properties',
                },
              };
              if (argValue.examples) {
                args[argName] = argValue.examples[0];
              }
              if (argValue.default) {
                args[argName] = argValue.default;
              }
            },
          );
        }
        if (sourceValue?.slots) {
          Object.entries(sourceValue.slots).forEach(([argName, argValue]) => {
            argTypes[argName] = {
              ...(argValue.title && { name: argValue.title }),
              ...(argValue.description && {
                description: argValue.description,
              }),
              ...(argValue.type && {
                control: {
                  type: transformComponentControlToStorybook(argValue.type),
                  ...(argValue.required && { required: true }),
                },
              }),
              ...(argValue.enum && {
                options: Object.values(argValue.enum),
              }),
              table: {
                category: 'Slots',
              },
            };
            if (argValue.examples) {
              args[argName] = argValue.examples[0];
            }
            if (argValue.default) {
              args[argName] = argValue.default;
            }
          });
        }

        destinationObject.args = { ...args };
        destinationObject.argTypes = { ...argTypes };
      },
    },
  ],
};

// Transforms Drupal module style to storybook
// from:
// https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components/annotated-example-componentyml
// to:
// https://storybook.js.org/docs/7.0/html/api/argtypes

const transformComponentControlToStorybook = (type) => {
  switch (type) {
    case 'string':
      return 'text';
  }
  return type;
};

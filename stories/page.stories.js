import { addDrupalExtensions } from 'drupal-twig-extensions/twig';
import Twig from 'twig';
addDrupalExtensions(Twig);
import banner, {
  WithChildComponents as WithChildComponentsBanner,
} from '../components/banner/banner.dynamic-stories';
import view, { Basic as BasicView } from './view.stories';
import { ctx } from '../templates/layout/page.html.twig';
export default {
  title: 'Page',
  render: (args) =>
    Twig.twig({
      data: ctx,
      allowInlineIncludes: true,
    }).render(args),
  args: {
    page: {
      banner_top: `
        ${banner.render({
          ...WithChildComponentsBanner.args,
          image: `<img src='https://placekitten.com/1000/500'/>`,
        })}
      `,
      content: `
        <div class="container">
          ${view.render({ ...BasicView.args })}
        </div>
      `,
    },
  },
};

export const Basic = {};

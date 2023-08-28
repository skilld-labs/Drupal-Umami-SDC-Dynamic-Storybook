import DrupalAttribute from 'drupal-attribute';
import './card.css';
import title, {
  Basic as BasicTitle,
} from '../title/title.dynamic-stories';

import readMore, {
  Basic as BasicReadMore,
} from '../read-more/read-more.dynamic-stories';

export default {
  title: 'Card',
};

export const Basic = {};

export const ArticleExample = {
  ...Basic,
  args: {
    content: `
      ${title.render({
        ...BasicTitle.args,
        label: 'This is title component',
        attributes: new DrupalAttribute().addClass('umami-card__title'),
      })}
      <img src="https://placekitten.com/600/600"/>
      ${readMore.render({
        ...BasicReadMore.args,
        text: 'This is read-more component',
        extra_classes: 'umami-card__read-more'
      })}
    `,
  },
};

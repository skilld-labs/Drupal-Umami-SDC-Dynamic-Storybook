import DrupalAttribute from 'drupal-attribute';
import './quick-css.css';
import title, {
  Basic as BasicTitle,
} from '../components/title/title.dynamic-stories';
import card, {
  Basic as BasicCard,
  ArticleExample as ArticleExampleCard,
} from '../components/card/card.dynamic-stories';

export default {
  title: 'View',
  render: () => {
    return `
      <div class="m-block">
        ${title.render({
          ...BasicTitle.args,
          label:
            'Explore recipes across every type of occasion, ingredient, and skill level',
          attributes: new DrupalAttribute().addClass('m-block__title'),
        })}
        <div class="h-grid h-grid--3">
          ${card.render({ ...ArticleExampleCard.args })}
          ${card.render({ ...ArticleExampleCard.args })}
          ${card.render({ ...ArticleExampleCard.args })}
          ${card.render({ ...ArticleExampleCard.args })}
          ${card.render({ ...ArticleExampleCard.args })}
        </div>
      </div>
    `;
  },
};

export const Basic = {};

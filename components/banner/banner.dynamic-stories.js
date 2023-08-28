import './banner.css';
import title, { Basic as BasicTitle } from '../title/title.dynamic-stories';
import readMore, {
  Basic as BasicReadMore,
} from '../read-more/read-more.dynamic-stories';

export default {
  title: 'Banner',
};

export const Basic = {};

export const WithChildComponents = {
  ...Basic,
  args: {
    content: `
      ${title.render({
        ...BasicTitle.args,
        label: 'This is title component',
      })}
      ${readMore.render({
        ...BasicReadMore.args,
        text: 'This is read-more component',
      })}
    `,
  },
};

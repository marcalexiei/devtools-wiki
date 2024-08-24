import { For, Match, Switch } from 'solid-js';
import type { JSX } from 'solid-js';
import type { DevToolArticle } from '../../models/DevToolArticle';
import { CategoryArticlesArticle } from './CategoryArticlesArticle';

interface CategoryArticlesViewProps {
  articles: Array<DevToolArticle>;
}

export function CategoryArticlesView(
  props: CategoryArticlesViewProps,
): JSX.Element {
  return (
    <Switch fallback={<p>No articles</p>}>
      <Match when={props.articles.length}>
        <ul style={{ 'list-style': 'none', margin: 0, padding: 0 }}>
          <For each={props.articles}>
            {(article) => (
              <li
                style={{
                  'border-bottom': '1px solid black',
                  'padding-bottom': '.5rem',
                }}
              >
                <CategoryArticlesArticle article={article} />
              </li>
            )}
          </For>
        </ul>
      </Match>
    </Switch>
  );
}

import type { JSX } from 'solid-js';
import { For, Match, Switch } from 'solid-js';
import type { DevToolArticle } from '../../models/DevToolArticle.ts';
import { CategoryArticlesArticle } from './CategoryArticlesArticle.tsx';

import './CategoryArticlesView.scss';

interface CategoryArticlesViewProps {
  articles: Array<DevToolArticle>;
}

export function CategoryArticlesView(
  props: CategoryArticlesViewProps,
): JSX.Element {
  return (
    <Switch fallback={<p>No articles</p>}>
      <Match when={props.articles.length}>
        <ul class="category-articles-view">
          <For each={props.articles}>
            {(article) => (
              <li>
                <CategoryArticlesArticle article={article} />
              </li>
            )}
          </For>
        </ul>
      </Match>
    </Switch>
  );
}

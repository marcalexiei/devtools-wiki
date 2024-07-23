import { For, Match, Switch, type JSX } from 'solid-js';
import { z } from 'zod';
import { createQuery } from '@tanstack/solid-query';
import { AppPage, AppPageTitle } from '../../components/App/AppPage';
import { DEV_TOOL_ARTICLE_SCHEMA } from '../../models/DevToolArticle';
import type { DevToolArticleCategory } from '../../models/DevToolArticleCategory';
import { CategoryArticlesArticle } from './CategoryArticlesArticle';

interface CategoryArticlesProps {
  category: DevToolArticleCategory;
}

export function CategoryArticles(props: CategoryArticlesProps): JSX.Element {
  const { category } = props;

  const query = createQuery(() => ({
    queryKey: ['articles', category.id],
    queryFn: async () => {
      const articles = await import(
        `../../data/categories/${category.id}.json`
      );

      const schema = z.object({
        articles: z.array(DEV_TOOL_ARTICLE_SCHEMA),
      });

      return schema.parse(articles);
    },
  }));

  return (
    <AppPage>
      <AppPageTitle>Fun</AppPageTitle>

      <Switch>
        <Match when={query.isPending}>
          <p>Loading...</p>
        </Match>
        <Match when={query.isError}>
          <p>Error: {query.error?.message}</p>
        </Match>
        <Match when={query.isSuccess}>
          <Switch fallback={<p>No articles</p>}>
            <Match when={query.data?.articles?.length}>
              <ul style={{ 'list-style': 'none', margin: 0, padding: 0 }}>
                <For each={query.data?.articles}>
                  {(article) => (
                    <li>
                      <CategoryArticlesArticle article={article} />
                    </li>
                  )}
                </For>
              </ul>
            </Match>
          </Switch>
        </Match>
      </Switch>
    </AppPage>
  );
}

import { createMemo, Match, Switch } from 'solid-js';
import type { JSX } from 'solid-js';
import { z } from 'zod';
import { createQuery } from '@tanstack/solid-query';
import { AppPage, AppPageTitle } from '../../components/App/AppPage';
import { DEV_TOOL_ARTICLE_SCHEMA } from '../../models/DevToolArticle';
import type { DevToolArticleCategory } from '../../models/DevToolArticleCategory';
import { CategoryArticlesView } from './CategoryArticlesView';
import { useAppContext } from '../../components/App/AppContext';
import { AppPage404 } from '../../components/App/AppPage404';

interface CategoryArticlesProps {
  categoryID: DevToolArticleCategory['id'];
}

export function CategoryArticles(props: CategoryArticlesProps): JSX.Element {
  const categoryID = props.categoryID;

  const appContextData = useAppContext();

  const _categoryData = createMemo(() =>
    appContextData.categories.find((it) => it.id === categoryID),
  );

  const query = createQuery(() => ({
    queryKey: ['articles', categoryID],
    queryFn: async () => {
      const articles = await import(`../../data/categories/${categoryID}.json`);

      const schema = z.object({
        articles: z.array(DEV_TOOL_ARTICLE_SCHEMA),
      });

      return schema.parse(articles);
    },
    enabled: !!_categoryData,
  }));

  const categoryData = _categoryData();

  if (!categoryData) {
    return <AppPage404 />;
  }

  return (
    <AppPage>
      <AppPageTitle>{categoryData.label}</AppPageTitle>

      <Switch>
        <Match when={query.isPending}>
          <p>Loading...</p>
        </Match>
        <Match when={query.isError}>
          <p>Error: {query.error?.message}</p>
        </Match>
        <Match when={query.isSuccess}>
          <CategoryArticlesView articles={query?.data?.articles as never} />
        </Match>
      </Switch>
    </AppPage>
  );
}

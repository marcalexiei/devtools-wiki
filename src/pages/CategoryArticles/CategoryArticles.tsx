import { createQuery } from '@tanstack/solid-query';
import type { JSX } from 'solid-js';
import { createMemo, Match, Switch } from 'solid-js';
import { z } from 'zod';
import { useAppContext } from '../../components/App/AppContext.tsx';
import { AppPage, AppPageTitle } from '../../components/App/AppPage.tsx';
import { AppPage404 } from '../../components/App/AppPage404.tsx';
import { DEV_TOOL_ARTICLE_SCHEMA } from '../../models/DevToolArticle.ts';
import type { DevToolArticleCategory } from '../../models/DevToolArticleCategory.ts';
import { CategoryArticlesView } from './CategoryArticlesView.tsx';

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

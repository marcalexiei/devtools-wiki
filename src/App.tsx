import { Switch, Match } from 'solid-js';
import type { JSX, ParentProps } from 'solid-js';
import { z } from 'zod';
import { createQuery } from '@tanstack/solid-query';

import { DEV_TOOL_ARTICLE_CATEGORY_SCHEMA } from './models/DevToolArticleCategory';
import { AppContextProvider } from './components/App/AppContextProvider';

export function App(props: ParentProps): JSX.Element {
  const query = createQuery(() => ({
    queryKey: ['categories'],
    queryFn: async () => {
      const categoriesResponse = await import('./data/categories.json');

      const schema = z.object({
        categories: z.array(DEV_TOOL_ARTICLE_CATEGORY_SCHEMA),
      });

      return schema.parse(categoriesResponse);
    },
  }));

  return (
    <Switch>
      <Match when={query.isPending}>
        <p>Loading...</p>
      </Match>
      <Match when={query.isError}>
        <p>Error: {query.error?.message}</p>
      </Match>
      <Match when={query.isSuccess}>
        <AppContextProvider categories={query.data?.categories ?? []}>
          {props.children}
        </AppContextProvider>
      </Match>
    </Switch>
  );
}

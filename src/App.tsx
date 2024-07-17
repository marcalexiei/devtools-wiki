import { lazy } from 'solid-js';
import type { JSX } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import { Switch, Match, For } from 'solid-js';
import { z } from 'zod';
import { createQuery } from '@tanstack/solid-query';

import { DEV_TOOL_CATEGORY_SCHEMA } from './models/DevToolCategory';
import { AppPage } from './components/App/AppPage';
import { AppContextProvider } from './components/App/AppContextProvider';

const Home = lazy(() =>
  import('./pages/Home/Home').then(({ Home }) => ({ default: Home })),
);

export function App(): JSX.Element {
  const query = createQuery(() => ({
    queryKey: ['categories'],
    queryFn: async () => {
      const categoriesResponse = await import('./data/categories.json');

      const schema = z.object({
        categories: z.array(DEV_TOOL_CATEGORY_SCHEMA),
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
        <p>Error: {query.error.message}</p>
      </Match>
      <Match when={query.isSuccess}>
        <AppContextProvider categories={query.data.categories}>
          <Router>
            <Route path="/" component={Home} />
            <For each={query.data.categories}>
              {(category) => (
                <Route
                  path={category.id}
                  component={() => (
                    <AppPage>
                      <h1>{category.label}</h1>
                    </AppPage>
                  )}
                />
              )}
            </For>
          </Router>
        </AppContextProvider>
      </Match>
    </Switch>
  );
}

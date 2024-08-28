import type { JSX, ParentProps } from 'solid-js';
import { render, screen, waitFor } from '@solidjs/testing-library';
import { describe, expect, it, vitest, afterEach } from 'vitest';
import { QueryClientProvider } from '@tanstack/solid-query';
import { createMemoryHistory, MemoryRouter, Route } from '@solidjs/router';

import { AppContextProvider } from '../../components/App/AppContextProvider';
import { AppQueryClient } from '../../AppQueryClient';
import type { DevToolArticleCategory } from '../../models/DevToolArticleCategory';
import type { DevToolArticle } from '../../models/DevToolArticle';
import { AppPage404 } from '../../components/App/AppPage404';

import { CategoryArticles } from './CategoryArticles';

const CATEGORIES_MOCK: Array<DevToolArticleCategory> = [
  {
    id: 'fun',
    label: 'Fun',
  },
  {
    id: 'test',
    label: 'Test',
  },
];

const ARTICLES_MOCK: Array<DevToolArticle> = [
  {
    title: 'React semantic names',
    description: 'funny way to identify when some variable should not be used',
    url: 'https://github.com/facebook/react/blob/80bff5397bf854750dbe7c286f61654ea58938c5/src/umd/ReactUMDEntry.js',
  },
  {
    title: 'Git VCS explanation',
    description: 'The original git explanation by Linus Torvalds... ',
    url: 'https://github.com/git/git/blob/e83c5163316f89bfbde7d9ab23ca2e25604af290/README',
  },
  {
    title: 'How to be a -10x Engineer',
    description: [
      '+10x engineers may be mythical, but -10x engineers exist.',
      'A complete guide about how to be a very !professional developer.',
    ],
    url: 'https://taylor.town/-10x',
  },
];

vitest.mock('../../components/App/AppPage404', () => ({
  // biome-ignore lint/style/useNamingConvention: mocking component name
  AppPage404: vitest.fn(),
}));

vitest.mock('../../data/categories/fun.json', () => ({
  articles: ARTICLES_MOCK,
}));

describe('<CategoryArticles />', () => {
  afterEach(() => {
    vitest.resetAllMocks();
  });

  type RenderCategoryArticlesResult = ReturnType<typeof render> & {
    history: ReturnType<typeof createMemoryHistory>;
  };

  function renderCategoryArticles(
    ui: () => JSX.Element,
  ): RenderCategoryArticlesResult {
    const history = createMemoryHistory();

    function Wrapper(props: ParentProps) {
      return (
        <QueryClientProvider client={AppQueryClient}>
          <AppContextProvider categories={CATEGORIES_MOCK}>
            <MemoryRouter history={history}>
              <Route component={() => props.children} />
            </MemoryRouter>
          </AppContextProvider>
        </QueryClientProvider>
      );
    }

    return { ...render(ui, { wrapper: Wrapper }), history };
  }

  it('should display loading ', async () => {
    renderCategoryArticles(() => <CategoryArticles categoryID="fun" />);

    screen.getByText('Loading...');
  });

  it('should show 404 when categoryID does not exists', () => {
    renderCategoryArticles(() => <CategoryArticles categoryID="asd" />);

    expect(AppPage404).toHaveBeenCalledOnce();
  });

  it('Loads all category articles', async () => {
    renderCategoryArticles(() => <CategoryArticles categoryID="fun" />);

    await waitFor(() => expect(screen.queryByText('Loading...')).toBeFalsy());

    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(
      ARTICLES_MOCK.length,
    );

    for (const it of ARTICLES_MOCK) {
      screen.getByRole('heading', { name: it.title });
    }
  });
});

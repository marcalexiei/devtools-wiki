import { Navigate, Route, Router } from '@solidjs/router';
import { QueryClientProvider } from '@tanstack/solid-query';
import { ErrorBoundary, lazy, Suspense } from 'solid-js';
import { render } from 'solid-js/web';
import { App } from './App.tsx';
import { APP_BASE_PATH } from './AppBasePath.ts';
import { AppQueryClient } from './AppQueryClient.ts';
import { AppErrorBoundaryFallback } from './components/App/AppErrorBoundaryFallback.tsx';
import { AppPage404 } from './components/App/AppPage404.tsx';
import { ThemeContextProvider } from './components/Theme/ThemeContext.tsx';
import { UIPageLayoutLoading } from './components/UIPage/UIPageLayoutLoading.tsx';

import './style.scss';

if (window.location.search.startsWith('?/')) {
  const path = window.location.search.slice(1);
  window.history.replaceState('redirect', '', `/${APP_BASE_PATH}${path}`);
}

const Home = lazy(() =>
  import('./pages/Home/Home.tsx').then(({ Home: Cmp }) => ({ default: Cmp })),
);

const Outgoing = lazy(() =>
  import('./pages/Outgoing/Outgoing.tsx').then(({ Outgoing: Cmp }) => ({
    default: Cmp,
  })),
);
const CategoryArticles = lazy(() =>
  import('./pages/CategoryArticles/CategoryArticles.tsx').then(
    ({ CategoryArticles: Cmp }) => ({ default: Cmp }),
  ),
);

render(
  () => (
    <QueryClientProvider client={AppQueryClient}>
      <ThemeContextProvider>
        <Suspense fallback={<UIPageLayoutLoading />}>
          <ErrorBoundary fallback={AppErrorBoundaryFallback}>
            <Router base={APP_BASE_PATH} root={App}>
              <Route path="/" component={() => <Navigate href="home" />} />
              <Route path="home" component={Home} />
              <Route path="outgoing" component={Outgoing} />
              <Route
                path="category/:category"
                component={(props) => (
                  <CategoryArticles categoryID={props.params.category} />
                )}
              />
              <Route path="*" component={AppPage404} />
            </Router>
          </ErrorBoundary>
        </Suspense>
      </ThemeContextProvider>
    </QueryClientProvider>
  ),
  // biome-ignore lint/style/noNonNullAssertion: not needed, this element is always present
  document.getElementById('root')!,
);

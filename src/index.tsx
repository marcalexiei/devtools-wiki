import { render } from 'solid-js/web';
import { ErrorBoundary, lazy, Suspense } from 'solid-js';
import { Router, Route, Navigate } from '@solidjs/router';
import { QueryClientProvider } from '@tanstack/solid-query';
import { App } from './App';
import { APP_BASE_PATH } from './AppBasePath';
import { AppQueryClient } from './AppQueryClient';
import { AppErrorBoundaryFallback } from './components/App/AppErrorBoundaryFallback';
import { AppPage404 } from './components/App/AppPage404';
import { ThemeContextProvider } from './components/Theme/ThemeContext';
import { UIPageLayoutLoading } from './components/UIPage/UIPageLayoutLoading';

import './style.scss';

const Home = lazy(() =>
  import('./pages/Home/Home').then(({ Home: Cmp }) => ({ default: Cmp })),
);
const Outgoing = lazy(() =>
  import('./pages/Outgoing/Outgoing').then(({ Outgoing: Cmp }) => ({
    default: Cmp,
  })),
);
const CategoryArticles = lazy(() =>
  import('./pages/CategoryArticles/CategoryArticles').then(
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

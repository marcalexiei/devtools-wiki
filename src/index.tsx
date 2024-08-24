import { render } from 'solid-js/web';
import { ErrorBoundary, lazy, Suspense } from 'solid-js';
import { Navigate, Route, Router } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { AppErrorBoundaryFallback } from './components/App/AppErrorBoundaryFallback';
import { App } from './App';
import { AppPage404 } from './components/App/AppPage404';

import './style.scss';
import { APP_BASE_PATH } from './APP_BASE_PATH';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const Home = lazy(() =>
  import('./pages/Home/Home').then(({ Home }) => ({ default: Home })),
);
const Outgoing = lazy(() =>
  import('./pages/Outgoing/Outgoing').then(({ Outgoing }) => ({
    default: Outgoing,
  })),
);
const CategoryArticles = lazy(() =>
  import('./pages/CategoryArticles/CategoryArticles').then(
    ({ CategoryArticles }) => ({ default: CategoryArticles }),
  ),
);

render(
  () => (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<>Loading</>}>
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
    </QueryClientProvider>
  ),
  // biome-ignore lint/style/noNonNullAssertion: not needed, this element is always present
  document.getElementById('root')!,
);

import { render } from 'solid-js/web';
import { ErrorBoundary, lazy, Suspense } from 'solid-js';
import { Route, Router } from '@solidjs/router';
import { AppErrorBoundaryFallback } from './components/AppErrorBoundaryFallback/AppErrorBoundaryFallback';

const Home = lazy(() =>
  import('./pages/Home/Home').then(({ Home }) => ({ default: Home })),
);

// biome-ignore lint/style/noNonNullAssertion: not needed, this is always present
const root = document.getElementById('root')!;

render(
  () => (
    <Suspense fallback={<>Loading</>}>
      <ErrorBoundary fallback={AppErrorBoundaryFallback}>
        <Router>
          <Route path="/" component={Home} />
        </Router>
      </ErrorBoundary>
    </Suspense>
  ),
  root,
);

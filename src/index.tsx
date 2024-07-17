import { render } from 'solid-js/web';
import { ErrorBoundary, Suspense } from 'solid-js';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { AppErrorBoundaryFallback } from './components/App/AppErrorBoundaryFallback';
import { App } from './App';

const queryClient = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion: not needed, this is always present
const root = document.getElementById('root')!;

render(
  () => (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<>Loading</>}>
        <ErrorBoundary fallback={AppErrorBoundaryFallback}>
          <App />
        </ErrorBoundary>
      </Suspense>
    </QueryClientProvider>
  ),
  root,
);

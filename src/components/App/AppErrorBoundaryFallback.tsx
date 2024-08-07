import type { ComponentProps, ErrorBoundary, JSX } from 'solid-js';
import { UIPageLayout } from '../UIPage/UIPageLayout';

type AppErrorBoundaryFallbackFunction = Exclude<
  ComponentProps<typeof ErrorBoundary>['fallback'],
  JSX.Element
>;

export const AppErrorBoundaryFallback: AppErrorBoundaryFallbackFunction = (
  err,
  reset,
): JSX.Element => {
  let message = 'unknown';
  if ('message' in err && typeof err.message === 'string') {
    message = err.message;
  }

  console.error(err);

  return (
    <UIPageLayout>
      <h1>An error occurred</h1>

      <p>Message: {message}</p>

      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </UIPageLayout>
  );
};

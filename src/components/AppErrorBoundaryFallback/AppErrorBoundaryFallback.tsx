import type { ComponentProps, ErrorBoundary, JSX } from 'solid-js';
import { UIPageLayout } from '../UIPage/UIPageLayout';

type AppErrorBoundaryFallbackFunction = Extract<
  ComponentProps<typeof ErrorBoundary>['fallback'],
  (...args: Array<unknown>) => unknown
>;

export const AppErrorBoundaryFallback: AppErrorBoundaryFallbackFunction = (
  err,
  reset,
): JSX.Element => {
  let message = 'unknown';
  if ('message' in err && typeof err.message === 'string') {
    message = err.message;
  }

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

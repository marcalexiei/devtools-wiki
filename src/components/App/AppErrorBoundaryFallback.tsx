import type { ComponentProps, ErrorBoundary, JSX } from 'solid-js';
import { UIPageLayout } from '../UIPage/UIPageLayout';
import { AppPageTitle } from './AppPage';

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

  // biome-ignore lint/suspicious/noConsole: debug
  console.error(err);

  return (
    <UIPageLayout
      content={
        <>
          <AppPageTitle>An error occurred</AppPageTitle>

          <p>Message: {message}</p>

          <button type="button" onClick={() => reset()}>
            Try again
          </button>
        </>
      }
    />
  );
};

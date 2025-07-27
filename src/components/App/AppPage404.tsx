import { A } from '@solidjs/router';
import { UIPageLayout } from '../UIPage/UIPageLayout.tsx';
import { AppPageTitle } from './AppPage.tsx';

export function AppPage404() {
  return (
    <UIPageLayout
      content={
        <>
          <AppPageTitle>404 - Not found</AppPageTitle>

          <nav>
            <A href="/">Return to home</A>
          </nav>
        </>
      }
    />
  );
}

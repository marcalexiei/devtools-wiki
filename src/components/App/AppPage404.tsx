import { UIPageLayout } from '../UIPage/UIPageLayout';
import { AppPageTitle } from './AppPage';

export function AppPage404() {
  return (
    <UIPageLayout
      content={
        <>
          <AppPageTitle>404 - Not found</AppPageTitle>

          <nav>
            <a href="/">Return to home</a>
          </nav>
        </>
      }
    />
  );
}

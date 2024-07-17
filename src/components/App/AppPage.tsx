import type { JSX } from 'solid-js';
import { UIPageLayout } from '../UIPage/UIPageLayout';
import { AppPageNavigation } from './AppPageNavigation';

interface AppPageProps {
  children: JSX.Element;
}

export function AppPage(props: AppPageProps): JSX.Element {
  const { children } = props;

  return (
    <UIPageLayout>
      <AppPageNavigation />

      {children}
    </UIPageLayout>
  );
}

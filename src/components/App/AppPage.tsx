import type { JSX } from 'solid-js';
import { UIPageLayout } from '../UIPage/UIPageLayout';
import { AppPageNavigation } from './AppPageNavigation';
import { AppFooter } from './AppFooter';
import { AppHeader } from './Header/AppHeader';

interface AppPageProps {
  children: JSX.Element;
}

export function AppPage(props: AppPageProps): JSX.Element {
  return (
    <UIPageLayout
      header={<AppHeader />}
      navigation={<AppPageNavigation />}
      content={props.children}
      footer={<AppFooter />}
    />
  );
}

interface AppPageTitleProps {
  children: JSX.Element;
}

export function AppPageTitle(props: AppPageTitleProps): JSX.Element {
  return <h1>{props.children}</h1>;
}

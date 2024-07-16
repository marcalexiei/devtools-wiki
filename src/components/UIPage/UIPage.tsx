import type { JSX } from 'solid-js';
import { UIPageLayout } from './UIPageLayout';

interface UIPageProps {
  children: JSX.Element;
}

export function UIPage(props: UIPageProps): JSX.Element {
  const { children } = props;

  return <UIPageLayout>{children}</UIPageLayout>;
}

import type { JSX } from 'solid-js';

interface UIPageLayoutProps {
  children: JSX.Element;
}

export function UIPageLayout(props: UIPageLayoutProps): JSX.Element {
  const { children } = props;

  return <div style={{ 'max-width': '740px', margin: 'auto' }}>{children}</div>;
}

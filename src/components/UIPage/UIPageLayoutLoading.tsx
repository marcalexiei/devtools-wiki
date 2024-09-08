import { UIPageLayout } from './UIPageLayout';

export function UIPageLayoutLoading() {
  return (
    <UIPageLayout
      content={
        <div
          style={{
            'text-align': 'center',
            padding: '2rem',
            'font-size': '2rem',
          }}
        >
          Loading...
        </div>
      }
    />
  );
}

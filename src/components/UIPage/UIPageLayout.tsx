import type { JSX } from 'solid-js';

interface UIPageLayoutProps {
  content: JSX.Element;

  header?: JSX.Element;
  navigation?: JSX.Element;
  footer?: JSX.Element;
}

export function UIPageLayout(props: UIPageLayoutProps): JSX.Element {
  return (
    <div
      style={{
        'min-height': '100vh',
        display: 'flex',
        'flex-direction': 'column',
        'max-width': '740px',
        padding: '0 1rem',
        margin: 'auto',
      }}
    >
      {props.header && (
        <>
          {props.header}
          <hr />
        </>
      )}

      {props.navigation && (
        <>
          {props.navigation}
          <hr />
        </>
      )}

      <main style={{ 'flex-grow': 1 }}>{props.content}</main>

      {props.footer}
    </div>
  );
}

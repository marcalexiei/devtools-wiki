import type { JSX } from 'solid-js';

export function AppHeader(): JSX.Element {
  return (
    <header>
      <a
        href="/"
        style={{
          display: 'block',
          'margin-top': '1rem',
          'font-size': '1.5rem',
        }}
      >
        MarcAlexiei's devtool wiki
      </a>
    </header>
  );
}

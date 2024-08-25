import type { JSX } from 'solid-js';
import { A } from '@solidjs/router';

export function AppHeader(): JSX.Element {
  return (
    <header>
      <A
        href="/home"
        style={{
          display: 'block',
          'margin-top': '1rem',
          'font-size': '1.5rem',
        }}
      >
        MarcAlexiei's devtool wiki
      </A>
    </header>
  );
}

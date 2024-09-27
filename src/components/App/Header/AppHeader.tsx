import type { JSX } from 'solid-js';
import { A } from '@solidjs/router';
import { AppHeaderThemeSwitch } from './ThemeSwitch/AppHeaderThemeSwitch';

export function AppHeader(): JSX.Element {
  return (
    <header
      style={{
        display: 'flex',
        gap: '0.5rem',
        'align-items': 'center',
        'justify-content': 'space-between',
        'margin-top': '1rem',
      }}
    >
      <A
        href="/home"
        style={{
          display: 'block',
          'font-size': '1.5rem',
        }}
      >
        MarcAlexiei's devtools wiki
      </A>

      <AppHeaderThemeSwitch />
    </header>
  );
}

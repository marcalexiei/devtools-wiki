import type { JSX } from 'solid-js';
import { A } from '@solidjs/router';
import { useThemeContext } from '../Theme/ThemeContext';
import type { ThemeValue } from '../Theme/ThemeContext';

export function AppHeader(): JSX.Element {
  const { themeValue, setThemeValue } = useThemeContext();

  return (
    <header
      style={{
        display: 'flex',
        gap: '0.5rem',
        'align-items': 'center',
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
        MarcAlexiei's devtool wiki
      </A>

      <select
        aria-label="theme selection"
        onChange={(event) => {
          setThemeValue(event.target.value as ThemeValue);
        }}
        value={themeValue()}
      >
        <option value="system">system</option>
        <option value="dark">dark</option>
        <option value="light">light</option>
      </select>
    </header>
  );
}

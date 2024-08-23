import type { JSX } from 'solid-js';
import { LinkExternal } from '../LinkExternal/LinkExternal';

export function AppFooter(): JSX.Element {
  return (
    <footer style={{ margin: '1rem 0', 'text-align': 'center' }}>
      <LinkExternal url="https://github.com/marcalexiei/devtools-wiki">
        View code
      </LinkExternal>
    </footer>
  );
}

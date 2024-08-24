import { For } from 'solid-js';
import type { ParentProps, JSX } from 'solid-js';
import { useMatch } from '@solidjs/router';

import { useAppContext } from './AppContextProvider';

interface AppPageNavigationLinkProps extends ParentProps {
  href: string;
}

function AppPageNavigationLink(props: AppPageNavigationLinkProps): JSX.Element {
  const match = useMatch(() => props.href);

  return (
    <a href={props.href} style={{ 'font-weight': match() ? 'bold' : 'normal' }}>
      {props.children}
    </a>
  );
}

export function AppPageNavigation(): JSX.Element {
  const appContextData = useAppContext();

  return (
    <nav>
      <ul
        style={{
          'list-style': 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        <li>
          <AppPageNavigationLink href="/">Home</AppPageNavigationLink>
        </li>
        <For each={appContextData.categories}>
          {(category) => (
            <li>
              <AppPageNavigationLink href={category.id}>
                {category.label}
              </AppPageNavigationLink>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
}

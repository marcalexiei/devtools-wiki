import { A } from '@solidjs/router';
import type { JSX, ParentProps } from 'solid-js';
import { For } from 'solid-js';

import { useAppContext } from './AppContext.tsx';

interface AppPageNavigationLinkProps extends ParentProps {
  href: string;
}

function AppPageNavigationLink(props: AppPageNavigationLinkProps): JSX.Element {
  return (
    <A href={props.href} activeClass="fw-bold">
      {props.children}
    </A>
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
          <AppPageNavigationLink href="/home">Home</AppPageNavigationLink>
        </li>
        <For each={appContextData.categories}>
          {(category) => (
            <li>
              <AppPageNavigationLink href={`/category/${category.id}`}>
                {category.label}
              </AppPageNavigationLink>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
}

import { For, type JSX } from 'solid-js';
import { useAppContext } from './AppContextProvider';

export function AppPageNavigation(): JSX.Element {
  const asd = useAppContext();
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <For each={asd.categories}>
          {(category) => (
            <li>
              <a href={category.id}>{category.label}</a>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
}

import {
  createContext,
  createEffect,
  createSignal,
  onMount,
  onCleanup,
  useContext,
} from 'solid-js';
import type { Setter, JSX, Accessor } from 'solid-js';

export type ThemeValue = 'system' | 'light' | 'dark';

interface ThemeContextData {
  themeValue: Accessor<ThemeValue>;
  setThemeValue: Setter<ThemeValue>;
}

const ThemeContext = createContext<ThemeContextData>();

interface ThemeContextProviderProps {
  children: JSX.Element;
}

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const themeLocalStorage = localStorage.getItem('theme') as
    | ThemeValue
    | undefined;

  const [themeValue, setThemeValue] = createSignal<ThemeValue>(
    ['dark', 'light', 'system'].includes(themeLocalStorage as ThemeValue)
      ? (themeLocalStorage as ThemeValue)
      : 'system',
  );

  createEffect(() => {
    const _themeValue = themeValue();

    switch (_themeValue) {
      case 'dark':
      case 'light':
        document.head.parentElement?.setAttribute('data-theme', _themeValue);
        break;

      default: {
        const handler = (event: { matches: boolean }) => {
          const value: ThemeValue = event.matches ? 'dark' : 'light';
          document.head.parentElement?.setAttribute('data-theme', value);
        };

        const mediaQueryResult = window.matchMedia(
          '(prefers-color-scheme: dark)',
        );

        handler(mediaQueryResult);

        mediaQueryResult.addEventListener('change', handler);

        onCleanup(() => {
          mediaQueryResult.removeEventListener('change', handler);
        });
      }
    }

    localStorage.setItem('theme', _themeValue);
  });

  let activeAnimationTimeout: number | undefined;

  onMount(() => {
    /** Enable animation after some time from the component load to avoid flash */
    activeAnimationTimeout = window.setTimeout(() => {
      document.body.classList.add('theme-change-animation-active');
    }, 300);
  });

  onCleanup(() => {
    document.head.parentElement?.removeAttribute('data-theme');
    window.clearTimeout(activeAnimationTimeout);
  });

  return (
    <ThemeContext.Provider value={{ themeValue, setThemeValue }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const value = useContext(ThemeContext);
  if (value === undefined) {
    throw new Error(
      'useThemeContext must be used within a ThemeContextProvider',
    );
  }
  return value;
}

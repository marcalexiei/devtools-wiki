import type { JSX } from 'solid-js';
import { For } from 'solid-js';
import {
  type ThemeValue,
  useThemeContext,
} from '../../../Theme/ThemeContext.tsx';
import { UISwitchItem, UISwitchRoot } from '../../../UISwitch/UISwitch.tsx';
import { AppHeaderThemeSwitchIcon } from './AppHeaderThemeSwitchIcon.tsx';

const THEME_VALUES: Array<ThemeValue> = ['dark', 'system', 'light'];

export function AppHeaderThemeSwitch(): JSX.Element {
  const { themeValue, setThemeValue } = useThemeContext();

  const handleChange: JSX.ChangeEventHandler<HTMLInputElement, Event> = (
    event,
  ) => {
    setThemeValue(event.target.value as ThemeValue);
  };

  return (
    <UISwitchRoot>
      <For each={THEME_VALUES}>
        {(item) => (
          <UISwitchItem
            name="theme-selection"
            value={item}
            checked={themeValue() === item}
            onChange={handleChange}
          >
            <AppHeaderThemeSwitchIcon themeValue={item} />
          </UISwitchItem>
        )}
      </For>
    </UISwitchRoot>
  );
}

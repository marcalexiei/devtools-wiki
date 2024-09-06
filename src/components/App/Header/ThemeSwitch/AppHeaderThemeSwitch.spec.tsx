import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it, vitest } from 'vitest';
import { AppHeaderThemeSwitch } from './AppHeaderThemeSwitch';
import {
  ThemeContextProvider,
  type ThemeValue,
  type useThemeContext,
} from '../../../Theme/ThemeContext';

const mocks = vitest.hoisted(() => {
  let testThemeValue: ThemeValue = 'system';
  return {
    themeValue: vitest.fn().mockImplementation(() => testThemeValue),
    setThemeValue: vitest.fn().mockImplementation((v: ThemeValue) => {
      testThemeValue = v;
    }),
  };
});

vitest.mock('../../../Theme/ThemeContext', async (importOriginal) => {
  const actual = await importOriginal<{
    // biome-ignore lint/style/useNamingConvention: mocking
    ThemeContextProvider: typeof ThemeContextProvider;
    useThemeContext: typeof useThemeContext;
  }>();

  return {
    ...actual,
    useThemeContext: () => ({
      themeValue: mocks.themeValue,
      setThemeValue: mocks.setThemeValue,
    }),
  };
});

describe('<AppHeaderThemeSwitch />', () => {
  it('check `system` checkbox by default', () => {
    render(() => <AppHeaderThemeSwitch />, { wrapper: ThemeContextProvider });

    screen.getByRole('radio', { name: 'System theme', checked: true });
    screen.getByRole('radio', { name: 'Dark theme', checked: false });
    screen.getByRole('radio', { name: 'Light theme', checked: false });
  });

  it('should change `value` when pressing a new checkbox', () => {
    render(() => <AppHeaderThemeSwitch />, { wrapper: ThemeContextProvider });

    expect(mocks.setThemeValue).not.toHaveBeenCalledOnce();

    fireEvent.click(
      screen.getByRole('radio', { name: 'Light theme', checked: false }),
    );

    expect(mocks.setThemeValue).toHaveBeenCalledOnce();

    screen.getByRole('radio', { name: 'System theme', checked: false });
    screen.getByRole('radio', { name: 'Dark theme', checked: false });
    screen.getByRole('radio', { name: 'Light theme', checked: true });
  });
});

import { render, renderHook } from '@solidjs/testing-library';
import { describe, expect, it, vitest, afterEach } from 'vitest';
import { ThemeContextProvider, useThemeContext } from './ThemeContext';

describe('ThemeContext', () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe('defaults', () => {
    it('should have "themeValue" set to "system" by default', () => {
      const { result } = renderHook(useThemeContext, {
        wrapper: ThemeContextProvider,
      });

      expect(result.themeValue()).toBe('system');
      expect(document.head.parentElement?.getAttribute('data-theme')).toBe(
        'light',
      );
    });

    it('should have "themeValue" set to "dark" if is present in localStorage by default', () => {
      vitest
        .spyOn(localStorage, 'getItem')
        .mockImplementationOnce(() => 'dark');

      const { result } = renderHook(useThemeContext, {
        wrapper: ThemeContextProvider,
      });

      expect(result.themeValue()).toBe('dark');
      expect(document.head.parentElement?.getAttribute('data-theme')).toBe(
        'dark',
      );
    });

    it('should have "themeValue" set to "system" if is present in localStorage by default', () => {
      vitest
        .spyOn(localStorage, 'getItem')
        .mockImplementationOnce(() => 'invalid');

      const { result } = renderHook(useThemeContext, {
        wrapper: ThemeContextProvider,
      });

      expect(result.themeValue()).toBe('system');
      expect(document.head.parentElement?.getAttribute('data-theme')).toBe(
        'light',
      );
    });
  });

  it('should update the value after invoking `setThemeValue`', () => {
    const { result } = renderHook(useThemeContext, {
      wrapper: ThemeContextProvider,
    });

    result.setThemeValue('dark');

    expect(result.themeValue()).toBe('dark');
    expect(document.head.parentElement?.getAttribute('data-theme')).toBe(
      'dark',
    );
  });

  describe('media query prefer-color-schema', () => {
    type MediaQueryChangeHandler = (event: { matches: boolean }) => void;
    let mediaQueryChangeHandler: MediaQueryChangeHandler = () => undefined;

    const removeEventListenerSpy = vitest.fn().mockImplementation(() => {
      mediaQueryChangeHandler = () => undefined;
    });
    vitest.spyOn(window, 'matchMedia').mockImplementation(
      (_mediaQuery: string) =>
        ({
          matches: false,
          addEventListener: (
            _eventName: string,
            handler: MediaQueryChangeHandler,
          ) => {
            mediaQueryChangeHandler = handler;
          },
          removeEventListener: removeEventListenerSpy,
        }) as unknown as MediaQueryList,
    );

    afterEach(() => {
      vitest.clearAllMocks();
    });

    it('should update the value is `system` and media query prefer-color-schema change', () => {
      const { result } = renderHook(useThemeContext, {
        wrapper: ThemeContextProvider,
      });

      const htmlNode = document.head.parentElement as HTMLElement;

      mediaQueryChangeHandler({ matches: true });

      expect(result.themeValue()).toBe('system');
      expect(htmlNode.getAttribute('data-theme')).toBe('dark');

      mediaQueryChangeHandler({ matches: false });

      expect(result.themeValue()).toBe('system');
      expect(htmlNode.getAttribute('data-theme')).toBe('light');
    });

    it('should not update when value is `dark` and media query prefer-color-schema change', () => {
      const { result } = renderHook(useThemeContext, {
        wrapper: ThemeContextProvider,
      });

      result.setThemeValue('light');

      const htmlNode = document.head.parentElement as HTMLElement;

      mediaQueryChangeHandler({ matches: true });

      expect(result.themeValue()).toBe('light');
      expect(htmlNode.getAttribute('data-theme')).toBe('light');

      mediaQueryChangeHandler({ matches: false });

      expect(result.themeValue()).toBe('light');
      expect(htmlNode.getAttribute('data-theme')).toBe('light');
    });

    it('should call cleanup when changing from `system` to `dark`, but not when changing from `dark` to `light`', () => {
      const { result } = renderHook(useThemeContext, {
        wrapper: ThemeContextProvider,
      });

      expect(removeEventListenerSpy).not.toHaveBeenCalled();

      result.setThemeValue('dark');

      expect(removeEventListenerSpy).toHaveBeenCalledOnce();

      result.setThemeValue('light');

      expect(removeEventListenerSpy).toHaveBeenCalledOnce();
    });
  });

  it('should remove attribute on unmount', () => {
    const { unmount } = render(() => (
      <ThemeContextProvider>Theme</ThemeContextProvider>
    ));

    const htmlNode = document.head.parentElement as HTMLElement;

    expect(htmlNode.getAttribute('data-theme')).toBe('light');

    unmount();

    expect(htmlNode.getAttribute('data-theme')).toBeNull();
  });
});

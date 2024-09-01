import { describe, expect, it, vitest, afterEach } from 'vitest';
import { render, screen } from '@solidjs/testing-library';
import { createMemoryHistory, MemoryRouter, Route } from '@solidjs/router';
import { Outgoing } from './Outgoing';
import { AppPage404 } from '../../components/App/AppPage404';
import { ThemeContextProvider } from '../../components/Theme/ThemeContext';

vitest.mock('../../components/App/AppPage404', () => ({
  // biome-ignore lint/style/useNamingConvention: mocking component name
  AppPage404: vitest.fn(),
}));

describe('<Outgoing />', () => {
  afterEach(() => {
    vitest.resetAllMocks();
  });

  it('go to 404 if no page is provided', () => {
    const history = createMemoryHistory();

    render(() => (
      <MemoryRouter history={history}>
        <Route component={Outgoing} />
      </MemoryRouter>
    ));

    expect(AppPage404).toHaveBeenCalled();

    expect(
      screen.queryByRole('heading', {
        level: 1,
        name: 'You are leaving the site',
      }),
    ).toBeFalsy();
  });

  it('go to 404 if url is not valid', () => {
    const history = createMemoryHistory();

    const invalidURL = 'gnegne/asd';

    history.set({ value: `/?url=${encodeURIComponent(invalidURL)}` });

    render(() => (
      <MemoryRouter history={history}>
        <Route component={Outgoing} />
      </MemoryRouter>
    ));

    expect(AppPage404).toHaveBeenCalled();

    expect(
      screen.queryByRole('heading', {
        level: 1,
        name: 'You are leaving the site',
      }),
    ).toBeFalsy();
  });

  it('render things if url is valid', () => {
    const history = createMemoryHistory();

    const outgoingURL = 'https://asd.com/';

    history.set({ value: `/?url=${encodeURIComponent(outgoingURL)}` });

    render(() => (
      <ThemeContextProvider>
        <MemoryRouter history={history}>
          <Route path={'*'} component={Outgoing} />
        </MemoryRouter>
      </ThemeContextProvider>
    ));

    expect(AppPage404).not.toHaveBeenCalled();

    screen.getByRole('heading', { level: 1, name: 'You are leaving the site' });
    screen.getByRole('link', { name: 'Back to home' });

    const continueToExternalLink = screen.getByRole('link', {
      name: 'Continue to the external site',
    });
    expect(continueToExternalLink.getAttribute('href')).toStrictEqual(
      outgoingURL,
    );
  });
});

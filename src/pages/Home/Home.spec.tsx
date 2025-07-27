import { createMemoryHistory, MemoryRouter, Route } from '@solidjs/router';
import { render, screen } from '@solidjs/testing-library';
import type { JSX, ParentProps } from 'solid-js';
import { describe, expect, it } from 'vitest';
import { AppContextProvider } from '../../components/App/AppContext.tsx';
import { ThemeContextProvider } from '../../components/Theme/ThemeContext.tsx';
import { Home } from './Home.tsx';

describe('<Home />', () => {
  function Wrapper(props: ParentProps): JSX.Element {
    const history = createMemoryHistory();

    return (
      <AppContextProvider categories={[]}>
        <ThemeContextProvider>
          <MemoryRouter history={history}>
            <Route path={'*'} component={() => props.children} />
          </MemoryRouter>
        </ThemeContextProvider>
      </AppContextProvider>
    );
  }

  it('should display all content', () => {
    render(() => <Home />, { wrapper: Wrapper });

    screen.getByRole('heading', { level: 1, name: 'Home' });

    const profileLink = screen.getByRole('link', { name: 'GitHub profile' });
    expect(profileLink).toHaveAttribute(
      'href',
      '/outgoing?url=https%3A%2F%2Fgithub.com%2Fmarcalexiei',
    );
  });
});

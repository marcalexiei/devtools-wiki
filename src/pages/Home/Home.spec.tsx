import { describe, it, expect } from 'vitest';
import { render, screen } from '@solidjs/testing-library';
import type { JSX, ParentProps } from 'solid-js';
import { createMemoryHistory, MemoryRouter, Route } from '@solidjs/router';
import { Home } from './Home';
import { AppContextProvider } from '../../components/App/AppContextProvider';

describe('<Home />', () => {
  function Wrapper(props: ParentProps): JSX.Element {
    const history = createMemoryHistory();

    return (
      <AppContextProvider categories={[]}>
        <MemoryRouter history={history}>
          <Route path={'*'} component={() => props.children} />
        </MemoryRouter>
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

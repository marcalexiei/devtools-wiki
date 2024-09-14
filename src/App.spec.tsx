import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@solidjs/testing-library';
import { App } from './App';
import type { ParentProps } from 'solid-js';
import { QueryClientProvider } from '@tanstack/solid-query';
import { AppQueryClient } from './AppQueryClient';

describe('<App />', () => {
  function Wrapper(props: ParentProps) {
    return (
      <QueryClientProvider client={AppQueryClient}>
        {props.children}
      </QueryClientProvider>
    );
  }

  it('should render loading', () => {
    render(() => <App>Should not appear</App>, { wrapper: Wrapper });

    screen.getByText('Loading...');
    expect(screen.queryByText('Should not appear')).toBeFalsy();
  });

  it('should render children when category is loaded successfully ', async () => {
    render(() => <App>Loaded</App>, { wrapper: Wrapper });

    await waitFor(() => expect(screen.queryByText('Loading...')).toBeFalsy());

    screen.getByText('Loaded');
  });
});

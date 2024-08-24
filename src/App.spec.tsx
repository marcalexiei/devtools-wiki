import { QueryClientProvider } from '@tanstack/solid-query';
import type { JSX, ParentProps } from 'solid-js';
import { describe, expect, it } from 'vitest';
import { APP_QUERY_CLIENT } from './queryClient';
import { App } from './App';
import { render, screen, waitFor } from '@solidjs/testing-library';

describe('<App />', () => {
  function Wrapper(props: ParentProps): JSX.Element {
    return (
      <QueryClientProvider client={APP_QUERY_CLIENT}>
        {props.children}
      </QueryClientProvider>
    );
  }

  it('works', async () => {
    render(() => <App />, { wrapper: Wrapper });

    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());

    screen.debug();
  });
});

import { A } from '@solidjs/router';
import type { JSX, ParentProps } from 'solid-js';

interface LinkExternalProps extends ParentProps {
  url: string;
}

export function LinkExternal(props: LinkExternalProps): JSX.Element {
  return (
    <A href={`/outgoing?url=${encodeURIComponent(props.url)}`}>
      {props.children}
    </A>
  );
}

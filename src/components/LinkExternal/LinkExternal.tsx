import type { JSX, ParentProps } from 'solid-js';

interface LinkExternalProps extends ParentProps {
  url: string;
}

export function LinkExternal(props: LinkExternalProps): JSX.Element {
  return (
    <a href={`/outgoing?url=${encodeURIComponent(props.url)}`}>
      {props.children}
    </a>
  );
}

import { createMemo, type JSX } from 'solid-js';
import { useSearchParams } from '@solidjs/router';
import { AppPage, AppPageTitle } from '../../components/App/AppPage';
import { AppPage404 } from '../../components/App/AppPage404';

export function Outgoing(): JSX.Element {
  const [searchParams] = useSearchParams<{ url: string }>();

  const urlInfo = createMemo((): URL | 'invalid' | 'empty' => {
    if (!searchParams.url) {
      return 'empty';
    }

    let parsedURL: URL;
    try {
      parsedURL = new URL(searchParams.url);
    } catch {
      return 'invalid';
    }

    if (['http', 'https'].some((it) => parsedURL.protocol.startsWith(it))) {
      return parsedURL;
    }

    return 'invalid';
  });

  if (urlInfo() === 'empty' || urlInfo() === 'invalid') {
    return <AppPage404 />;
  }

  const _urlInfo = urlInfo() as URL;

  return (
    <AppPage>
      <AppPageTitle>You are leaving the site</AppPageTitle>

      <p>{_urlInfo.href}</p>

      <hr />

      <dl>
        <dt>Domain</dt>
        <dd>{_urlInfo.host}</dd>

        <dt>Path</dt>
        <dd>{_urlInfo.pathname}</dd>
      </dl>

      <hr />

      <a href={_urlInfo.href} target="_blank" rel="noreferrer noopener">
        Go to external site
      </a>
    </AppPage>
  );
}

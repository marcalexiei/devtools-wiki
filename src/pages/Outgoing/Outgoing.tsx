import { A, useSearchParams } from '@solidjs/router';
import type { JSX } from 'solid-js';
import { createMemo } from 'solid-js';
import { AppPageTitle } from '../../components/App/AppPage.tsx';
import { AppPage404 } from '../../components/App/AppPage404.tsx';
import { AppHeader } from '../../components/App/Header/AppHeader.tsx';
import { UIPageLayout } from '../../components/UIPage/UIPageLayout.tsx';

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
    <UIPageLayout
      header={<AppHeader />}
      content={
        <>
          <AppPageTitle>You are leaving the site</AppPageTitle>

          <div>
            Your destination is:
            <br />
            <code style={{ 'word-break': 'break-word' }}>{_urlInfo.href}</code>
          </div>

          <hr />

          <dl>
            <dt>Domain</dt>
            <dd>{_urlInfo.host}</dd>

            <dt>Path</dt>
            <dd>{_urlInfo.pathname}</dd>
          </dl>

          <hr />

          <nav style={{ display: 'flex', gap: '.5rem' }}>
            <a href={_urlInfo.href} target="_blank" rel="noreferrer noopener">
              Continue to the external site
            </a>

            <A href="/">Back to home</A>
          </nav>
        </>
      }
    />
  );
}

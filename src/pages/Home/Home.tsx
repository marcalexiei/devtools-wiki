import type { JSX } from 'solid-js';
import { AppPage, AppPageTitle } from '../../components/App/AppPage';
import { LinkExternal } from '../../components/LinkExternal/LinkExternal';

export function Home(): JSX.Element {
  return (
    <AppPage>
      <AppPageTitle>Home</AppPageTitle>

      <p>
        List to keep track of development tools in a more funny way than having
        text notes.
      </p>

      <p>
        {'You can find more info about me on my '}
        <LinkExternal url="https://github.com/marcalexiei">
          GitHub profile
        </LinkExternal>
      </p>

      <p>
        I could write more about myself but I know that no one will look at this
        site expect me
      </p>

      <p>
        "You are so pessimistic" someone might say... but I'm tired and I just
        want to have some content here...
      </p>

      <p>Still here? I'm impressed</p>

      <p>
        You must be an <i>onanist</i> or a <i>masochist</i>...
      </p>

      <p>If your are a onanist you will have a good company here...</p>
    </AppPage>
  );
}

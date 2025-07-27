import type { JSX } from 'solid-js';
import { For } from 'solid-js';
import { LinkExternal } from '../../components/LinkExternal/LinkExternal.tsx';
import type { DevToolArticle } from '../../models/DevToolArticle.ts';

interface CategoryArticlesProps {
  article: DevToolArticle;
}

export function CategoryArticlesArticle(
  props: CategoryArticlesProps,
): JSX.Element {
  const { article } = props;

  return (
    <>
      <h2>{article.title}</h2>

      {typeof article.description === 'string' && <p>{article.description}</p>}

      {Array.isArray(article.description) && (
        <div style={{ 'margin-bottom': '1rem' }}>
          <For each={article.description as Array<string>}>
            {(it) => (
              <p style={{ 'margin-top': 0, 'margin-bottom': 0 }}>{it}</p>
            )}
          </For>
        </div>
      )}

      <LinkExternal url={article.url}>More info</LinkExternal>
    </>
  );
}

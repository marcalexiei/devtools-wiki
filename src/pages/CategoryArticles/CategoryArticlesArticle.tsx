import type { JSX } from 'solid-js';
import type { DevToolArticle } from '../../models/DevToolArticle';

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
      {article.description && <p>{article.description}</p>}
      <hr />
      <a href={article.url}>More info</a>
    </>
  );
}

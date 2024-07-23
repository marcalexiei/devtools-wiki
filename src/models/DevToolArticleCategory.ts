import { z } from 'zod';

export const DEV_TOOL_ARTICLE_CATEGORY_SCHEMA = z.object({
  id: z.string(),
  label: z.string(),
});

export type DevToolArticleCategory = z.infer<
  typeof DEV_TOOL_ARTICLE_CATEGORY_SCHEMA
>;

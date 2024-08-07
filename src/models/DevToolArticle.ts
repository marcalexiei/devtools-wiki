import { z } from 'zod';

export const DEV_TOOL_ARTICLE_SCHEMA = z.strictObject({
  title: z.string(),
  url: z.string().url(),
  description: z.string().optional(),
});

export type DevToolArticle = z.infer<typeof DEV_TOOL_ARTICLE_SCHEMA>;

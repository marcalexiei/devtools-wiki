import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { DEV_TOOL_ARTICLE_SCHEMA } from '../../models/DevToolArticle';
import funJSON from './fun.json';

describe('data - categories - fun', () => {
  it('should follow schema', () => {
    const schema = z.object({
      articles: z.array(DEV_TOOL_ARTICLE_SCHEMA),
    });

    const result = schema.safeParse(funJSON);

    expect(result.success).toBe(true);
  });
});

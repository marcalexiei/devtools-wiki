import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { DEV_TOOL_ARTICLE_CATEGORY_SCHEMA } from '../models/DevToolArticleCategory';
import categoriesData from './categories.json';

describe('data - categories', () => {
  it('should follow schema', () => {
    const schema = z.object({
      categories: z.array(DEV_TOOL_ARTICLE_CATEGORY_SCHEMA),
    });

    const result = schema.safeParse(categoriesData);

    expect(result.success).toBe(true);
  });

  it.for(categoriesData.categories)(
    'category $id (label: $label) should have his `json` inside `src/data/categories` folder',
    ({ id }) => {
      expect(existsSync(`./src/data/categories/${id}.json`)).toBe(true);
    },
  );
});

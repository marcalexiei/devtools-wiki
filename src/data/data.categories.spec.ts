import { describe, expect, it } from 'vitest';
import { z } from 'zod';
// biome-ignore lint/correctness/noNodejsModules: required for test
import { existsSync } from 'node:fs';

import categoriesData from './categories.json';
import { DEV_TOOL_ARTICLE_CATEGORY_SCHEMA } from '../models/DevToolArticleCategory';

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

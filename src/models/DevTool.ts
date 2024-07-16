import { z } from 'zod';

export const DEV_TOOL_SCHEMA = z.object({
  name: z.string(),
});

export type DevTool = z.infer<typeof DEV_TOOL_SCHEMA>;

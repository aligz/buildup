import { z } from 'zod';

export const formPageSchema = z.object({
	name: z.string(),
	description: z.string()
});

export type FormPageSchema = typeof formPageSchema;

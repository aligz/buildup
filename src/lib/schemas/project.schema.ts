import { z } from 'zod';

export const formProjectSchema = z.object({
	name: z.string(),
	description: z.string()
});

export type FormProjectSchema = typeof formProjectSchema;

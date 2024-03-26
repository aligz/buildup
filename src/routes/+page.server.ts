import type { PageServerLoad } from './$types';
import { getProjects, createProject } from '$lib/server/queries/project.query';
import { superValidate } from 'sveltekit-superforms';
import { formProjectSchema } from '$lib/schemas/proejct.schema';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load: PageServerLoad = async () => {
	const projects = await getProjects();
	// const projects: string[] = [];

	return {
		projects: projects,
		form: await superValidate(zod(formProjectSchema))
	};
};

export const actions = {
	create_project: async ({ request }) => {
		const form = await superValidate(request, zod(formProjectSchema));

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		await createProject({
			name: form.data.name,
			description: form.data.description
		});

		// Display a success status message
		return message(form, 'Form posted successfully!');
	}
} satisfies Actions;

import type { PageServerLoad } from './$types';
import { error, fail } from '@sveltejs/kit';
import { getProject } from '$lib/server/queries/project.query';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formPageSchema } from '$lib/schemas/page.schema';
import type { Actions } from '../../../../.svelte-kit/types/src/routes/$types';
import { createPage } from '$lib/server/queries/page.query';

export const load = (async ({ params }) => {
	const project = await getProject(params.id);
	console.log(project);
	if (!project) {
		error(404, {
			message: 'Project not found'
		});
	}
	return {
		project: project.at(0),
		form: await superValidate(zod(formPageSchema))
	};
}) satisfies PageServerLoad;

export const actions = {
	create_page: async ({ request, params }) => {
		const form = await superValidate(request, zod(formPageSchema));

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		await createPage(params.id, {
			name: form.data.name,
			description: form.data.description
		});

		// Display a success status message
		return message(form, 'Form posted successfully!');
	}
} satisfies Actions;

import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load = (async () => {
	await db.let('page', {id: 'page:hgimdf45pshgcbsrm4gn'});
	await db.let('project', {id: 'project:g44kvyq9l43xcoixat4x'});
	const query = await db.query('RELATE $project->pages->$page')
	console.log(query)
	return {

	}
}) satisfies PageServerLoad;
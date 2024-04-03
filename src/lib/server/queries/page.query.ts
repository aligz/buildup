import { db } from '$lib/server/database';

export const createPage = async (projectId: number, data: Record<string, unknown>) => {
	const [page] = await db.create('page', data);
	await db.query('RELATE $project->pages->$page', {
		project: {
			id: projectId
		},
		page: {
			id: page.id
		}
	});
	return page;
};

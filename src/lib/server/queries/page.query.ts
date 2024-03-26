import { db } from '$lib/server/database';

export const getPages = async (projectId: number) => {
	await db.let('project', {
		id: projectId
	});
	return await db.query('SELECT * FROM pages');
};

export const createPage = async (projectId: number, data: Record<string, unknown>) => {
	const [page] = await db.create('page', data);
	await db.let('project', {
		id: projectId
	});
	await db.let('page', {
		id: page.id
	});
	await db.query('RELATE $project->pages->$page');
	return page;
};

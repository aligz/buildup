import { db } from '$lib/server/database';

export const getProjects = async () => {
	return await db.select('project');
};

export const getProject = async (id: string) => {
	await db.let('id', id);
	const result = await db.query('SELECT *, ->pages->page.* as pages FROM $id');
	return result[0];
};

export const createProject = async (data: Record<string, unknown>) => {
	return await db.create('project', data);
};

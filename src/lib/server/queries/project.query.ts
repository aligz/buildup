import { db } from '$lib/server/database';

export const getProjects = async () => {
	return await db.select('project');
};

export const createProject = async (data: Record<string, unknown>) => {
	return await db.create('project', data);
};

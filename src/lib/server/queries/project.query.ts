import DB from '$lib/server/database';

export const getProjects = async () => {
	return await DB.select('project');
};

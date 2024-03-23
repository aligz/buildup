import { Surreal } from 'surrealdb.js';
import {
	DATABASE_URL,
	DATABASE_PASSWORD,
	DATABASE_USERNAME,
	DATABASE_NAMESPACE,
	DATABASE_NAME
} from '$env/static/private';

const db = new Surreal();

async function main() {
	try {
		// Connect to the database
		await db.connect(DATABASE_URL, {
			// Set the namespace and database for the connection
			namespace: DATABASE_NAMESPACE,
			database: DATABASE_NAME,

			// Set the authentication details for the connection
			auth: {
				namespace: DATABASE_NAMESPACE,
				database: DATABASE_NAME,
				username: DATABASE_USERNAME,
				password: DATABASE_PASSWORD
			}
		});
	} catch (e) {
		console.error('ERROR', e);
	}
}

main();

export default db;

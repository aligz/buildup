import { Surreal } from 'surrealdb.node';
import {
	DATABASE_URL,
	DATABASE_PASSWORD,
	DATABASE_USERNAME,
	DATABASE_NAMESPACE,
	DATABASE_NAME
} from '$env/static/private';

// const db = new Surreal();

// async function main() {
// 	try {
// 		// Connect to the database
// 		await db.connect(DATABASE_URL, {
// 			// Set the namespace and database for the connection
// 			namespace: DATABASE_NAMESPACE,
// 			database: DATABASE_NAME,

// 			// Set the authentication details for the connection
// 			auth: {
// 				namespace: DATABASE_NAMESPACE,
// 				database: DATABASE_NAME,
// 				username: DATABASE_USERNAME,
// 				password: DATABASE_PASSWORD
// 			}
// 		});
// 	} catch (e) {
// 		console.error('ERROR', e);
// 	}
// }

// main();

// export default db;

const MAX_RETRIES = 5;
const RETRY_TIMEOUT = 2000; // 2 seconds
const DB_URL = DATABASE_URL;
let _db: Surreal;

const database = {
	get instance() {
		if (!_db) {
			let retries = 1;

			const tryConnect = async () => {
				try {
					if (retries > 1) {
						console.log(`Database connection retry, attempt number ${retries} of ${MAX_RETRIES}`);
					}
					_db = new Surreal();

					if (!DB_URL) return null;

					await _db.connect('ws://127.0.0.1:8000');

					// Signin as a namespace, database, or root user
					await _db.signin({
						username: 'root',
						password: 'root'
					});

					// Select a specific namespace / database
					await _db.use({ ns: 'projects', db: 'buildup' });
				} catch (error) {
					if (retries < MAX_RETRIES) {
						retries++;
						setTimeout(tryConnect, RETRY_TIMEOUT);
					} else {
						console.log('Database connection failed.');
						throw error;
					}
				}
			};

			tryConnect();
		}
		return _db;
	}
};

export const db = database.instance;

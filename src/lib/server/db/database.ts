import mongoose from 'mongoose';
import config from '$lib/server/config';

let authPart = '';
if (config.database.username && config.database.password) {
	authPart = `${config.database.username}:${config.database.password}@`;
}

const dbURL = `mongodb://${authPart}${config.database.hostname}:${config.database.port}/${config.database.name}`;
const dbURLCensored = `mongodb://***:***@${config.database.hostname}:${config.database.port}/${config.database.name}`;

let conn;
try {
	conn = await mongoose.connect(dbURL);
} catch (err) {
	console.error(`Failed to connect to MongoDB: ${dbURLCensored}`);
	console.error(err);
	// throw err;
}

export default conn;

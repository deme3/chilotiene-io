import crypto from 'crypto';
import fs from 'fs/promises';
/** @type {typeof import('./src/lib/server/config.example').default} */
const ConfigExample = {};

ConfigExample.database = {};
ConfigExample.database.hostname = process.env.MONGO_HOST ?? 'mongo';
ConfigExample.database.port = parseInt(process.env.MONGO_PORT ?? '27017');
ConfigExample.database.name = process.env.MONGO_DB ?? 'chilotiene?authSource=admin';
ConfigExample.database.username = process.env.MONGO_USER ?? 'chilotiene';
ConfigExample.database.password = process.env.MONGO_PASS ?? 'chilotiene';
ConfigExample.mail.api_key = process.env.MAIL_API_KEY ?? 're-resend-api-key';

console.log('Writing configuration to src/lib/db/config.ts...');
const configFile = `export default ${JSON.stringify(ConfigExample, null, 2)};\n`;
await fs.writeFile('./src/lib/server/config.ts', configFile);

const jwtSecret =
	(process.env.JWT_SECRET
		? process.env.JWT_SECRET.length > 0
			? process.env.JWT_SECRET
			: undefined
		: undefined) ?? crypto.randomBytes(32).toString('hex');

const envFileName =
	(process.argv[2] ? (process.argv[2].length > 0 ? process.argv[2] : undefined) : undefined) ??
	'production';

const uploadLimit = 1024 * 1024 * 1024 * 4; // 4GB

console.log('Writing environment variables to .env...');
const env = `JWT_SECRET=${jwtSecret}
MONGO_HOST=${ConfigExample.database.hostname}
BODY_SIZE_LIMIT=${uploadLimit}\n`;
await fs.writeFile(`.env.${envFileName}`, env);

console.log('Database & app configuration completed successfully.');

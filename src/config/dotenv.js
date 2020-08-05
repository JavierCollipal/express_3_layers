const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

export const port = process.env.PORT;
export const redisPort = process.env.REDIS_PORT;
export const databaseHost = process.env.DATABASE_HOST;
export const databaseUser = process.env.DATABASE_USER;
export const databasePassword = process.env.DATABASE_PASSWORD;
export const databaseName = process.env.DATABASE_NAME;

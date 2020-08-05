import { redisPort } from './dotenv';

const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient(redisPort);
const getAsync = promisify(client.get).bind(client);

client.getAsync = getAsync;

export default client;

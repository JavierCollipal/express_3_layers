import express from 'express';
import expressConfig from './config/express';
import routerConfig from './routes';
const app = express();
//express server config
expressConfig(app, express);
//router config
routerConfig(app);

module.exports = app;

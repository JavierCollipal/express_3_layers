import { port } from './config/dotenv';

const app = require('./app');

app.listen(port, function () {
	console.log(`server listening in port ${port}`);
});

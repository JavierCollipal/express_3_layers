import userRouter from './user.router';

const apiVersion = '/api/v1';

export default function routerConfig(app) {
	app.use(apiVersion, userRouter);
}

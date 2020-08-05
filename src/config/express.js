export default function expressConfig(app, express) {
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
}

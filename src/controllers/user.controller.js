//si nuestro servicio falla podemos hacer uso del catch y enviar esta respuesta de error
const errorResponse = (e, res) => res.status(400).json({ message: e.message });
//ojo que en ciertos casos el servicio igual puede notificar una regla de negocio
// ej: este correo ya existe cuando estamos trabajando con autentificación = throw { status: 409, message: este correo ya existe}
//entonces podemos usar otra funcion mas generica para comunicar esto, ej : errorResponse = (e,res) => res.status(e.status).json({message: e.message});
export default class UserController {
	constructor(userService) {
		this.userService = userService;
	}

	async getOne(req, res) {
		const { userId } = req.params;
		try {
			const user = await this.userService.getOne(userId);
			if (!user) return res.sendStatus(404);
			return res.status(200).json({ user });
		} catch (e) {
			errorResponse(e, res);
		}
	}
	async getAll(req, res) {
		try {
			const users = await this.userService.getAll();
			return res.status(200).json({ users });
		} catch (e) {
			errorResponse(e, res);
		}
	}
	async createOne(req, res) {
		try {
			const newUser = req.body;
			const user = await this.userService.createOne(newUser);
			return res.status(201).json({ user });
		} catch (e) {
			errorResponse(e, res);
		}
	}
	async updateOne(req, res) {
		try {
			const { userId } = req.params;
			const newData = req.body;
			const user = await this.userService.updateOne(userId, newData);
			if (!user) return res.sendStatus(404);
			return res.status(201).json({ user });
		} catch (e) {
			errorResponse(e, res);
		}
	}
	async deleteOne(req, res) {
		try {
			const { userId } = req.params;
			const deleteCount = await this.userService.deleteOne(userId);
			if (!deleteCount) return res.sendStatus(404);
			return res.sendStatus(204);
		} catch (e) {
			errorResponse(e, res);
		}
	}
}

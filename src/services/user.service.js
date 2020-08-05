export default class UserService {
	constructor(userModel, cacheClient) {
		this.userModel = userModel;
		this.cacheClient = cacheClient;
	}
	async getOne(id) {
		// make a connection to the local instance of redis
		const foundUserInCache = await this.cacheClient.getAsync(id);
		if (foundUserInCache) return JSON.parse(foundUserInCache);
		const foundUserInDb = await this.userModel.findOne({
			where: {
				id: id,
			},
		});
		if (foundUserInDb) {
			this.cacheClient.set(foundUserInDb.id, JSON.stringify(foundUserInDb), 'EX', 240);
		}
		return foundUserInDb;
	}
	async getAll() {
		return await this.userModel.findAll({});
	}
	async createOne(newUser) {
		return await this.userModel.create({ ...newUser });
	}
	async updateOne(id, data) {
		const foundUser = await this.userModel.findOne({
			where: {
				id: id,
			},
		});
		if (!foundUser) return false;
		await foundUser.update({ ...data });
		this.cacheClient.set(foundUser.id, JSON.stringify(foundUser), 'EX', 240);
		return foundUser;
	}
	async deleteOne(id) {
		this.cacheClient.del(id);
		return await this.userModel.destroy({
			where: { id: id },
		});
	}
}

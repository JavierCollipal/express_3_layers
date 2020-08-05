import UserService from '../../src/services/user.service';
import { invalidSearchId, newUser, updateData } from '../mock/user';

const mockUserModel = {
	findOne: jest.fn(),
	findAll: jest.fn(),
	create: jest.fn(),
	update: jest.fn(),
	destroy: jest.fn(),
};
const mockCacheClient = {
	getAsync: jest.fn(),
	set: jest.fn(),
	del: jest.fn(),
};

let savedUser = {};

const mockUserService = new UserService(mockUserModel, mockCacheClient);

describe('userService', () => {
	describe('getAll', () => {
		it('getAll debería devolver un arreglo con usuarios', async () => {
			mockUserModel.findAll.mockReturnValueOnce([
				{ name: 'javier', email: 'javier@javier.cl', id: 1 },
				{ name: 'marcela', email: 'marcela@marcela.cl', id: 1 },
			]);
			const users = await mockUserService.getAll();
			expect(users.length).toBeGreaterThan(0);
		});
		it('getAll debería devolver un arreglo sin datos', async () => {
			mockUserModel.findAll.mockReturnValueOnce([]);
			const users = await mockUserService.getAll();
			expect(users.length).toBe(0);
		});
	});
	describe('createOne', () => {
		it('createOne debería devolver el usuario creado', async () => {
			const newUserFromModel = { ...newUser, id: 1 };
			mockUserModel.create.mockReturnValueOnce(newUserFromModel);
			const createdUser = await mockUserService.createOne();
			savedUser = createdUser;
			expect(createdUser).toBeDefined();
			expect(createdUser.id).toBe(newUserFromModel.id);
		});
	});
	describe('getOne', () => {
		it('getOne debería devolver un usuario en base a la id de este', async () => {
			//ocupamos al usuario del post simulado
			mockUserModel.findOne.mockReturnValueOnce(savedUser);
			const foundUser = await mockUserService.getOne(savedUser.id);
			expect(foundUser).toBe(savedUser);
		});
		it('getOne debería devolver false si no encuentra al usuario con la id', async () => {
			mockUserModel.findOne.mockReturnValueOnce(false);
			const foundUser = await mockUserService.getOne(invalidSearchId);
			expect(foundUser).toBe(false);
		});
	});
	describe('updateOne', () => {
		it('updateOne debería devolver false si no encuentra al usuario con la id', async () => {
			mockUserModel.update.mockReturnValueOnce(false);
			const foundUser = await mockUserService.updateOne(invalidSearchId, updateData);
			expect(foundUser).toBe(false);
		});
		it('updateOne debería buscar y luego devolver el usuario actualizado', async () => {
			const updatedUser = { ...savedUser, ...updateData };
			//simularemos el flujo de findOne y update con este mock.
			//update es propio del modelo devuelto por findOne, para cumplir con el test debemos añadir update como propiedad.
			mockUserModel.findOne.mockReturnValueOnce({ ...updatedUser, update: jest.fn });
			mockUserModel.update.mockReturnValueOnce(updatedUser);

			const foundUser = await mockUserService.updateOne(invalidSearchId, updateData);
			expect(foundUser.age).toBe(updateData.age);
		});
	});
	describe('deleteOne', () => {
		it('deleteOne debería devolver 0 si no borro un usuario con la id', async () => {
			mockUserModel.destroy.mockReturnValueOnce(0);
			const deleteCount = await mockUserService.deleteOne(invalidSearchId);
			expect(deleteCount).toBe(0);
		});
		it('deleteOne debería devolver 1 si no borro un usuario con la id', async () => {
			mockUserModel.destroy.mockReturnValueOnce(0);
			const deleteCount = await mockUserService.deleteOne(invalidSearchId);
			expect(deleteCount).toBe(0);
		});
	});
});

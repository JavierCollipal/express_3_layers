import app from '../../src/app';
import request from 'supertest';
import { newUser, updateData } from '../mock/user';

const apiPrefix = '/api/v1';
const defaultUrl = '/users';
const defaultCompleteUrl = `${apiPrefix}/${defaultUrl}`;

//save the user after post testing, with this object you can test getOne,updateOne,deleteOne
let savedUser;

describe('GET /users', () => {
	it('deberia devolver code 200, and an array with/without data', (done) => {
		request(app)
			.get(defaultCompleteUrl)
			.then((response) => {
				const { users } = response.body;
				expect(response.statusCode).toBe(200);
				expect(users.length).toBeGreaterThanOrEqual(0);
				done();
			});
	});
});

describe('POST /users', () => {
	it('deberia devolver code 200, and the created user', (done) => {
		request(app)
			.post(defaultCompleteUrl)
			.send(newUser)
			.then((response) => {
				const { user } = response.body;
				savedUser = user;
				expect(response.statusCode).toBe(201);
				expect(user).toBeDefined();
				done();
			});
	});
});

describe('PUT /users/:userId', () => {
	it('should return code 201, and the updated user', (done) => {
		request(app)
			.put(`${defaultCompleteUrl}/${savedUser.id}`)
			.send(updateData)
			.then((response) => {
				const { user } = response.body;
				expect(response.statusCode).toBe(201);
				expect(user).toBeDefined();
				done();
			});
	});
	it('should return code 404, if the user wasnt found', (done) => {
		request(app)
			.put(`${defaultCompleteUrl}/${555555}`)
			.send(updateData)
			.then((response) => {
				expect(response.statusCode).toBe(404);
				done();
			});
	});
});

describe('GET /users/:userId', () => {
	it('should return code 200, and the found user', (done) => {
		request(app)
			.get(`${defaultCompleteUrl}/${savedUser.id}`)
			.then((response) => {
				const { user } = response.body;
				expect(response.statusCode).toBe(200);
				expect(user).toBeDefined();
				done();
			});
	});
	it('should return code 404, if nothing was found with the id', (done) => {
		request(app)
			.get(`${defaultCompleteUrl}/${savedUser.id + 60}`)
			.then((response) => {
				expect(response.statusCode).toBe(404);
				done();
			});
	});
});

describe('DELETE /users/:userId', () => {
	it('should return code 204 after user deletion', (done) => {
		request(app)
			.delete(`${defaultCompleteUrl}/${savedUser.id}`)
			.then((response) => {
				expect(response.statusCode).toBe(204);
				done();
			});
	});
	it('should return code 404, if nothing was deleted with the id', (done) => {
		request(app)
			.delete(`${defaultCompleteUrl}/${savedUser.id}`)
			.then((response) => {
				expect(response.statusCode).toBe(404);
				done();
			});
	});
});

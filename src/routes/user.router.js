import express from 'express';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';
import redisClient from '../config/redis';
const userModel = require('../models').users;
//en el router nos encargaremos de crear instancias de servicicios y controladores, para luego inyectarle sus valores deseados
//y usar al controller como handler de cada router
const userService = new UserService(userModel, redisClient);
const userController = new UserController(userService);

const userRouter = express.Router();

userRouter.get('/users', (req, res) => userController.getAll(req, res));
userRouter.post('/users', (req, res) => userController.createOne(req, res));
userRouter.get('/users/:userId', (req, res) => userController.getOne(req, res));
userRouter.put('/users/:userId', (req, res) => userController.updateOne(req, res));
userRouter.delete('/users/:userId', (req, res) => userController.deleteOne(req, res));

export default userRouter;

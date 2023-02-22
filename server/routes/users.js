import express from 'express';
import { usersController } from '../controllers/users.js';
import protect from '../middleware/authMiddleware.js';

const usersRouter = express.Router();

usersRouter.post('/', usersController.register);
usersRouter.post('/login', usersController.login);
usersRouter.get('/about', protect,  usersController.about);

export default usersRouter;

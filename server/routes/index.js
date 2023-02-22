import express from 'express';
import transactionsRouter from './transactions.js';
import usersRouter from './users.js';

const allRoutes = express.Router();

allRoutes.use('/transactions', transactionsRouter);
allRoutes.use('/users', usersRouter);

export default allRoutes;

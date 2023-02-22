import express from 'express';

import { transactionsController } from '../controllers/transactions.js';
import protect from '../middleware/authMiddleware.js';

const transactionsRouter = express.Router();

transactionsRouter
  .route('/')
  .get(protect, transactionsController.get)
  .post(protect, transactionsController.create);

transactionsRouter
  .route('/:id')
  .delete(protect, transactionsController.delete)
  .put(protect, transactionsController.update);

export default transactionsRouter;

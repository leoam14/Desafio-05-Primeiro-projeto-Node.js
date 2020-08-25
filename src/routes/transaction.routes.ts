import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    return response.json(transactionsRepository.getTransactionsPlusBallance());
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.get("/balance", (request, response) => {
    return response.json(transactionsRepository.getBalance());
});

transactionRouter.post('/', (request, response) => {
  try {
    const {title, value, type} = request.body;
    const transactionService = new CreateTransactionService(transactionsRepository);
    return response.json(transactionService.execute({title, value, type}))
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;

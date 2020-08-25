import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionServiceDTO{
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}:TransactionServiceDTO): Transaction {
    if (type === "outcome" && this.transactionsRepository.getBalance().total < value){
      throw Error("The current balance is not enougth!");
    }else{
      return this.transactionsRepository.create({title,value,type});
    }
  }
}

export default CreateTransactionService;

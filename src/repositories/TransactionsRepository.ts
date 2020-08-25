import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getTransactionsPlusBallance(){
   
    return {transactions:this.all(),
            balance:this.getBalance()}
  }

  private getIncome(total:number, num:number){
    if (num > 0){
      return total + num;
    }
    return total;
  }

  private getOutcome(total:number, num:number){
    if (num > 0){
      return total + num;
    }
    return total;
  }


  public getBalance(): Balance {
    const positiveValues = this.transactions.map(obj => obj.type==="income"?obj.value:0);
    const negativeValues = this.transactions.map(obj => obj.type==="outcome"?obj.value:0);
    const income = (positiveValues.length > 0) ? positiveValues.reduce(this.getIncome): 0;
    const outcome = (negativeValues.length > 0) ? negativeValues.reduce(this.getOutcome):0;
    const total = income-outcome;
    return {income,outcome,total}; 
  }

  public create({title,value,type}:TransactionDTO): Transaction {
   
    const transaction = new Transaction(
    {title,
    value,
    type});

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

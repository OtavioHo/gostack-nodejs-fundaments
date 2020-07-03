import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
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

  public getBalance(): Balance {
    const incomeReducer = (
      accumulator: Transaction,
      currentValue: Transaction,
    ): Transaction => {
      if (currentValue.type === 'income')
        accumulator.value += currentValue.value;
      return accumulator;
    };

    const outcomeReducer = (
      accumulator: Transaction,
      currentValue: Transaction,
    ): Transaction => {
      if (currentValue.type === 'outcome')
        accumulator.value += currentValue.value;
      return accumulator;
    };

    const income = this.transactions.reduce(incomeReducer).value;
    const outcome = this.transactions.reduce(outcomeReducer).value;

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, value, type });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;

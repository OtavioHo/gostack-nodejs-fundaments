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
    const reducer = (
      accumulator: Balance,
      currentValue: Transaction,
    ): Balance => {
      if (currentValue.type === 'income') {
        accumulator.income += currentValue.value;
        accumulator.total += currentValue.value;
      } else {
        accumulator.outcome += currentValue.value;
        accumulator.total -= currentValue.value;
      }
      return accumulator;
    };

    const initialBalance: Balance = { income: 0, outcome: 0, total: 0 };

    const balance = this.transactions.reduce(reducer, initialBalance);

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, value, type });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;

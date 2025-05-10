export type Expenses = {
  id: string;
  datetime: string;
  name: string;
  expensesCategory: {
    id: string;
    name: string;
    color: string;
  };
  payment: string;
  amount: number;
};
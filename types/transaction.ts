export type Transaction = {
  id: string;
  datetime: string;
  transactionCategory: {
    id: string;
    name: string;
  };
  creator: {
    name: string;
  };
  detail: string;
  price: number;
  paid: number;
  creatorUserId: string;
};

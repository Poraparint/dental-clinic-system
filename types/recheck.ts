export type Recheck = {
  id: string;
  patientId: string;
  createdAt: Date;
  recheckList: {
    datetime: Date;
    detail: string;
    price: number;
    transactionCategory: {
      name: string;
    };
  }[];
  patient: {
    name: string;
    phone: string;
  };
  transaction: {
    transactionCategory: {
      name: string;
    };
    detail: string;
    price: number;
    paid: number;
  };
  creator: {
    name: string;
  };
};

export type RecheckList = {
  
  datetime: Date;
  detail: string;
  price: number;
  transactionCategory: {
    name: string;
  };

}

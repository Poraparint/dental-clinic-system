import { CreateTransactionSchema } from "@/schemas";
import { Dentaltech, Recheck } from "@prisma/client";
import {z} from "zod";

export type Transaction = {
  id: string;
  datetime: Date;
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
  recheck: Recheck | null;
  dentaltech: Dentaltech | null;
};

export type TransactionFormData = z.infer<typeof CreateTransactionSchema> & {
  id?: string;
};

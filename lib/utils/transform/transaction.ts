import { Transaction, TransactionFormData } from "@/types/transaction";

export function toTransactionFormData(transaction: Transaction): TransactionFormData {
  return {
    id: transaction.id,
    datetime: transaction.datetime ?? new Date(),
    transactionCategoryId: transaction.transactionCategory?.id ?? "",
    detail: transaction.detail ?? "",
    price: transaction.price ?? null,
    paid: transaction.paid ?? null,
  };
}
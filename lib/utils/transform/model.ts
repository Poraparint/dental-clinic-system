import {
  Patients,
  PatientFormData,
  Transaction,
  TransactionFormData,
} from "@/types";

export function toPatientFormData(patient: Patients): PatientFormData {
  const keys: (keyof PatientFormData)[] = [
    "id",
    "name",
    "age",
    "phone",
    "address",
    "job",
    "work",
    "worktel",
    "cd",
    "drug",
  ];

  return Object.fromEntries(
    keys.map((key) => [key, patient[key] ?? ""])
  ) as PatientFormData;
}

export function toTransactionFormData(transaction: Transaction): TransactionFormData {
  return {
    id: transaction.id,
    datetime: transaction.datetime ?? new Date(),
    transactionCategoryId: transaction.transactionCategory?.id ?? "",
    detail: transaction.detail ?? "",
    price: transaction.price ?? null,
    paid: transaction.paid ?? null,
    addonItems:
      transaction.transactionAddons?.map((item) => ({
        addonItemId: item.id,
        price: item.price,
        quantity: item.quantity,
      })) ?? [],
  };
}

import {
  CommonCategoryFormData,
  DentalTechCategoryWithCreator,
  ExpensesCategoryWithManager,
  TransactionCategoryFormData,
  TransactionCategoryWithManager,
} from "@/types";

export function toTransactionCategoryFormData(
  category: TransactionCategoryWithManager
): TransactionCategoryFormData {
  return {
    id: category.id,
    name: category.name ?? "",
    description: category.description ?? "",
    price: category.price ?? 0,
  };
}

export function toExpensesCategoryFormData(
  category: ExpensesCategoryWithManager
): CommonCategoryFormData {
  return {
    id: category.id,
    name: category.name ?? "",
    description: category.description ?? "",
    color: category.color ?? "",
  };
}

export function toDentalTechCategoryFormData(
  category: DentalTechCategoryWithCreator
): CommonCategoryFormData {
  return {
    id: category.id,
    name: category.name ?? "",
    description: category.description ?? "",
  };
}
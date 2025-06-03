import { CommonCategoryFormData, TransactionCategoryFormData } from "@/types";

export interface TransactionCategoryFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  updateData?: TransactionCategoryFormData;
}

export interface CommonCategoryFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  updateData?: CommonCategoryFormData;
}
  

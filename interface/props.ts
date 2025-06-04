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

export interface onSoftDeleteProps<T = unknown> {
  item?: T;
  onSoftDelete?: (item: T) => Promise<{
    success?: string;
    error?: string;
    description?: string;
  }>;
  onDeleteResult?: (result: {
    success?: string;
    error?: string;
    description?: string;
  }) => void;
};
  

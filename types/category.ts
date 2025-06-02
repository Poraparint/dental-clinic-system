import { CreateCommonCategorySchema, CreateTransactionCategorySchema } from "@/schemas";
import { Prisma } from "@prisma/client";
import { z } from "zod";

//formData for schema
export type TransactionCategoryFormData = z.infer<typeof CreateTransactionCategorySchema> & {
  id?: string;
};

export type CommonCategoryFormData = z.infer<
  typeof CreateCommonCategorySchema
> & {
  id?: string;
};

export type TransactionCategoryWithManager =
  Prisma.TransactionCategoryGetPayload<{
    include: {
      manager: {
        select: {
          id: true;
          name: true;
        };
      };
    };
  }>;

export type DentalTechCategoryWithCreator =
  Prisma.DentalTechCategoryGetPayload<{
    include: {
      creator: { select: { name: true } };
    };
    
  }>;

export type ExpensesCategoryWithManager = Prisma.ExpensesCategoryGetPayload<{
  include: {
    manager: { select: { id: true; name: true } };
  };
}>;

export type ScheduleCategoryWithManager = Prisma.ScheduleCategoryGetPayload<{
  include: {
    manager: { select: { id: true; name: true } };
  };
}>;

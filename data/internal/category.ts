import { db } from "@/lib/db";

export const getTransactionCategoryName = async (name: string, companyId: string) => {
  const category = await db.transactionCategory.findUnique({
    where: {
      name_companyId: {
        name,
        companyId,
      },
    },
  });
  return category;
};

export const getAddonItemCategoryName = async (
  name: string,
  companyId: string
) => {
  const category = await db.addonItem.findUnique({
    where: {
      name_companyId: {
        name,
        companyId,
      },
    },
  });
  return category;
};

export const getDentalTechCategoryByName = async (name: string, companyId: string) => {
  const category = await db.dentalTechCategory.findUnique({
    where: {
      name_companyId: {
        name,
        companyId,
      },
    },
  });
  return category;
};

export const getScheduleCategoryName = async (name: string, companyId: string) => {
  const category = await db.scheduleCategory.findUnique({
    where: {
      name_companyId: {
        name,
        companyId,
      },
    },
  });
  return category;
};

export const getExpensesCategoryName = async (
  name: string,
  companyId: string
) => {
  const category = await db.expensesCategory.findUnique({
    where: {
      name_companyId: {
        name,
        companyId,
      },
    },
  });
  return category;
};

import { db } from "@/lib/db"

export const getTransactionName = async (name: string, companyId: string) => {
    const category = await db.transactionCategory.findUnique({
        where: {
            name,
            companyId,
     }
    })
    return category;
}
import { db } from "@/lib/db";

export const getAccountByManagerId = async (managerId: string) => {
    try {
        const account = await db.account.findFirst({
            where: { managerId }
        });

        return account;
    } catch {
        return null;
    }
}
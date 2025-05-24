"use client";

import { createContext, useContext } from "react";

export const CompanyContext = createContext<{ companyId: string } | undefined>(undefined);

export const useCompany = () => {
    const context = useContext(CompanyContext);
    if (!context) {
        throw new Error("useCompany must be used within a CompanyProvider");
    }
    return context;
}
// context/company-provider.tsx
"use client";
import { ReactNode } from "react";
import { CompanyContext } from "./company-context";

export const CompanyProvider = ({
  companyId,
  children,
}: {
  companyId: string;
  children: ReactNode;
}) => {
  return (
    <CompanyContext.Provider value={{ companyId }}>
      {children}
    </CompanyContext.Provider>
  );
};

// context/company-provider.tsx
"use client";
import { ReactNode } from "react";
import { CompanyContext, PatientContext } from "@/context/context";

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

export const PatientProvider = ({
  patientId,
  children,
}: {
  patientId: string;
  children: ReactNode;
}) => {
  return (
    <PatientContext.Provider value={{ patientId }}>
      {children}
    </PatientContext.Provider>
  );
};

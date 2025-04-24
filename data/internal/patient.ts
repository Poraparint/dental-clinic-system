import { db } from "@/lib/db";

export const getPatientByName = async (name: string, companyId: string) => {
  const patient = await db.patient.findUnique({
    where: {
      name,
      companyId,
      isDeleted: false,
    },
  });
  return patient;
};

export const getPatientByCompanyId = async ( patientId: string, companyId: string) => {
  const patient = await db.patient.findUnique({
    where: {
      id: patientId,
      companyId,
      isDeleted: false,
    },
  });
  return patient;
};

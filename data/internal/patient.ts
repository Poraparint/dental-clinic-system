import { db } from "@/lib/db";

export const getPatientByName = async (companyId: string, name: string) => {
  const patient = await db.patient.findUnique({
    where: {
      name_companyId: {
        name,
        companyId,
      },
    },
  });
  return patient;
};

export const getPatientByCompanyId = async (
  companyId: string,
  patientId: string
) => {
  const patient = await db.patient.findUnique({
    where: {
      id: patientId,
      companyId,
      isDeleted: false,
    },
  });
  return patient;
};

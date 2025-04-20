import { db } from "@/lib/db";

export const getPatientByName = async (name: string, companyId: string) => {
  const patient = await db.patient.findUnique({
    where: {
      name,
      companyId,
    },
  });
  return patient;
};

export const getPatientByCompanyId = async (id: string, companyId: string) => {
  const patient = await db.patient.findUnique({
    where: {
      id,
      companyId,
    },
  });
  return patient;
}

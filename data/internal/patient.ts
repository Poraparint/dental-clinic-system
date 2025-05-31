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
  const patient = await db.patient.findFirst({
    where: {
      id: patientId,
      companyId,
      isDeleted: false,
    },
  });
  return patient;
};

export const isDuplicatePatientName = async (
  companyId: string,
  patientId: string,
  name: string | undefined
) => {
  const patient = await db.patient.findFirst({
    where: {
      name,
      companyId,
      isDeleted: false,
      id: {
        not: patientId,
      },
    },
  });
  return patient;
};

export const getCreatorIdByPatientId = async (
  companyId: string,
  patientId: string,
) => {
  const patient = await db.patient.findFirst({
    where: {
      id: patientId,
      companyId,
      isDeleted: false,
    },
    select: {
      creatorUserId: true,
    },
  });
  return patient;
};

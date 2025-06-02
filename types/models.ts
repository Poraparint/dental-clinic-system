import { CreatePatientSchema, CreateTransactionSchema } from "@/schemas";
import { z } from "zod";
import { Prisma } from "@prisma/client";

//formData for schema
export type PatientFormData = z.infer<typeof CreatePatientSchema> & {
  id?: string;
};
export type TransactionFormData = z.infer<typeof CreateTransactionSchema> & {
  id?: string;
};

//type for get
export type Patients = Prisma.PatientGetPayload<{
  include: {
    creator: {
      select: { name: true };
    };
    updater: {
      select: { name: true };
    };
  };
}>;

export type Transaction = Prisma.TransactionGetPayload<{
  include: {
    transactionCategory: {
      select: {
        id: true;
        name: true;
      };
    };
    creator: {
      select: {
        name: true;
      };
    };
    recheck: true;
    dentaltech: true;
  };
}>;

export type Schedule = Prisma.ScheduleGetPayload<{
  include: {
    transactionCategory: { select: { name: true } };
    scheduleCategory: { select: { name: true; order: true } };
    dentist: { select: { name: true } };
    creator: { select: { name: true } };
  };
}>;

export type RecheckList = Prisma.RecheckListGetPayload<{
  include: {
    transactionCategory: { select: { name: true } };
    scheduleCategory: { select: { name: true; order: true } };
  };
}>;

export type Recheck = Prisma.RecheckGetPayload<{
  include: {
    patient: { select: { name: true; phone: true } };
    transaction: {
      select: {
        detail: true;
        price: true;
        paid: true;
        transactionCategory: { select: { name: true } };
      };
    };
    recheckList: {
      include: {
        transactionCategory: { select: { name: true } };
        scheduleCategory: { select: { name: true; order: true } };
      };
    };
    creator: { select: { name: true } };
  };
}>;

export type DentalTech = Prisma.DentaltechGetPayload<{
  include: {
    patient: {
      select: {
        name: true;
        phone: true;
      };
    };
    creator: {
      select: {
        name: true;
      };
    };
    dentalTechCategory: {
      select: {
        name: true;
      };
    };
  };
}>;

export type Member = Prisma.MemberGetPayload<{
  include: {
    user: {
      select: {
        name: true;
        email: true;
        phone: true;
        isTwoFactorEnabled: boolean;
      };
    };
  };
}>;

export type Expenses = Prisma.ExpensesGetPayload<{
  include: {
    expensesCategory: {
      select: {
        id: true;
        name: true;
        color: true;
      };
    };
  };
}>;

//type manual
export type DentalAppointment = {
  id: string;
  datetime: Date;
  patientId?: string;
  patientName: string | null;
  phone?: string | null;
  detail?: string | null;
  transactionCategory: {
    name: string;
  };
  scheduleCategory: {
    name: string;
    order: number;
  };
  dentist?: {
    name?: string | null;
  };
  isConfirmed?: boolean;
  isRecheck: boolean;
  recheckList?: RecheckList[];
  transaction?: {
    detail?: string;
    price?: number;
    paid?: number;
    transactionCategory?: {
      name: string;
    };
  };
  creator: {
    name?: string | null;
  };
  createdAt?: Date;
};

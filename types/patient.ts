import { CreatePatientSchema } from "@/schemas";
import { z } from "zod";

export type Patient = {
  id: string;
  name: string;
  age?: string | null;
  phone?: string | null;
  address?: string | null;
  job?: string | null;
  work?: string | null;
  worktel?: string | null;
  cd?: string | null;
  drug?: string | null;
};

export type PatientFormData = z.infer<typeof CreatePatientSchema> & {
  id?: string;
};

export type Patients = {
  id: string;
  name: string;
  phone: string;
  createdAt: Date;
  creator: {
    name: string;
  };
};

"use server";

import * as z from "zod";

//database
import { db } from "@/lib/db";

//schemas
import { CreatePatientSchema } from "@/schemas";

//lib
import { currentUser } from "@/lib/auth";
import { getCompanyById } from "@/data/company";
import { getPatientByName } from "@/data/patient";


export const createPatient = async (values: z.infer<typeof CreatePatientSchema>, companyId: string) => {

  const validateFields = CreatePatientSchema.safeParse(values);

  if (!validateFields.success) { 
    return{error: "Invalid fields!"};
  }

  const { name, phone, age, address, job, cd, drug } = validateFields.data;

  const existingPatient = await getPatientByName(name, companyId);

  if (existingPatient) {
    return {error: "Name already in use!"}
  }
  
  try {
    const existingUser = await currentUser();
    if (!existingUser) {
      console.log(`Manager with ID ${existingUser} not found`);
      return { error: "Manager not found!" };
    }

    const existingCompany = await getCompanyById(companyId);
    if (!existingCompany) {
      return { error: "Company not found!" };
    }

    await db.patient.create({
      data: {
        name,
        phone,
        age,
        address,
        job,
        cd,
        drug,
        companyId,
        createdById: existingUser.id,
        createdByType: existingUser.role,
      }
    })

    return { success: "Patient created successfully!" };
    
  } catch {
    return {error: "An error occurred while creating the patient"};
  }
}


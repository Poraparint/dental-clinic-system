"use server";

import * as z from "zod";

//database
import { db } from "@/lib/db";

//schemas
import { CreateCompanySchema } from "@/schemas";

//data
import { getCompanyById } from "@/data/company";
import { getManagerById } from "@/data/manager";

//lib
import { currentManagerId } from "@/lib/auth";


export const createCompany = async (values: z.infer<typeof CreateCompanySchema>) => {

  const validateFields = CreateCompanySchema.safeParse(values);

  if (!validateFields.success) { 
    return{error: "Invalid fields!"};
  }

  const { name, description } = validateFields.data;
  
  try {

    const existingManager = await currentManagerId();
    console.log("Manager ID:", existingManager);

    if (!existingManager) {
      console.warn(`Manager with ID ${existingManager} not found`);
      return {error: "Manager not found!"};
    }

    await db.company.create({
      data: {
        name,
        description,
        managerId: existingManager,
      }
    })

    return { success: "Company created successfully!" };
    
  } catch {
    return {error: "An error occurred while creating the company"};
  }
}

export const updateCompany = async (
  managerId: string,
  companyId: string,
  data: { name?: string; description?: string }
) => {
  try {
    const existingManager = await getManagerById(managerId);

    if (!existingManager) {
      console.warn(`Manager with ID ${managerId} not found`);
      return null;
    }

    const existingCompany = await getCompanyById(companyId);

    if (!existingCompany) {
      console.warn(`Company with ID ${companyId} not found`);
      return null;
    }

    if (existingCompany.managerId !== managerId) {
      console.warn(
        `Manager with ID ${managerId} does not own company ID ${companyId}`
      );
      return null;
    }

    const updatedCompany = await db.company.update({
      where: { id: companyId },
      data,
    });

    return updatedCompany;
  } catch (error) {
    console.error(`Error updating company with ID (${companyId}):`, error);
    return null;
  }
};

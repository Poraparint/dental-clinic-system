"use server";

import * as z from "zod";

//database
import { db } from "@/lib/db";

//schemas
import { CreateCompanySchema } from "@/schemas";

//lib
import { currentManager } from "@/lib/auth";


export const createCompany = async (values: z.infer<typeof CreateCompanySchema>) => {

  const validateFields = CreateCompanySchema.safeParse(values);

  if (!validateFields.success) { 
    return{error: "Invalid fields!"};
  }

  const { name, description } = validateFields.data;
  
  try {

    const existingManager = await currentManager();
    console.log("Manager ID:", existingManager);

    if (!existingManager) {
      console.warn(`Manager with ID ${existingManager} not found`);
      return {error: "Manager not found!"};
    }

    await db.company.create({
      data: {
        name,
        description,
        managerId: existingManager.id,
      }
    })

    return { success: "Company created successfully!" };
    
  } catch {
    return {error: "An error occurred while creating the company"};
  }
}


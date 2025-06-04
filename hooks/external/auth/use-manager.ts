import { LoginSchema, RegisterSchema } from "@/schemas";
import { z } from "zod";

export const managerLogin = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null
) => {
  try {
    const response = await fetch("/api/auth/manager-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...values, callbackUrl}),
    });
      
    if (response.redirected) {
      return { redirect: response.url };
    }

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error };
    }

    return {
      success: data.success,
      twoFactor: data.twoFactor,
      url: data.url, 
    };
      
  } catch (error) {
    console.error("[MANAGER_LOGIN]", error);
    return {
      error: "ไม่สามารถล็อคอินได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};

export const managerRegister = async (
  values: z.infer<typeof RegisterSchema>,
) => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (!response.ok) {
      return {
        error: data.error,
        description: data.description,
      };
    }

    return {
      success: data.success,
      description: data.description,
    };
  } catch (error) {
    console.error("[MANAGER_REGISTER]", error);
    return {
      error: "ไม่สามารถสมัครสมาชิกได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};


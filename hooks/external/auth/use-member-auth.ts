import { MemberLoginSchema } from "@/schemas";
import { z } from "zod";

export const memberLogin = async (
    values: z.infer<typeof MemberLoginSchema>,
    callbackUrl?: string | null
) => {
  try {
    const response = await fetch("/api/auth/member-login", {
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
    console.error("[MEMBER_LOGIN]", error);
    return {
      error: "ไม่สามารถล็อคอินได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};

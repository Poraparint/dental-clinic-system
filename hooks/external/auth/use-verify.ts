import { NewPasswordSchema, ResetSchema } from "@/schemas";
import { z } from "zod";
import { useEffect, useState } from "react";
import { ApiError } from "@/types";

type ApiSuccess = {
  success: string;
  description?: string;
};

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  try {
    const response = await fetch(`/api/auth/new-password?token=${token}`, {
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
    console.error("[NEW_PASSWORD]", error);
    return {
      error: "เกิดข้อผิดพลาด",
      description: "ไม่สามารถเปลี่ยนรหัสผ่านได้ โปรดลองใหม่ภายหลัง",
    };
  }
};

export const useVerifyEmail = (token: string | null) => {
  const [success, setSuccess] = useState<ApiSuccess | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch("/api/auth/new-verification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok || data.error) {
          setError(data);
        } else {
          setSuccess(data);
        }
      } catch (error) {
        console.error("POST_VERIFY", error);
        setError({
          error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
          description: "โปรดลองใหม่อีกครั้ง",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (token) verify();
    else {
      setError({ error: "Missing token" });
      setIsLoading(false);
    }
  }, [token]);

  return { error, success, isLoading };
};

export const resetPassword = async (
  values: z.infer<typeof ResetSchema>,

) => {
  try {
    const response = await fetch("/api/auth/reset", {
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
    console.error("[RESET_PASSWORD]", error);
    return {
      error: "เกิดข้อผิดพลาด",
      description: "ไม่สามารถรีเซ็ตรหัสผ่านได้ โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};
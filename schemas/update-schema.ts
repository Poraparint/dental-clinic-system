import { z } from 'zod';
import { baseNameSchema, emailSchema, loginPasswordSchema } from '@/schemas/index';

export const SettingSchema = z
  .object({
    ...baseNameSchema,
    isTwoFactorEnabled: z.optional(z.boolean()),
    ...emailSchema,
    ...loginPasswordSchema,
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "กรุณากรอกรหัสผ่านใหม่",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "กรุณากรอกรหัสผ่าน",
      path: ["password"],
    }
  );


  
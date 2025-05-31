import { z } from 'zod';
import { baseNameSchema, emailSchema, passwordSchema, loginPasswordSchema } from '@/schemas/index';
import { CompanyRole } from '@prisma/client';

export const NewPasswordSchema = z.object({
  ...passwordSchema,
});

export const ResetSchema = z.object({
  ...emailSchema,
});

export const LoginSchema = z.object({
  ...emailSchema,
  ...loginPasswordSchema,
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  ...emailSchema,
  ...passwordSchema,
  ...baseNameSchema,
});

export const MemberLoginSchema = z.object({
  ...emailSchema,
  ...loginPasswordSchema,
  memberCode: z.string().min(1, {
    message: "กรุณากรอกรหัสพนักงาน",
  }),
  code: z.optional(z.string()),
});

export const MemberRegisterSchema = z.object({
  ...emailSchema,
  ...passwordSchema,
  ...baseNameSchema,
  phone: z.optional(z.string()),
  memberCode: z.string().min(4, {
    message: "รหัสพนักงานต้องมีความยาวอย่างน้อย 4 ตัวอักษร",
  }),
  role: z.nativeEnum(CompanyRole, {
    required_error: "กรุณาเลือกตำแหน่ง",
  }),
});
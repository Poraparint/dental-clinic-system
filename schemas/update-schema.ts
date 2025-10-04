import { z } from 'zod';
import { baseNameSchema,emailSchema, loginPasswordSchema, datetimeSchema, detailSchema, priceSchema, createPaymentSchema } from '@/schemas/index';

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
  
export const UpdateAddonItemSchema = z.object({
  addonItemId: z.string(),
  name: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
});


  export const UpdateTransactionSchema = z
    .object({
      ...datetimeSchema,
      transactionCategoryId: z.string().min(1, "ต้องเลือกประเภทรายการ"),
      ...detailSchema,
      ...priceSchema,
      ...createPaymentSchema(),
      addonItems: z.array(UpdateAddonItemSchema).optional(),
    })
    .superRefine((data, ctx) => {
      if (
        typeof data.price === "number" &&
        typeof data.paid === "number" &&
        data.paid > data.price
      ) {
        ctx.addIssue({
          path: ["paid"],
          code: z.ZodIssueCode.custom,
          message: "จำนวนเงินที่ชำระต้องไม่เกินราคารวม",
        });
      }
    });
  
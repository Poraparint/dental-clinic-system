import { z } from 'zod';
import { baseNameSchema, descriptionSchema, optionalPriceSchema, datetimeSchema, detailSchema, priceSchema, createPaymentSchema } from '@/schemas/index';

export const CreateCompanySchema = z.object({
  ...baseNameSchema,
  ...descriptionSchema,
});

export const CreateTransactionCategorySchema = z.object({
  ...baseNameSchema,
  ...descriptionSchema,
  ...optionalPriceSchema,
});

export const CreateCommonCategorySchema = z.object({
  ...baseNameSchema,
  ...descriptionSchema,
  color: z.optional(z.string()),
});

export const CreatePatientSchema = z.object({
  ...baseNameSchema,
  phone: z.optional(z.string()),
  age: z.optional(z.string()),
  address: z.optional(z.string()),
  job: z.optional(z.string()),
  work: z.optional(z.string()),
  worktel: z.optional(z.string()),
  cd: z.optional(z.string()),
  drug: z.optional(z.string()),
});

export const CreateTransactionSchema = z
  .object({
    ...datetimeSchema,
    transactionCategoryId: z.string().min(1, "ต้องเลือกประเภทรายการ"),
    ...detailSchema,
    ...priceSchema,
    ...createPaymentSchema(),
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

export const CreateExpensesSchema = z.object({
  ...datetimeSchema,
  ...baseNameSchema,
  ecId: z.string().min(1, "ต้องเลือกประเภทรายการ"),
  payment: z.string().min(1, "ต้องเลือกประเภทรายการ"),
  amount: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ required_error: "กรุณากรอกจำนวนเงินที่ชำระ" })
      .min(0, "จำนวนเงินที่ชำระต้องไม่น้อยกว่า 0")
  ),
});

export const CreateDentalTechSchema = z.object({
  deadline: z.preprocess(
    (val) => {
      if (typeof val === "string" || val instanceof Date) {
        return new Date(val);
      }
      return val;
    },
    z.date({ required_error: "กรุณากรอกวันที่" })
  ),
  ...detailSchema,
  transactionId: z.string().min(1, "ต้องมีรหัสธุรกรรม"),
  teeth: z
    .optional(z.union([z.number(), z.string().transform((val) => Number(val))]))
    .refine((val) => val === undefined || !isNaN(val), {
      message: "ราคาต้องเป็นตัวเลข",
    }),
  dctId: z.string().min(1, "ต้องเลือกหมวดหมู่"),
  level: z.string().min(1, "ต้องเลือกประเภทรายการ"),
});

export const CreateRecheckSchema = z.object({
  transactionId: z.string().min(1, "ต้องมีรหัสธุรกรรม"),
  recheckList: z
    .array(
      z.object({
        ...datetimeSchema,
        scheduleId: z.string().min(1, "ต้องเลือกเวลา"),
        tcId: z.string().min(1, "ต้องมีหมวหมู่"),
        detail: z.string().optional().default(""),
        ...priceSchema,
      })
    )
    .min(1, "ต้องมีอย่างน้อย 1 รายการ")
    .max(6, "ไม่สามารถเพิ่มเกิน 6 รายการ"),
});

export const CreateScheduleSchema = z.object({
  ...datetimeSchema,
  scheduleId: z.string().min(1, "กรุณาเลือกเวลานัด"),
  phone: z.optional(z.string()),
  patientName: z.string().min(1, {
    message: "กรุณากรอกชื่อ",
  }),
  ...detailSchema,
  tcId: z.string().min(1, "ต้องเลือกประเภทรายการ"),
  memberId: z.string().min(1, "กรุณาเลือกทันตแพทย์ผู้รับผิดชอบ"),
});

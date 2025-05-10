import { CompanyRole } from "@prisma/client";
import * as z from "zod";

export const SettingSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
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
      message: "New password is required!",
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
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const CreateCompanySchema = z.object({
  name: z.string().min(1, {
    message: "Ministry name is required",
  }),
  description: z.optional(z.string()),
});

export const MemberLoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  memberCode: z.string().min(1, {
    message: "Memberid is required",
  }),
  code: z.optional(z.string()),
});

export const MemberRegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  phone: z.optional(z.string()),
  memberCode: z.string().min(4, {
    message: "Minimum 4 characters required",
  }),
  role: z.nativeEnum(CompanyRole, {
    required_error: "ต้องเลือกตำแหน่ง",
  }),
});

export const CreateTransactionCategorySchema = z.object({
  name: z.string().min(1, {
    message: "Category name is required",
  }),
  description: z.optional(z.string()),
  price: z
    .optional(z.union([z.number(), z.string().transform((val) => Number(val))]))
    .refine((val) => val === undefined || !isNaN(val), {
      message: "Price must be a valid number",
    }),
});

export const CreateDentalTechCategorySchema = z.object({
  name: z.string().min(1, {
    message: "Category name is required",
  }),
  description: z.optional(z.string()),
  color: z.optional(z.string()),
});

export const CreatePatientSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
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
    datetime: z.date({
      required_error: "A date is required.",
    }),
    transactionCategoryId: z.string().min(1, "ต้องเลือกประเภทรายการ"),
    detail: z.optional(z.string()),

    price: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z
        .number({ required_error: "กรุณากรอกราคา" })
        .min(0, "ราคาต้องไม่น้อยกว่า 0")
    ),
    paid: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z
        .number({ required_error: "กรุณากรอกจำนวนเงินที่ชำระ" })
        .min(0, "จำนวนเงินที่ชำระต้องไม่น้อยกว่า 0")
    ),
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
  datetime: z.date({
    required_error: "A date is required.",
  }),
  name: z.string().min(1, {
    message: "name is required",
  }),
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
  deadline: z.date({
    required_error: "A date is required.",
  }),
  detail: z.optional(z.string()),
  transactionId: z.string().min(1, "ต้องมีรหัสธุรกรรม"),
  teeth: z
    .optional(z.union([z.number(), z.string().transform((val) => Number(val))]))
    .refine((val) => val === undefined || !isNaN(val), {
      message: "Price must be a valid number",
    }),
  dctId: z.string().min(1, "ต้องเลือกหมวดหมู่"),
  level: z.string().min(1, "ต้องเลือกประเภทรายการ"),
});

export const CreateRecheckSchema = z.object({
  transactionId: z.string().min(1, "ต้องมีรหัสธุรกรรม"),
  recheckList: z
    .array(
      z.object({
        datetime: z.date({
          required_error: "ต้องระบุวันที่",
        }),
        tcId: z.string().min(1, "ต้องมีหมวหมู่"),
        detail: z.string().optional().default(""),
        price: z.preprocess(
          (val) => (val === "" ? undefined : Number(val)),
          z
            .number({ required_error: "กรุณากรอกราคา" })
            .min(0, "ราคาต้องไม่น้อยกว่า 0")
        ),
      })
    )
    .min(1, "ต้องมีอย่างน้อย 1 รายการ")
    .max(6, "ไม่สามารถเพิ่มเกิน 6 รายการ"),
});
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

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "กรุณากรอกอีเมล",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "กรุณากรอกอีเมล",
  }),
  password: z.string().min(1, {
    message: "กรุณากรอกรหัสผ่าน",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "กรุณากรอกอีเมล",
  }),
  password: z.string().min(6, {
    message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร",
  }),
  name: z.string().min(1, {
    message: "กรุณากรอกชื่อ",
  }),
});

export const CreateCompanySchema = z.object({
  name: z.string().min(1, {
    message: "กรุณากรอกชื่อ",
  }),
  description: z.optional(z.string()),
});

export const MemberLoginSchema = z.object({
  email: z.string().email({
    message: "กรุณากรอกอีเมล",
  }),
  password: z.string().min(1, {
    message: "กรุณากรอกรหัสผ่าน",
  }),
  memberCode: z.string().min(1, {
    message: "กรุณากรอกรหัสพนักงาน",
  }),
  code: z.optional(z.string()),
});

export const MemberRegisterSchema = z.object({
  email: z.string().email({
    message: "กรุณากรอกอีเมล",
  }),
  password: z.string().min(6, {
    message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร",
  }),
  name: z.string().min(1, {
    message: "กรุณากรอกชื่อ",
  }),
  phone: z.optional(z.string()),
  memberCode: z.string().min(4, {
    message: "รหัสพนักงานต้องมีความยาวอย่างน้อย 4 ตัวอักษร",
  }),
  role: z.nativeEnum(CompanyRole, {
    required_error: "กรุณาเลือกตำแหน่ง",
  }),
});

export const CreateTransactionCategorySchema = z.object({
  name: z.string().min(1, {
    message: "กรุณากรอกชื่อ",
  }),
  description: z.optional(z.string()),
  price: z
    .optional(z.union([z.number(), z.string().transform((val) => Number(val))]))
    .refine((val) => val === undefined || !isNaN(val), {
      message: "ราคาต้องเป็นตัวเลข",
    }),
});

export const CreateDentalTechCategorySchema = z.object({
  name: z.string().min(1, {
    message: "กรุณากรอกชื่อ",
  }),
  description: z.optional(z.string()),
  color: z.optional(z.string()),
});

export const CreatePatientSchema = z.object({
  name: z.string().min(1, {
    message: "กรุณากรอกชื่อ",
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
      required_error: "กรุณากรอกวันที่",
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
    required_error: "กรุณากรอกวันที่",
  }),
  name: z.string().min(1, {
    message: "กรุณากรอกชื่อ",
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
    required_error: "กรุณากรอกวันที่",
  }),
  detail: z.optional(z.string()),
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

export const CreateScheduleSchema = z.object({
  datetime: z.date({
    required_error: "กรุณากรอกวันที่",
  }),
  scheduleId: z.string().min(1, "กรุณาเลือกเวลานัด"),
  phone: z.optional(z.string()),
  patientName: z.string().min(1, {
    message: "กรุณากรอกชื่อ",
  }),
  detail: z.optional(z.string()),
  tcId: z.string().min(1, "ต้องเลือกประเภทรายการ"),
  memberId: z.string().min(1, "กรุณาเลือกทันตแพทย์ผู้รับผิดชอบ"),
});
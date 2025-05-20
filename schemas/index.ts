import { CompanyRole } from "@prisma/client";
import * as z from "zod";

// ======== Base schemas (common fields) ========
const baseNameSchema = {
  name: z.string().min(1, {
    message: "กรุณากรอกชื่อ",
  }),
};

// Schema สำหรับอีเมล
const emailSchema = {
  email: z.string().email({
    message: "กรุณากรอกอีเมล",
  }),
};

// Schema สำหรับรหัสผ่าน
const passwordSchema = {
  password: z.string().min(6, {
    message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร",
  }),
};

// Schema สำหรับรหัสผ่านที่ใช้ในการ login (ไม่ต้องมี min length)
const loginPasswordSchema = {
  password: z.string().min(1, {
    message: "กรุณากรอกรหัสผ่าน",
  }),
};

// Schema สำหรับ datetime
const datetimeSchema = {
  datetime: z.preprocess(
    (val) => {
      if (typeof val === "string" || val instanceof Date) {
        return new Date(val);
      }
      return val;
    },
    z.date({ required_error: "กรุณากรอกวันที่" })
  ),
};

// Schema สำหรับราคา
const priceSchema = {
  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ required_error: "กรุณากรอกราคา" })
      .min(0, "ราคาต้องไม่น้อยกว่า 0")
  ),
};

// Schema สำหรับ optional price
const optionalPriceSchema = {
  price: z
    .optional(z.union([z.number(), z.string().transform((val) => Number(val))]))
    .refine((val) => val === undefined || !isNaN(val), {
      message: "ราคาต้องเป็นตัวเลข",
    }),
};

// Schema สำหรับรายละเอียด
const detailSchema = {
  detail: z.optional(z.string()),
};

// Schema สำหรับ description
const descriptionSchema = {
  description: z.optional(z.string()),
};

// ======== คำสั่งฟังก์ชั่นช่วยสร้าง Schema ========

// ฟังก์ชั่นสำหรับสร้าง Schema ที่มีการจ่ายเงิน
const createPaymentSchema = () => ({
  paid: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ required_error: "กรุณากรอกจำนวนเงินที่ชำระ" })
      .min(0, "จำนวนเงินที่ชำระต้องไม่น้อยกว่า 0")
  ),
});

// ======== Actual schemas ========

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

export const CreateCompanySchema = z.object({
  ...baseNameSchema,
  ...descriptionSchema,
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

export const CreateTransactionCategorySchema = z.object({
  ...baseNameSchema,
  ...descriptionSchema,
  ...optionalPriceSchema,
});

export const CreateDentalTechCategorySchema = z.object({
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

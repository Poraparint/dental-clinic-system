
import * as z from "zod";

// ======== Base schemas (common fields) ========
export const baseNameSchema = {
  name: z.string().min(1, {
    message: "กรุณากรอกชื่อ",
  }),
};

// Schema สำหรับอีเมล
export const emailSchema = {
  email: z.string().email({
    message: "กรุณากรอกอีเมล",
  }),
};

// Schema สำหรับรหัสผ่าน
export const passwordSchema = {
  password: z.string().min(6, {
    message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร",
  }),
};

// Schema สำหรับรหัสผ่านที่ใช้ในการ login (ไม่ต้องมี min length)
export const loginPasswordSchema = {
  password: z.string().min(1, {
    message: "กรุณากรอกรหัสผ่าน",
  }),
};

// Schema สำหรับ datetime
export const datetimeSchema = {
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
export const priceSchema = {
  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ required_error: "กรุณากรอกราคา" })
      .min(0, "ราคาต้องไม่น้อยกว่า 0")
  ),
};

// Schema สำหรับ optional price
export const optionalPriceSchema = {
  price: z
    .optional(z.union([z.number(), z.string().transform((val) => Number(val))]))
    .refine((val) => val === undefined || !isNaN(val), {
      message: "ราคาต้องเป็นตัวเลข",
    }),
};

// Schema สำหรับรายละเอียด
export const detailSchema = {
  detail: z.optional(z.string()),
};

// Schema สำหรับ description
export const descriptionSchema = {
  description: z.optional(z.string()),
};

// ======== คำสั่งฟังก์ชั่นช่วยสร้าง Schema ========

// ฟังก์ชั่นสำหรับสร้าง Schema ที่มีการจ่ายเงิน
export const createPaymentSchema = () => ({
  paid: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ required_error: "กรุณากรอกจำนวนเงินที่ชำระ" })
      .min(0, "จำนวนเงินที่ชำระต้องไม่น้อยกว่า 0")
  ),
});

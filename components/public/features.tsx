import {
  Calendar,
  HandCoins,
  ShieldCheck,
  User,
  Users,
  BarChart3,
} from "lucide-react";

//props
import { CardFeatures } from "@/components/props/component/card/card-features";

export const Features = () => {
  return (
    <div className="container">
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Key Features</h2>
        <div className="w-12 h-1 bg-primary mb-6"></div>
        <p className="text-muted-foreground max-w-3xl">
          ฟีเจอร์หลักของระบบถูกออกแบบมาเพื่อช่วยคลินิกทันตกรรมขนาดเล็กให้จัดการข้อมูลได้ง่ายขึ้น
          ลดภาระงานซ้ำซ้อน และเพิ่มประสิทธิภาพในการทำงาน
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardFeatures
          icon={<User className="h-6 w-6 text-white" />}
          title="การจัดการผู้ป่วย"
          description="เก็บข้อมูลผู้ป่วย ประวัติการรักษา และการเข้าถึงข้อมูลได้อย่างรวดเร็วและปลอดภัย"
        />
        <CardFeatures
          icon={<Calendar className="h-6 w-6 text-white" />}
          title="การนัดหมาย"
          description="บันทึกและติดตามการนัดหมายผ่านปฏิทิน ช่วยลดความผิดพลาดและจัดการเวลาได้ง่าย"
        />
        <CardFeatures
          icon={<Users className="h-6 w-6 text-white" />}
          title="การจัดการบุคลากร"
          description="กำหนดบทบาทและสิทธิ์ของผู้ใช้งาน เช่น ผู้จัดการ ทันตแพทย์ ผู้ช่วยทันตแพทย์"
        />
        <CardFeatures
          icon={<HandCoins className="h-6 w-6 text-white" />}
          title="การบริหารการเงิน"
          description="บันทึกรายรับ รายจ่าย และคำนวณกำไรของคลินิก พร้อมรายงานสรุปผล"
        />
        <CardFeatures
          icon={<BarChart3 className="h-6 w-6 text-white" />}
          title="แดชบอร์ดรายงาน"
          description="ดูสถิติและข้อมูลภาพรวม เช่น จำนวนผู้ป่วย รายได้ต่อเดือน และการนัดหมาย"
        />
        <CardFeatures
          icon={<ShieldCheck className="h-6 w-6 text-white" />}
          title="ความปลอดภัยของระบบ"
          description="รองรับการเข้าสู่ระบบด้วยการยืนยันตัวตน และการกำหนดสิทธิ์ตามบทบาทผู้ใช้งาน"
        />
      </div>
    </div>
  );
};
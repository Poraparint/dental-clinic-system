import {
  ChartPie,
  Calendar,
  HandCoins,
  ShieldCheck,
  User,
  Users,
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
          ชุดฟีเจอร์ครบวงจรของเราได้รับการออกแบบมาเพื่อตอบโจทย์ในทุกด้านของการบริหารจัดการคลินิกทันตกรรม
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardFeatures
          icon={<User className="h-6 w-6 text-white" />}
          title="การจัดการคนไข้"
          description="จัดเก็บประวัติการรักษาทางทันตกรรม พร้อมรองรับการเข้าถึงข้อมูลผู้ป่วยได้อย่างปลอดภัย ทุกที่ ทุกเวลา"
        />
        <CardFeatures
          icon={<Calendar className="h-6 w-6 text-white" />}
          title="การนัดหมาย"
          description="บริหารจัดการการนัดหมายอย่างมีประสิทธิภาพผ่านปฏิทินที่ใช้งานง่าย"
        />
        <CardFeatures
          icon={<Users className="h-6 w-6 text-white" />}
          title="การจัดการสิทธิ์บุคลากร"
          description="จัดการบทบาทและสิทธิ์การเข้าถึง เพื่อควบคุมตำแหน่งพนักงานในคลินิค"
        />
        <CardFeatures
          icon={<HandCoins className="h-6 w-6 text-white" />}
          title="การบริหารการเงิน"
          description="จัดการรายจ่ายเพื่อนำมาคำนวณกำไรของคลินิกได้อย่างแม่นยำ พร้อมรายงานทางการเงินที่ชัดเจน"
        />
        <CardFeatures
          icon={<ChartPie className="h-6 w-6 text-white" />}
          title="แดชบอร์ดวิเคราะห์ข้อมูล"
          description="รับข้อมูลภาพรวมของคลินิกได้อย่างครบถ้วนผ่านแดชบอร์ด"
        />
        <CardFeatures
          icon={<ShieldCheck className="h-6 w-6 text-white" />}
          title="ความปลอดภัยและการปฏิบัติตามกฎหมาย"
          description="ใช้ authjs เพื่อจัดการการยืนยันตัวตน ทั้งนี้ระบบนี้ยังคงอยู่ในกระบวนการทดลองและกำลังพัฒนาอยู่ตลอดเวลา"
        />
      </div>
    </div>
  );
};

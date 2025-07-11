import { CircleCheck, CircleFadingArrowUp } from "lucide-react";
import Image from "next/image";

export const About = () => {
  return (
    <div className="container">
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">About Our System</h2>
        <div className="w-12 h-1 bg-primary mb-6"></div>
        <p className="text-muted-foreground max-w-3xl">
          ระบบบริหารจัดการคลินิกทันตกรรมของเราได้รับการออกแบบมาเพื่อยกระดับและเพิ่มประสิทธิภาพในการดำเนินงานของคลินิกทันตกรรมโดยเฉพาะ
          ช่วยให้คุณสามารถมุ่งเน้นในสิ่งที่สำคัญที่สุด นั่นคือ การดูแลคนไข้
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-center">
        <div>
          <div className="text-2xl font-bold mb-4 flex gap-2 items-center">
            <CircleFadingArrowUp className="text-jade" />{" "}
            ยกระดับคลินิกทันตกรรมของคุณ
          </div>
          <p className="text-muted-foreground mb-4">
            DentalClinicSystem
            เป็นระบบบริหารจัดการที่ได้รับการพัฒนาขึ้นสำหรับคลินิกทันตกรรมขนาดเล็กโดยเฉพาะ
            แพลตฟอร์มของเราผสานการจัดการประวัติผู้ป่วย การนัดหมาย
            การจัดการสิทธิ์บุคลากร และการดำเนินงานด้านการเงินไว้ภายในระบบเดียว
          </p>
          <p className="text-muted-foreground mb-4">
            ระบบของเราสามารถปรับใช้ได้อย่างยืดหยุ่นตามความต้องการ
            ช่วยเพิ่มประสิทธิภาพ ลดภาระงานด้านเอกสาร
            และเสริมสร้างความพึงพอใจของคนไข้
          </p>
          
        </div>

        <div className="bg-muted rounded-lg p-6 shadow-md border">
          <h4 className="font-bold mb-3">Key Benefits</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CircleCheck className="text-lapis" />
              <span>ลดเวลาในการดำเนินงานด้านธุรการได้สูงสุดถึง 30%</span>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheck className="text-lapis" />
              <span>เข้าถึงประวัติคนไข้ได้อย่างปลอดภัยจากทุกที่ทุกเวลา</span>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheck className="text-lapis" />
              <span>เพิ่มประสิทธิภาพในการติดตามและจัดทำรายงานทางการเงิน</span>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheck className="text-lapis" />
              <span>
                เสริมสร้างการสื่อสารและความพึงพอใจระหว่างผู้ป่วยและคลินิก
              </span>
            </li>
          </ul>
        </div>
        <div className="flex justify-end">
           <Image
          src="/dentistry.jpeg"
          height={300}
          width={300}
          alt="Dental-chair"
          className="rounded-xl hidden md:flex overflow-hidden"
        />
        </div>
       
      </div>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <div className="container flex justify-between">
      <div className="space-y-6 w-2/4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          ระบบบริการจัดการคลินิกทันตกรรม
        </h1>
        <div className="w-24 h-1 bg-primary mb-6"></div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          ยกระดับการจัดการคลินิกของคุณด้วยโซลูชันแบบครบวงจรที่ออกแบบมาโดยเฉพาะสำหรับทันตแพทย์
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg">
            <ShieldCheck />
            ทดลองใช้งาน
          </Button>
          <Button size="lg" variant="outline">
            เรียนรู้เพิ่มเติม
          </Button>
        </div>
      </div>
      <div className="w-2/4 flex justify-end">
        <Image
          src="/dental-chair.jpeg"
          height={400}
          width={400}
          alt="Dental-chair"
          className="rounded-xl"
        />
      </div>
    </div>
  );
};

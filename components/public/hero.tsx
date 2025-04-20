//ui
import { Button } from "@/components/ui/button";

//icon
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import { RoleGate } from "../props/role-gate";
import { CompanyRole } from "@prisma/client";
import { LinkButton } from "@/components/props/link-button";

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
          <RoleGate
            allowedRole={CompanyRole.MANAGER}
            fallback={
              <LinkButton
                title="ทดลองใช้งาน"
                icon={<ShieldCheck />}
                url="/dashboard/ministry"
              />
            }
          >
            <LinkButton
              title="เริ่มต้นใช้งาน"
              icon={<ShieldCheck />}
              url="/dashboard/ministry"
            />
          </RoleGate>

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

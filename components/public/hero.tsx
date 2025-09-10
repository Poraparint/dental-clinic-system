//ui
import { Button } from "@/components/ui/button";

//icon
import { ShieldCheck, Rocket, ArrowBigLeft, BookMarked } from "lucide-react";
import Image from "next/image";
import { RoleGate } from "../props/wrapper/role-gate";
import { CompanyRole } from "@prisma/client";
import { LinkButton } from "@/components/shared/button/link-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CLINIC_LOGIN_REDIRECT, MANAGER_LOGIN_REDIRECT } from "@/routes";

export const HeroSection = () => {
  const user = useCurrentUser();

  return (
    <div className="container flex justify-between">
      <div className="space-y-6 md:w-2/4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          ระบบบริการจัดการคลินิกทันตกรรม
        </h1>
        <div className="w-24 h-1 bg-primary mb-6" />
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          ยกระดับการจัดการคลินิกของคุณด้วยโซลูชันแบบเรียบง่ายที่ออกแบบมาโดยเฉพาะสำหรับคลินิกขนาดเล็ก
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          {user ? (
            <RoleGate
              allowedRole={[CompanyRole.MANAGER]}
              fallback={
                <LinkButton
                  title="เข้าทำงาน"
                  icon={<ArrowBigLeft />}
                  url={user?.companyId ? `/${user.companyId}${CLINIC_LOGIN_REDIRECT}` : "/"}
                />
              }
            >
              <LinkButton
                title="เริ่มต้นใช้งาน"
                icon={<ShieldCheck />}
                url={`${MANAGER_LOGIN_REDIRECT}`}
              />
            </RoleGate>
          ) : (
            <LinkButton title="ทดลองใช้งาน" icon={<Rocket />} url="/auth/login?demo=true&email=admin@test.com&password=123456" />
          )}

          <Button size="lg" variant="outline">
            <BookMarked/>ดูคู่มือการใช้งาน
          </Button>
        </div>
      </div>
      <div className="w-2/4 max-md:sr-only flex justify-end">
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

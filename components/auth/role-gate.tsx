"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { CompanyRole } from "@prisma/client";
import { Button } from "../ui/button";
import Link from "next/link";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: CompanyRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <div className="gap-2 flex">
        <Button asChild variant="emerald">
          <Link href="/auth/member-login">เข้าสู่ระบบพนักงาน</Link>
        </Button>
        <div className="gap-2 border-l-2 pl-2 items-center flex">
          <Button asChild variant="outline">
            <Link href="/auth/login">เข้าสู่ระบบ</Link>
          </Button>
          <Button asChild variant="lapis">
            <Link href="/auth/register">ลงทะเบียน</Link>
          </Button>
          
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

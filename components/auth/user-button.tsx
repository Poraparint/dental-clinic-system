"use client";
//icons
import { User, LogOutIcon, House, Users } from "lucide-react";
//ui
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/manager/logout-button";
import Link from "next/link";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { CompanyRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserCard } from "@/components/props/component/card/user-card";
import { getBgRoleColor } from "@/lib/common/role-color";
import { MANAGER_LOGIN_REDIRECT } from "@/routes";

export const UserButton = () => {
  const user = useCurrentUser();

  if (!user) {
    return (
      <div className="gap-2 flex">
        <Button asChild variant="emerald">
          <Link href="/auth/member-login">
            <Users />
            <span className="max-md:sr-only">เข้าสู่ระบบพนักงาน</span>
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link href="/auth/login">เข้าสู่ระบบบริหารคลินิค</Link>
        </Button>
        {/* <Button asChild variant="charoite">
          <Link href="/auth/register">ลงทะเบียน</Link>
        </Button> */}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserCard
          avatar={user?.image || ""}
          icon={
            <AvatarFallback
              className={`p-1 text-white ${getBgRoleColor(user.role)}`}
            >
              <User size={15} />
            </AvatarFallback>
          }
          title={user?.name}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem>
          <User />
          {user.role || "PENDING"}
        </DropdownMenuItem>
        <RoleGate
          allowedRole={[CompanyRole.MANAGER, CompanyRole.COMANAGER]}
          fallback={<></>}
        >
          <Link href={MANAGER_LOGIN_REDIRECT}>
            <DropdownMenuItem>
              <House />
              แดชบอร์ด
            </DropdownMenuItem>
          </Link>
        </RoleGate>
        <LogoutButton>
          <DropdownMenuItem>
            <LogOutIcon />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/manager/logout-button";
import Link from "next/link";
import { RoleGate } from "@/components/props/role-gate";
import { CompanyRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

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

    return (
      <RoleGate
        allowedRole={[CompanyRole.MANAGER , CompanyRole.COMANAGER]}
        fallback={
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="p-2">
                  <User />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuItem>
                <User />
                {user.name || "USER"}
              </DropdownMenuItem>
              <LogoutButton>
                <DropdownMenuItem>
                  <LogOutIcon />
                  Logout
                </DropdownMenuItem>
              </LogoutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      >
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback className="p-2">
                <User />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuItem>
              <User />
              {user.name || "USER"}
            </DropdownMenuItem>
            <Link href="/dashboard/ministry">
              <DropdownMenuItem>
                <House />
                แดชบอร์ด
              </DropdownMenuItem>
            </Link>
            <LogoutButton>
              <DropdownMenuItem>
                <LogOutIcon />
                Logout
              </DropdownMenuItem>
            </LogoutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </RoleGate>
    );
};

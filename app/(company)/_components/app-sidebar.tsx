"use client";

//icon
import { LayoutDashboard, Settings, Landmark, Calendar, LampDesk, MonitorSmartphone, UsersRound, Wallet, UserRoundCog } from "lucide-react";

//ui
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

//next
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";

// Menu items.
export const manages = [
  {
    title: "จัดการคนไข้",
    url: (companyId: string) => `/${companyId}/patients`,
    icon: UsersRound,
  },
  {
    title: "จัดการตารางนัด",
    url: (companyId: string) => `/${companyId}/appointments`,
    icon: Calendar,
  },
  {
    title: "คนไข้รีเช็ค/แบ่งจ่าย",
    url: (companyId: string) => `/${companyId}/rechecks`,
    icon: LampDesk,
  },
  {
    title: "งานทันตกรรม",
    url: (companyId: string) => `/${companyId}/dental-works`,
    icon: MonitorSmartphone,
  },
];

export const views = [
  {
    title: "แดชบอร์ด",
    url: (companyId: string) => `/${companyId}/dashboard`,
    icon: LayoutDashboard,
  },
  {
    title: "รายงานการเงิน",
    url: (companyId: string) => `/${companyId}/financial-reports`,
    icon: Landmark,
  },
];

export const settings = [
  {
    title: "จัดการค่าใช้จ่าย",
    url: (companyId: string) => `/${companyId}/expenses`,
    icon: Wallet,
  },
  {
    title: "จัดการสมาชิก",
    url: (companyId: string) => `/${companyId}/members`,
    icon: UserRoundCog,
  },
  {
    title: "ตั้งค่า",
    url: (companyId: string) => `/${companyId}/settings`,
    icon: Settings,
  },
];

export function AppSidebar() {

  const pathname = usePathname();
  const params = useParams();
  const companyId = params.companyId as string;

  const isActive = (url: string) => {
    return pathname === url;
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Image
                src="/favicon.ico"
                height={25}
                width={25}
                alt="Dental-clinic-system"
                className="rounded-md"
              />
              <span>DentalClinicSystem</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <hr className="my-2" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {manages.map((manage) => (
                <SidebarMenuItem key={manage.title}>
                  <SidebarMenuButton
                    asChild
                    variant={
                      isActive(manage.url(companyId)) ? "amethyst" : "default"
                    }
                  >
                    <Link
                      href={manage.url(companyId)}
                      className="flex items-center gap-3"
                    >
                      <manage.icon className="size-20" />
                      <span>{manage.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <hr className="my-2" />
              {views.map((view) => (
                <SidebarMenuItem key={view.title}>
                  <SidebarMenuButton
                    asChild
                    variant={
                      isActive(view.url(companyId)) ? "amethyst" : "default"
                    }
                  >
                    <Link
                      href={view.url(companyId)}
                      className="flex items-center gap-3"
                    >
                      <view.icon className="size-20" />
                      <span>{view.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <hr className="my-2" />
              {settings.map((setting) => (
                <SidebarMenuItem key={setting.title}>
                  <SidebarMenuButton
                    asChild
                    variant={
                      isActive(setting.url(companyId)) ? "amethyst" : "default"
                    }
                  >
                    <Link
                      href={setting.url(companyId)}
                      className="flex items-center gap-3"
                    >
                      <setting.icon className="size-20" />
                      <span>{setting.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href="#" className="flex items-center gap-3 w-full">
                <Image
                  src="/ceo.png"
                  height={25}
                  width={25}
                  alt="Designer-profile"
                  className="rounded-md"
                />
                <div className="flex flex-col ">
                  <span>Poraparint</span>
                  <span className="text-muted-foreground text-sm">Creator</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

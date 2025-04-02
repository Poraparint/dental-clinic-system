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
import { usePathname } from "next/navigation";

// Menu items.
const manages = [
  {
    title: "จัดการคนไข้",
    url: "/newcard",
    icon: UsersRound,
  },
  {
    title: "จัดการตารางนัด",
    url: "#",
    icon: Calendar,
  },
  {
    title: "คนไข้รีเช็ค/แบ่งจ่าย",
    url: "#",
    icon: LampDesk,
  },
  {
    title: "งานทันตกรรม",
    url: "#",
    icon: MonitorSmartphone,
  },
];

const views = [
  {
    title: "แดชบอร์ด",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "รายงานการเงิน",
    url: "#",
    icon: Landmark,
  },
];

const settings = [
  {
    title: "จัดการค่าใช้จ่าย",
    url: "#",
    icon: Wallet,
  },
  {
    title: "จัดการสมาชิก",
    url: "#",
    icon: UserRoundCog,
  },
  {
    title: "ตั้งค่า",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {

  const pathname = usePathname();

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
                  <SidebarMenuButton asChild variant={pathname === manage.url ? "amethyst" : "default"}>
                    <Link href={manage.url} className="flex items-center gap-3">
                      <manage.icon className="size-20" />
                      <span>{manage.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <hr className="my-2" />
              {views.map((view) => (
                <SidebarMenuItem key={view.title}>
                  <SidebarMenuButton asChild>
                    <Link href={view.url} className="flex items-center gap-3">
                      <view.icon className="size-20" />
                      <span>{view.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <hr className="my-2" />
              {settings.map((setting) => (
                <SidebarMenuItem key={setting.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={setting.url}
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

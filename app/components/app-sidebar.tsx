//icon
import { LayoutDashboard, Settings, Landmark, Calendar, Apple, LampDesk, MonitorSmartphone, UsersRound, Wallet, UserRoundCog } from "lucide-react";

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

// Menu items.
const manages = [
  {
    title: "จัดการคนไข้",
    url: "#",
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
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Apple />
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
                  <SidebarMenuButton asChild>
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
              <Link href="#" className="flex items-center gap-3">
                <Apple />
                <span>DentalClinicSystem</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

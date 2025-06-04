"use client";

//icon
import {
  LayoutDashboard,
  Settings,
  Landmark,
  Calendar,
  LampDesk,
  UsersRound,
  Wallet,
  UserRoundCog,
  Aperture,
} from "lucide-react";

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
import Image from "next/image";
import { NavigatingUi } from "@/components/props/component/navigating";
import { useNavigation } from "@/hooks/use-navigation";
import { useCompany } from "@/context/context";
import { useCurrentRole } from "@/hooks";
import { getFilteredMenus } from "@/lib/utils/validation/filterd-menu";

export function AppSidebar() {
  const { companyId } = useCompany();
  const { navigateTo, isNavigating, isActive } = useNavigation();
  const role = useCurrentRole();

  // กรองเมนูตาม role
  const { filteredManages, filteredViews, filteredSettings } =
    getFilteredMenus(role);

  return (
    <>
      {isNavigating && <NavigatingUi />}
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
                {filteredManages.length > 0 && (
                  <>
                    {filteredManages.map((manage) => (
                      <SidebarMenuItem key={manage.title}>
                        <SidebarMenuButton
                          asChild
                          variant={
                            isActive(manage.url(companyId))
                              ? "charoite"
                              : "default"
                          }
                          onClick={() => navigateTo(manage.url(companyId))}
                        >
                          <div className="flex items-center gap-3">
                            <manage.icon className="size-20" />
                            <span>{manage.title}</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                    <hr className="my-2" />
                  </>
                )}
                {filteredViews.length > 0 && (
                  <>
                    {filteredViews.map((view) => (
                      <SidebarMenuItem key={view.title}>
                        <SidebarMenuButton
                          asChild
                          variant={
                            isActive(view.url(companyId))
                              ? "charoite"
                              : "default"
                          }
                          onClick={() => navigateTo(view.url(companyId))}
                        >
                          <div className="flex items-center gap-3">
                            <view.icon className="size-20" />
                            <span>{view.title}</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                    <hr className="my-2" />
                  </>
                )}
                {filteredSettings.length > 0 && (
                  <>
                    {filteredSettings.map((setting) => (
                      <SidebarMenuItem key={setting.title}>
                        <SidebarMenuButton
                          asChild
                          variant={
                            isActive(setting.url(companyId))
                              ? "charoite"
                              : "default"
                          }
                          onClick={() => navigateTo(setting.url(companyId))}
                        >
                          <div className="flex items-center gap-3">
                            <setting.icon className="size-20" />
                            <span>{setting.title}</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Link
                  href="https://poraparint-portfolio.vercel.app"
                  passHref
                  legacyBehavior
                >
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full"
                  >
                    <Image
                      src="/ceo.png"
                      height={25}
                      width={25}
                      alt="Designer-profile"
                      className="rounded-md"
                    />
                    <div className="flex flex-col">
                      <span>Poraparint</span>
                      <span className="text-muted-foreground text-sm">
                        Creator
                      </span>
                    </div>
                  </a>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}

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
    url: (companyId: string) => `/${companyId}/dentaltech`,
    icon: Aperture,
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

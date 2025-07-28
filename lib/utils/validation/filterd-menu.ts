import { CompanyRole } from "@prisma/client";
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
  CircleUserRound,
} from "lucide-react";

export const profile = {
  title: "โปรไฟล์",
  url: (companyId: string) => `/${companyId}/profile`,
  icon: CircleUserRound,
};

export const manages = [
  {
    title: "จัดการคนไข้",
    url: (id: string) => `/${id}/patients`,
    icon: UsersRound,
  },
  {
    title: "จัดการตารางนัด",
    url: (id: string) => `/${id}/appointments`,
    icon: Calendar,
  },
  {
    title: "คนไข้รีเช็ค/แบ่งจ่าย",
    url: (id: string) => `/${id}/rechecks`,
    icon: LampDesk,
  },
  {
    title: "งานทันตกรรม",
    url: (id: string) => `/${id}/dentaltech`,
    icon: Aperture,
  },
];

export const views = [
  {
    title: "แดชบอร์ด",
    url: (id: string) => `/${id}/dashboard`,
    icon: LayoutDashboard,
  },
  {
    title: "รายงานการเงิน",
    url: (id: string) => `/${id}/financial-reports`,
    icon: Landmark,
  },
];

export const settings = [
  {
    title: "จัดการค่าใช้จ่าย",
    url: (id: string) => `/${id}/expenses`,
    icon: Wallet,
  },
  {
    title: "จัดการสมาชิก",
    url: (id: string) => `/${id}/members`,
    icon: UserRoundCog,
  },
  { title: "ตั้งค่า", url: (id: string) => `/${id}/settings`, icon: Settings },
];

export const getFilteredMenus = (role: CompanyRole) => {
  type MenuItem = {
    title: string;
    url: (id: string) => string;
    icon: React.ElementType;
  };

  const allowedManageTitlesForAssistant = new Set([
    "จัดการคนไข้",
    "จัดการตารางนัด",
  ]);

  let filteredManages: MenuItem[] = [];
  let filteredViews: MenuItem[] = [];
  let filteredSettings: MenuItem[] = [];

  if (role === CompanyRole.MANAGER) {
    // เข้าถึงทั้งหมด
    return {
      profile,
      filteredManages: manages,
      filteredViews: views,
      filteredSettings: settings,
    };
  }

  if (role === CompanyRole.COMANAGER) {
    filteredManages = manages;
    filteredViews = views.filter((item) => item.title !== "รายงานการเงิน");
    filteredSettings = settings.filter((item) => item.title === "ตั้งค่า");
  } else if (role === CompanyRole.DENTIST) {
    filteredManages = manages;
  } else if (role === CompanyRole.DENTALTECHNICIAN) {
    filteredManages = [manages.find((item) => item.title === "งานทันตกรรม")!];
    filteredSettings = [settings.find((item) => item.title === "ตั้งค่า")!];
  } else if (role === CompanyRole.ASSISTANT) {
    filteredManages = manages.filter((item) =>
      allowedManageTitlesForAssistant.has(item.title)
    );
  }

  return { profile, filteredManages, filteredViews, filteredSettings };
};

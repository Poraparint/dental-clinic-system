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
} from "lucide-react";

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


export const getFilteredMenus = (role: CompanyRole) => {
  let filteredManages = [...manages];
  let filteredViews = [...views];
  let filteredSettings = [...settings];

  switch (role) {
    case CompanyRole.COMANAGER:
      filteredSettings = filteredSettings.filter(
        (item) => item.title === "ตั้งค่า"
      );
      filteredViews = filteredViews.filter(
        (item) => item.title !== "รายงานการเงิน"
      );
      break;
    case CompanyRole.DENTIST:
      // สามารถเข้าถึง manages ทั้งหมดอยู่แล้ว
      filteredViews = [];
      filteredSettings = [];
      break;
    case CompanyRole.DENTALTECHNICIAN:
      filteredManages = filteredManages.filter(
        (item) => item.title === "งานทันตกรรม"
      );
      filteredViews = [];
      filteredSettings = filteredSettings.filter(
        (item) => item.title === "ตั้งค่า"
      );
      break;
    case CompanyRole.ASSISTANT:
      filteredManages = filteredManages.filter((item) =>
        ["จัดการคนไข้", "จัดการตารางนัด"].includes(item.title)
      );
      filteredViews = [];
      filteredSettings = [];
      break;
    case CompanyRole.MANAGER:
      // เข้าถึงทั้งหมดอยู่แล้ว
      break;
    default:
      // สำหรับ role อื่นๆ
      filteredManages = [];
      filteredViews = [];
      filteredSettings = [];
  }

  return { filteredManages, filteredViews, filteredSettings };
};


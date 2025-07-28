"use client";

import {
  profile,
  manages,
  views,
  settings,
} from "@/lib/utils/validation/filterd-menu";
import { useCompany } from "@/context/context";
import { usePathname } from "next/navigation";

export const ShowInfoPathname = () => {
  const pathname = usePathname();
  const { companyId } = useCompany();

  const allMenus = [profile, ...manages, ...views, ...settings];
  const currentMenu = allMenus.find((menu) =>
    pathname.startsWith(menu.url(companyId))
  );

  return (
    <>
      {currentMenu ? (
        <span className="flex gap-2 ml-4">
          {<currentMenu.icon />}
          {currentMenu.title}
        </span>
      ) : (
        ""
      )}
    </>
  );
};

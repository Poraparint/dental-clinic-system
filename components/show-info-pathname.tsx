"use client";

import {
  manages,
  views,
  settings,
} from "@/app/(company)/_components/app-sidebar";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

export const ShowInfoPathname = () => {
  const pathname = usePathname();
  const params = useParams();
  const companyId = params.companyId as string;

  const allMenus = [...manages, ...views, ...settings];
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

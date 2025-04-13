import React from "react";
import { ShowInfoPathname } from "@/components/show-info-pathname";
//ui
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/theme/modetoggle";

import { UserButton } from "@/components/auth/user-button";

export function Navbar() {
  return (
    <div className="border flex items-center gap-2 justify-between p-2 bg-sidebar text-sidebar-foreground">
      <ShowInfoPathname />
      <div className="flex gap-2">
        <ModeToggle />
        <SidebarTrigger className="p-4" />
        <UserButton/>
      </div>
    </div>
  );
}

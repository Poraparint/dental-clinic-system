import React from "react";
//ui
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/theme/modetoggle";

export function Navbar() {
  return (
    <div className="border flex gap-2 justify-between p-2 bg-sidebar text-sidebar-foreground">
      <ModeToggle />
      <SidebarTrigger className="border p-4" />
    </div>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";

export const Navbar = () => {
  const pathname = usePathname();
  const lists = [
    {
      title: "server",
      url: "/server",
    },
    {
      title: "client",
      url: "/client",
    },
    {
      title: "admin",
      url: "/admin",
    },
    {
      title: "settings",
      url: "/settings",
    },
  ];

  const currentPage = lists.find((list) => list.url === pathname);

  return (
    <div className="flex justify-between p-4 bg-background border rounded-md">
      {currentPage && <p>{currentPage.title}</p>}
      <div className="flex gap-x-2">
        {lists.map((list) => (
          <Button
            key={list.title}
            asChild
            variant={pathname === list.url ? "emerald" : "outline"}
          >
            <Link href={list.url}>{list.title}</Link>
          </Button>
        ))}
      </div>
      <UserButton />
    </div>
  );
};

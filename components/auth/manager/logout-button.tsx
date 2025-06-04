"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/"); 
    });
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {isPending ? "ออกจากระบบ..." : children}
    </span>
  );
};

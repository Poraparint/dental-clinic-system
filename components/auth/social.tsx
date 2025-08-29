"use client"

import { Button } from "../ui/button";

//icon
import { FcGoogle } from "react-icons/fc";

//next-auth
import { signIn } from "next-auth/react";
import { MANAGER_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: callbackUrl || MANAGER_LOGIN_REDIRECT,
    });
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("google")}>
        <FcGoogle className="size-5" />
      </Button>
    </div>
  );
};

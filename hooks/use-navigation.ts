"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const navigateTo = (url: string) => {
    if (pathname !== url) {
      setIsNavigating(true);
      router.push(url);
    }
  };

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const isActive = (url: string) => {
    return pathname.startsWith(url);
  };

  return {
    isNavigating,
    navigateTo,
    isActive,
    pathname,
  };
};

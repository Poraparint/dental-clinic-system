"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertCircle, Ban, FileX, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export type ErrorType = 'notFound' | 'error' | 'permissionDenied' | 'offline' | 'custom';

type ErrorConfig = {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}

type ErrorUIProps = {
  type: ErrorType;
  title?: string;
  description?: string;
  showBackButton?: boolean;
    customIcon?: React.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
};

const ERROR_CONFIG: Record<ErrorType, ErrorConfig> = {
  notFound: {
    icon: <FileX className="size-28 text-muted-foreground" />,
    title: "Page Not Found",
    description: "We couldn't find the page you were looking for.",
    color: "border-slate-200 bg-slate-50 text-black",
  },
  error: {
    icon: <AlertCircle className="size-28 text-red-500" />,
    title: "Something Went Wrong",
    description: "An error occurred while processing your request.",
    color: "border-red-200 bg-red-50 text-red-700",
  },
  permissionDenied: {
    icon: <Ban className="size-28 text-amber-500" />,
    title: "Permission Denied",
    description: "You don't have permission to access this resource.",
    color: "border-amber-200 bg-amber-50 text-amber-700",
  },
  offline: {
    icon: <WifiOff className="size-28 text-blue-500" />,
    title: "You're Offline",
    description: "Please check your internet connection and try again.",
    color: "border-blue-200 bg-blue-50 text-blue-700",
  },
  custom: {
    icon: <AlertCircle className="size-28 text-purple-500" />,
    title: "Notice",
    description: "Custom message",
    color: "border-purple-200 bg-purple-50 text-purple-700",
  },
};

export default function ErrorUI({
  type,
  title,
  description,
  showBackButton = true,
  customIcon,
  action,
}: ErrorUIProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const config = ERROR_CONFIG[type];

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-4 flex justify-center">
          {customIcon || config.icon}
        </div>

        <Alert className={`mb-6 ${config.color}`}>
          <AlertTitle className="text-xl font-semibold">
            {title || config.title}
          </AlertTitle>
          <AlertDescription className="mt-2 text-sm text-muted-foreground">
            {description || config.description}
          </AlertDescription>
        </Alert>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {showBackButton && (
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="group flex items-center gap-2 px-6 py-5 text-base transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5 transform transition-transform duration-200 ease-in-out group-hover:-translate-x-1" />
              <span>Go Back</span>
            </Button>
          )}

          {action && (
            <Button
              onClick={action.onClick}
              className="flex items-center gap-2"
            >
              {action.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
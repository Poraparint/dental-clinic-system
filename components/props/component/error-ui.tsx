"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertCircle, LockKeyhole, FileX, WifiOff } from "lucide-react";
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
    description: "ไม่พบหน้าที่คุณกำลังค้นหา",
    color: "border-slate-200 bg-slate-50 text-black",
  },
  error: {
    icon: <AlertCircle className="size-28 text-red-600" />,
    title: "Something Went Wrong",
    description: "เกิดข้อผิดพลาดขณะดำเนินการคำขอของคุณ",
    color: "border-red-200 bg-red-bg text-red-text",
  },
  permissionDenied: {
    icon: <LockKeyhole className="size-28 text-amber-600" />,
    title: "Permission Denied",
    description: "คุณไม่มีสิทธิ์ในการเข้าถึงทรัพยากรนี้",
    color: "border-amber-border bg-amber-bg text-amber-text",
  },
  offline: {
    icon: <WifiOff className="size-28 text-blue-600" />,
    title: "You're Offline",
    description:
      "โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของคุณ แล้วลองใหม่อีกครั้ง",
    color: "border-blue-200 bg-blue-50 text-blue-text",
  },
  custom: {
    icon: <AlertCircle className="size-28 text-purple-600" />,
    title: "Notice",
    description: "ข้อความที่กำหนดเอง",
    color: "border-purple-border bg-purple-50 text-purple-text",
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
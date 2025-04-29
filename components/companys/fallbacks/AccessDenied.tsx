import { Shield, Lock, AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";

interface AccessDeniedProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export const AccessDenied = ({
  title = "คุณไม่มีสิทธิ์ในการเข้าถึง",
  message = "คุณไม่มีสิทธิ์เข้าถึงหน้านี้ โปรดติดต่อผู้ดูแลระบบเพื่อขอสิทธิ์เพิ่มเติม",
  showBackButton = true,
  ctaText,
  ctaLink,
}: AccessDeniedProps) => {
  const router = useRouter();

  return (
    <Card className="items-center col-span-full p-4">
      <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-destructive">
        <Shield className="w-10 h-10 text-destructive-foreground" />
      </div>

      <CardContent className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 mb-2">
          <Lock className="w-5 h-5 text-red-800" />
          <h1 className="text-2xl font-bold">{title}</h1>
        </CardTitle>

        <CardDescription>{message}</CardDescription>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-6">
          {showBackButton && (
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ย้อนกลับ</span>
            </Button>
          )}

          {ctaText && ctaLink && (
            <Button
              onClick={() => router.push(ctaLink)}
              className="flex items-center gap-2"
            >
              <span>{ctaText}</span>
            </Button>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center gap-2 p-4 rounded-lg max-w-md bg-amber-100 text-amber-800">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm">
          หากคุณเชื่อว่านี่เป็นข้อผิดพลาด โปรดติดต่อฝ่ายไอทีที่{" "}
          <Link
            href="mailto:poraparint@gmail.com"
            className="font-medium underline"
          >
            poraparint@gmail.com
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

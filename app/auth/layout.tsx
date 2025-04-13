import { ModeToggle } from "@/theme/modetoggle";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-6xl md:h-[40rem] border rounded-xl shadow-md relative">
        <div className="flex h-full">
          <div className="relative max-md:hidden w-2/4 m-3">
            <Image
              src="/night.jpeg"
              fill
              alt="night-sky"
              className="rounded-md object-cover dark:block"
            />
            <Image
              src="/day.jpeg"
              fill
              alt="day-sky"
              className="rounded-md object-cover dark:hidden"
            />

            {/* ลิงก์ที่แสดงบนรูป */}
            <Link href="/" className="block w-full h-full">
              <div className="absolute top-3 left-3 bg-background/80 px-3 py-1 rounded-md flex items-center text-sm">
                <ChevronRight size={16} className="mr-1" />
                Back to website
              </div>
            </Link>
          </div>
          <div className="space-y-6 md:w-2/4 w-full">{children}</div>
          <div className="p-2 absolute right-0">
            <ModeToggle />
          </div>
          
          {/* ส่วนภาพประกอบ */}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

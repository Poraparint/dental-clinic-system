import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 transition-colors duration-200 group"
      >
        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="text-sm font-medium tracking-wide">หน้าหลัก</span>
      </Link>

      <div className="flex justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-2 tracking-wide items-center justify-center pb-5 font-medium">
            <div className="bg-background rounded-md p-2 ">
              <Image
                src="/favicon.ico"
                height={30}
                width={30}
                alt="Dental-clinic-system"
              />
            </div>

            <span>เข้าสู่ระบบบริหารคลินิค</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

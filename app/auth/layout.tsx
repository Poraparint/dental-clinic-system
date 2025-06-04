import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 relative">
      {/* Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-200 group"
      >
        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="text-sm font-medium tracking-wide">หน้าหลัก</span>
      </Link>

      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md">
          {" "}
          <div className="flex gap-2 text-white tracking-wide items-center justify-center pb-5">
            <Image
              src="/favicon.ico"
              height={30}
              width={30}
              alt="Dental-clinic-system"
            />
            <span>ระบบบริหารคลินิคทันตกรรม</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

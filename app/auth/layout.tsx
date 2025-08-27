import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="h-screen relative">
      {/* Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 transition-colors duration-200 group"
      >
        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="text-sm font-medium tracking-wide">หน้าหลัก</span>
      </Link>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-charoite font-semibold text-2xl">เข้าสู่ระบบ</h1>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;

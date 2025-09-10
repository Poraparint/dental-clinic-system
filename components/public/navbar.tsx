import Image from "next/image";
import { UserButton } from "@/components/auth/user-button";
import { ModeToggle } from "@/theme/modetoggle";
import Link from "next/link";

interface PublicNavbarProps {
  children?: React.ReactNode;
}
export const PublicNavbar = ({ children }: PublicNavbarProps) => {
  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/favicon.ico"
            height={30}
            width={30}
            alt="Dental-clinic-system"
          />
          <div className="flex flex-col text-sm font-bold tracking-wide max-md:sr-only">
            <span>DentalClinic</span>
            <span className="text-muted-foreground">ManagementSystem</span>
          </div>
        </Link>
        {children}
        <div className="flex items-center gap-3">
          <UserButton />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

"use client";

import { useRef } from "react";
import { HeroSection } from "@/components/public/hero";
import { About } from "@/components/public/about";
import { Features } from "@/components/public/features";
import { Contact } from "@/components/public/contact";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "@/theme/modetoggle";
import Link from "next/link";
import { Footer } from "./footer";

export const Home = () => {
  const herosection = useRef<HTMLDivElement>(null);
  const about = useRef<HTMLDivElement>(null);
  const features = useRef<HTMLDivElement>(null);
  const contact = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <Image
              src="/favicon.ico"
              height={30}
              width={30}
              alt="Dental-clinic-system"
            />
            <div className="flex flex-col text-sm font-bold tracking-wide">
              <span>DentalClinic</span>
              <span className="text-muted-foreground">ManagementSystem</span>
            </div>
          </div>

          <div className="md:flex items-center gap-6 hidden">
            <button
              onClick={() => scrollToSection(herosection)}
              className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <span className="text-sm font-medium hover:text-primary">
                หน้าหลัก
              </span>
            </button>
            <button
              onClick={() => scrollToSection(features)}
              className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <span className="text-sm font-medium hover:text-primary">
                บริการ
              </span>
            </button>
            <button
              onClick={() => scrollToSection(about)}
              className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <span className="text-sm font-medium hover:text-primary">
                เกี่ยวกับ
              </span>
            </button>
            <button
              onClick={() => scrollToSection(contact)}
              className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <span className="text-sm font-medium hover:text-primary">
                ติดต่อ
              </span>
            </button>
          </div>
          <div className="gap-2 flex">
            <Button asChild variant="emerald">
              <Link href="/auth/login">เข้าสู่ระบบพนักงาน</Link>
            </Button>
            <div className="gap-2 border-l-2 pl-2 items-center flex">
              <Button asChild variant="outline">
                <Link href="/auth/login">เข้าสู่ระบบ</Link>
              </Button>
              <Button asChild variant="lapis">
                <Link href="/auth/register">ลงทะเบียน</Link>
              </Button>
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-col items-center gap-5 px-5">
        <div ref={herosection} className="pt-20">
          <HeroSection />
        </div>
        <div ref={features} className="pt-20">
          <Features />
        </div>
        <div ref={about} className="pt-20">
          <About />
        </div>
        <div ref={contact} className="py-20">
          <Contact />
        </div>
      </div>
      <Footer />
    </div>
  );
};

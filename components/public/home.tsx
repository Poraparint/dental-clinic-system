"use client";

import { useRef } from "react";
import { HeroSection } from "@/components/public/hero";
import { About } from "@/components/public/about";
import { Features } from "@/components/public/features";
import { Contact } from "@/components/public/contact";
import { Footer } from "./footer";
import { PublicNavbar } from "@/components/public/navbar";

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
      <PublicNavbar>
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
      </PublicNavbar>
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

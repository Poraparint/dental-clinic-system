"use client";
import { Header } from "@/components/props/component/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/shared/button/back-button";
import Link from "next/link";

//ui
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

//icons
import { ChevronRight } from "lucide-react";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription?: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  headerDescription,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="border-none shadow-none relative">
      <CardHeader className="max-md:pt-8">
        <Link
          href="/"
          className="flex absolute top-3 left-2 text-muted-foreground md:hidden"
        >
          <ChevronRight />
          Back to website
        </Link>
        <Header label={headerLabel} description={headerDescription} />
        <div className="w-16 h-1 bg-primary"></div>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80 md:h-[28rem]">{children}</ScrollArea>
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
    </Card>
  );
};

"use client";
import { Header } from "@/components/props/component/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/shared/button/back-button";

//ui
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
  headerDescription?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
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
    <Card className="rounded-xl border-none relative">
      <CardHeader>
        <Header label={headerLabel} description={headerDescription} />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80 md:h-[28rem]">{children}</ScrollArea>
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      {backButtonHref && backButtonLabel && (
        <BackButton label={backButtonLabel} href={backButtonHref} />
      )}
    </Card>
  );
};

import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
interface CardMinistryProps {
  linkname?: string | null;
  name?: string | null;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export const CardMinistry = ({
  linkname,
  name,
  description,
}: CardMinistryProps) => {
  return (
    <Card className="bg-primary-foreground">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1.5">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </div>
        <div className="bg-indigo rounded-full p-3">
          <HeartPulse className="text-white h-6 w-6" />
        </div>
      </CardHeader>
      <CardFooter className="pt-4">
        <Button asChild className="group px-0">
          <Link href={linkname || "#"} className="flex items-center gap-1">
            <span>Access to dashboard</span>
            <ChevronRight className="h-4 w-4 transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

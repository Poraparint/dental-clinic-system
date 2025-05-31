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
  onClick?: () => void;
  name?: string | null;
  description?: string | null;
}

export const CardMinistry = ({
  onClick,
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
        <Button className="group px-0" onClick={onClick}>
          <span>Access to dashboard</span>
          <ChevronRight className="size-4 transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

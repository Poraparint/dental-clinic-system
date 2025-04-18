import { Plus, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconButton } from "./props/dialog-button";

interface FormNotFoundProps {
  message?: string;
  description?: string;
  url?: string | null;
  urlname?: string;
}

export const FormNotFound = ({
  message,
  description,
  url,
  urlname,
}: FormNotFoundProps) => {
  if (!message) return null;

  return (
    <Card className="justify-center items-center col-span-full">
      <CardHeader className="w-full">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-lapis-foreground w-fit p-5">
            <Search className="size-16 text-lapis-accent stroke-3" />
          </div>
          <CardTitle>{message}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <IconButton icon={<Plus />} title={urlname || ""} url={url || "#"} />
      </CardContent>
    </Card>
  );
};

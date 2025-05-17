"use client";
import { Search } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface FormNotFoundProps {
  message?: string;
  description?: string;
}

export const FormNotFound = ({ message, description }: FormNotFoundProps) => {
  if (!message) return null;

  return (
    <Card className="p-8 flex flex-col items-center justify-center text-center col-span-full">
      <div className="size-20 rounded-full flex items-center justify-center flex-shrink-0 bg-charoite">
        <Search className="size-10 text-white" />
      </div>

      {message && <CardTitle>{message}</CardTitle>}
      {description && (
        <CardDescription>{description}</CardDescription>
      )}
    </Card>
  );
};

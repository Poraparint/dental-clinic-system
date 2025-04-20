import { LinkButton } from "@/components/props/link-button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { SearchXIcon } from "lucide-react";

export default function NotFound() {
  return (
    <Card className="h-screen flex flex-col items-center justify-center">
          <CardContent className="flex flex-col gap-5 items-center justify-center">
              <SearchXIcon size={140} className="text-destructive-foreground"/>
        <CardTitle className="text-4xl font-bold">
          Looks like you got lost
        </CardTitle>
        <CardDescription className="text-xl">
          The page you are looking for does not exist or has been moved :(
        </CardDescription>
              <LinkButton title="Back to Home" icon={<SearchXIcon />} url="/"/>
             
      </CardContent>
    </Card>
  );
}

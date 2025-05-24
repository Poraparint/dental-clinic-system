import { NavigatingUi } from "@/components/props/component/navigating";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigation } from "@/hooks/use-navigation";
import { Navigation } from "lucide-react";

interface TitleCardProps {
  title: string;
  description?: string;
  dialog?: React.ReactNode;
  companyId?: string;
  path?: string;
  children?: React.ReactNode;
  hr?: boolean;
}

export const TitleCard = ({
  title,
  description,
  dialog,
  companyId,
  path,
  children,
  hr = true,
}: TitleCardProps) => {
  const { navigateTo, isNavigating } = useNavigation();

  const handleNavigate = () => {
    if (!companyId || !path) return;
    navigateTo(`/${companyId}/${path}`);
  };

  return (
    <Card className="px-5">
      {isNavigating && <NavigatingUi />}
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {dialog && dialog}
        {path && companyId && (
          <Button onClick={handleNavigate}>
            <Navigation />
          </Button>
        )}
      </div>
      {hr && <hr />}
      {children}
    </Card>
  );
};

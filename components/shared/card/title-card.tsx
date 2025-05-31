import { NavigatingUi } from "@/components/props/component/navigating";
import { Card } from "@/components/ui/card";
import { useNavigation } from "@/hooks/use-navigation";
import { RouterButton } from "@/components/shared/button/router-button";

interface TitleCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  dialog?: React.ReactNode;
  companyId?: string;
  path?: string;
  children?: React.ReactNode;
  tooltip?: string;
  hr?: boolean;
}

export const TitleCard = ({
  title,
  description,
  icon,
  dialog,
  companyId,
  path,
  children,
  tooltip,
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
          <RouterButton onClick={handleNavigate} tooltip={tooltip} icon={ icon } />
        )}
      </div>
      {hr && <hr />}
      {children}
    </Card>
  );
};

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ProfileCard } from "@/components/props/component/card/profile-card";

interface CardCategoryProps {
  children?: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  description?: string;
}

export const CardCategory = ({
  children,
  icon,
  title,
  description,

}: CardCategoryProps) => {
  return (
    <Card className="mb-3 border-0 shadow-none relative w-full">
      <ProfileCard icon={ icon } title={title} description={description} />
      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
};

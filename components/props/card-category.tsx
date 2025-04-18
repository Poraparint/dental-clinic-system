import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

interface CardCategoryProps {
  children: React.ReactNode;
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
    <Card className="border-0 shadow-none">
      <CardHeader>
        <div className="flex gap-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>

        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <hr className="mx-15" />
    </Card>
  );
};

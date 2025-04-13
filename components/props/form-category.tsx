import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface FormCategoryProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  description?: string;
}

export const FormCategory = ({
  children,
  icon,
  title,
  description,
}: FormCategoryProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2">
          {icon}
          <h3>{title}</h3>
        </div>

        <p>{description}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

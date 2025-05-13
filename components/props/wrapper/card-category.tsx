import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
    <Card className="mb-3 border-0 shadow-none relative">
      <CardHeader className="border-b">
        <div className="flex space-x-3 items-center">
          <div className="p-2 rounded-full border border-muted-foreground">
            <span className="text-muted-foreground [&>svg]:size-4">{icon}</span>
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mt-2 flex items-center gap-1">
             
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

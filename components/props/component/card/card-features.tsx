import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CardFeaturesProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export const CardFeatures = ({
    icon,
    title,
    description
}: CardFeaturesProps) => {
    return (
      <Card className="hover:border-indigo-600 cursor-pointer transition-transform hover:scale-101 active:scale-100">
        <CardHeader>
          <div className="border rounded-full flex items-center size-max p-2 bg-indigo mb-2">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    );
}
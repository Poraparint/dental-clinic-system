import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserCardProps {
  avatar?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const UserCard = ({
  avatar,
  title,
  description,
  icon,
}: UserCardProps) => {
  return (
    <Card className="flex-row items-center gap-0 p-4">
      <Avatar className="size-12">
        <AvatarImage src={avatar} />
        <AvatarFallback>
          {icon}
        </AvatarFallback>
      </Avatar>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
       
      </CardContent>
    </Card>
  );
};

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface UserCardProps {
  avatar?: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export const UserCard = ({
  avatar,
  title,
  description,
  icon,
}: UserCardProps) => {
  return (
    <Card className="flex-row items-center gap-0 p-1 rounded-md cursor-pointer border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
      <Avatar className="size-7">
        <AvatarImage src={avatar} />
        {icon}
      </Avatar>
      <CardContent>
        <CardTitle className="text-xs p-0">{title}</CardTitle>
        <CardDescription className="text-[10px] p-0">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

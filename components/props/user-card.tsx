import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface UserCardProps {
  avatar?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  color?: string | "#cccccc";
  progressValue?: number;
}

export const UserCard = ({
  avatar,
  title,
  description,
  icon,
  color,
  progressValue,
}: UserCardProps) => {
  return (
    <Card className="flex-row items-center gap-0 p-4">
      <Avatar className="size-12">
        <AvatarImage src={avatar} />
        <AvatarFallback style={{ backgroundColor: color }}>
          {icon}
        </AvatarFallback>
      </Avatar>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {progressValue !== undefined && (
          <Progress
            value={progressValue}
            className="mt-2 h-2"
            style={{ backgroundColor: `${color}20` }}
          />
        )}
      </CardContent>
    </Card>
  );
};

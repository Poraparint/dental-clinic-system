import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils";
import { AlarmClock, Phone, Stethoscope } from "lucide-react";

interface DentalTechCardProp {
  avatar: string;
  name: string;
  phone: string;
  levelIcon?: React.ReactNode;
  level?: string;
  statusIcon?: React.ReactNode;
  status?: string;
  categoryName: string;
  detail?: string;
  teeth?: number;
  datetime: Date;
  creator?: string;
}

export const DentalTechCard = ({
  avatar,
  name,
  phone,
  levelIcon,
  level,
  statusIcon,
  status,
  categoryName,
  detail,
  teeth,
  datetime,
  creator,
}: DentalTechCardProp) => {
  return (
    <Card className="flex-col justify-between">
      <CardHeader className="border-b flex justify-between">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-2">
            <AvatarFallback>{avatar}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <CardTitle>{name}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Phone size={12} className="text-lapis-text"/>
              {phone}
            </CardDescription>
          </div>
        </div>
        {levelIcon && level && statusIcon && status && (
          <CardDescription className="flex gap-4">
            <div className="flex items-center gap-2">
              {levelIcon}
              {level}
            </div>
            <div className="flex items-center gap-2">
              {statusIcon}
              {status}
            </div>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex justify-between bg-primary-foreground p-3 rounded-md">
          <div className="space-y-2">
            <CardTitle>{categoryName}</CardTitle>
            {detail && (
              <Textarea
                value={detail}
                readOnly
                className="text-muted-foreground"
              />
            )}
          </div>
          <h3>{teeth} ซี่</h3>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <CardDescription className="flex items-center gap-2">
          <AlarmClock size={12} className="text-amber-text"/>
          กำหนดรับงาน :<span className="text-base">{formatDate(datetime)}</span>
        </CardDescription>
        <CardDescription className="flex items-center gap-2">
          <Stethoscope size={12} className="text-purple-500"/>
          ทันตแพทย์ :<span className="text-base">{creator}</span>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

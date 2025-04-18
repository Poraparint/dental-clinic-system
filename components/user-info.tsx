import { ExtendedUser } from "@/next-auth";

//ui
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ManagerInfoProps {
  manager?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ manager, label }: ManagerInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between truncate">
          <p>ID :</p>
          <p>{manager?.id}</p>
        </div>
        <div className="flex justify-between truncate">
          <p>Name :</p>
          <p>{manager?.name}</p>
        </div>
        <div className="flex justify-between truncate">
          <p>Email :</p>
          <p>{manager?.email}</p>
        </div>
        <div className="flex justify-between truncate">
          <p>Role :</p>
          <p>{manager?.role}</p>
        </div>
        <div className="flex justify-between truncate">
          <p>2FA :</p>
          <Badge
            variant={manager?.isTwoFactorEnabled ? "secondary" : "destructive"}
          >
            {manager?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

import { ExtendedUser } from "@/next-auth";

//ui
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between truncate">
          <p>ID :</p>
          <p>{user?.id}</p>
        </div>
        <div className="flex justify-between truncate">
          <p>Name :</p>
          <p>{user?.name}</p>
        </div>
        <div className="flex justify-between truncate">
          <p>Email :</p>
          <p>{user?.email}</p>
        </div>
        <div className="flex justify-between truncate">
          <p>Role :</p>
          <p>{user?.role}</p>
        </div>
        <div className="flex justify-between truncate">
          <p>2FA :</p>
          <Badge variant={user?.isTwoFactorEnabled ? "secondary" : "destructive"}>{user?.isTwoFactorEnabled ? "ON" : "OFF"}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

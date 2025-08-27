import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getBgRoleColor } from "@/lib/common/role-color";
import { User } from "lucide-react";

export const ProfileBoard = async () => {
  const user = await currentUser();
  return (
    <div>
      <div className="grid grid-cols-3 grid-rows-1 gap-2">
        <Card className="flex flex-row items-center">
          <div
            className={`rounded-full text-white md:flex size-10 justify-center items-center hidden ${getBgRoleColor(user.role)}`}
          >
            <User />
          </div>
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.role}</CardDescription>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </Card>
        <Card className="col-span-2">{/* สรุป */}</Card>
      </div>
      {/* Calendar component */}
    </div>
  );
};

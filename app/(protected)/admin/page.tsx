"use client";

//ui
import { Card, CardHeader, CardContent } from "@/components/ui/card";

import { RoleGate } from "@/components/props/role-gate";
import { CompanyRole } from "@prisma/client";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { admin } from "@/actions/company/manager/admin";

const AdminPage = () => {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
      }
    });
  };
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API route!");
      } else {
        toast.error("Forbidden API route!");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <p>Admin</p>
      </CardHeader>
      <CardContent>
        <RoleGate allowedRole={CompanyRole.MANAGER}>
          <FormSuccess message="Your are allowed to see this content!" />
        </RoleGate>
        <div className="flex justify-between p-3 border">
          <p>Admin-API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex justify-between p-3 border">
          <p>Admin-only Server action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;

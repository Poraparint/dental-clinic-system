import ErrorUI from "@/components/props/error-ui";
import { Card } from "@/components/ui/card";


export const PermissionDenied = () => {
  
  return (
    <Card>
      <ErrorUI type="permissionDenied" />
    </Card>
  );
};

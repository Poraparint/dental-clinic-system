"use client";

import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { DeletedPatientTable } from "@/components/companys/internal/profile/tabs/patient/patient";
import { useRefreshable } from "@/hooks";

export const RecoveryCard = () => {
    const { refreshKey, handleRefresh } = useRefreshable();
    
  return (
    <TabsContent value="recovery-data">
      <Card>
        <DeletedPatientTable
          refreshKey={refreshKey}
          handleRefresh={handleRefresh}
        />
      </Card>
    </TabsContent>
  );
};

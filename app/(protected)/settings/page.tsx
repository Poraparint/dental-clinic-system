"use client";

import { useTransition } from "react";
import { useSession } from "next-auth/react";

//ui
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";

const SettingsPage = () => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const onClick = () => {
    startTransition(() => {
      settings({
        name: "New Name",
      }).then(() => {
        update();
      });
    });
  };

  return (
    <Card>
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Settings</p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={onClick}>
          Update name
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;

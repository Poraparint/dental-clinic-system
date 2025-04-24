"use client";

import { useCurrentManagerRole, useCurrentMemberRole, useCurrentRole } from "@/hooks/use-current-role";


export default function Dashboard() {
const isManager = useCurrentManagerRole();
const isMember = useCurrentMemberRole();
const role = useCurrentRole();


  return (
    <div className="p-6">
      {isManager && "man"}
      {isMember && "member"}
      <p>ตำแหน่ง: {role}</p>
    </div>
  );
}

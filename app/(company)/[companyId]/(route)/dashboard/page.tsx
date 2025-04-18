import { UserInfo } from "@/components/user-info";
import { currentManager } from "@/lib/auth";

export default async function DashboardPage() {

  const manager = await currentManager();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Welcome to the Dashboard</h2>
      <UserInfo label="Client component" manager={manager} />

      {/* ตัวอย่างข้อมูลที่อาจจะโหลด */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded shadow">
          <h3 className="font-semibold text-lg">Todays Appointments</h3>
        </div>
        <div className="border p-4 rounded shadow">
          <h3 className="font-semibold text-lg">Revenue</h3>
          <p>$1,250 generated this week.</p>
        </div>
      </div>
    </div>
  );
}

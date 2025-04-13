export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Welcome to the Dashboard</h2>
      <p>This is your company-specific dashboard with tools and reports.</p>

      {/* ตัวอย่างข้อมูลที่อาจจะโหลด */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded shadow">
          <h3 className="font-semibold text-lg">Todays Appointments</h3>
          <p>3 appointments scheduled today.</p>
        </div>
        <div className="border p-4 rounded shadow">
          <h3 className="font-semibold text-lg">Revenue</h3>
          <p>$1,250 generated this week.</p>
        </div>
      </div>
    </div>
  );
}

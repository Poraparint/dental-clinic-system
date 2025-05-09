"use client";

import { useState } from "react";
import {
  Users,
  Calendar,
  DollarSign,
  Clock,
  AlertCircle,
  Smile,
  Bell,
  Search,
  Menu,
  UserPlus,
  CalendarPlus,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const mockAppointments = [
  {
    id: 1,
    patient: "สมชาย ใจดี",
    time: "09:00",
    category: "ทันตกรรมทั่วไป",
    status: "confirmed",
    avatar: "",
  },
  {
    id: 2,
    patient: "สมหญิง มีสุข",
    time: "10:30",
    category: "จัดฟัน",
    status: "confirmed",
    avatar: "",
  },
  {
    id: 3,
    patient: "วิชัย สุขสันต์",
    time: "13:00",
    category: "รักษารากฟัน",
    status: "pending",
    avatar: "",
  },
  {
    id: 4,
    patient: "นภา แสงดาว",
    time: "14:30",
    category: "ถอนฟัน",
    status: "confirmed",
    avatar: "",
  },
  {
    id: 5,
    patient: "สุดา ดวงดี",
    time: "16:00",
    category: "ทันตกรรมเพื่อความงาม",
    status: "pending",
    avatar: "",
  },
];

const mockRecentPatients = [
  {
    id: 1,
    name: "สมชาย ใจดี",
    lastVisit: "3 วันที่แล้ว",
    treatmentStatus: "กำลังรักษา",
    avatar: "",
  },
  {
    id: 2,
    name: "สมหญิง มีสุข",
    lastVisit: "1 สัปดาห์ที่แล้ว",
    treatmentStatus: "เสร็จสิ้น",
    avatar: "",
  },
  {
    id: 3,
    name: "วิชัย สุขสันต์",
    lastVisit: "2 สัปดาห์ที่แล้ว",
    treatmentStatus: "รอติดตาม",
    avatar: "",
  },
];

const mockFinancialStats = {
  totalRevenue: 145000,
  pendingPayments: 35000,
  expenseTotal: 68000,
  revenueByCategory: [
    { category: "ทันตกรรมทั่วไป", amount: 45000 },
    { category: "จัดฟัน", amount: 60000 },
    { category: "รักษารากฟัน", amount: 25000 },
    { category: "อื่นๆ", amount: 15000 },
  ],
};

const mockDentalTechItems = [
  {
    id: 1,
    patient: "สมชาย ใจดี",
    category: "ครอบฟัน",
    deadline: "15 พ.ค. 2025",
    status: "รอดำเนินการ",
  },
  {
    id: 2,
    patient: "สมหญิง มีสุข",
    category: "ฟันปลอม",
    deadline: "18 พ.ค. 2025",
    status: "กำลังดำเนินการ",
  },
  {
    id: 3,
    patient: "นภา แสงดาว",
    category: "รีเทนเนอร์",
    deadline: "12 พ.ค. 2025",
    status: "รอดำเนินการ",
  },
];

const mockRecheckItems = [
  {
    id: 1,
    patient: "วิชัย สุขสันต์",
    category: "หลังรักษารากฟัน",
    date: "10 พ.ค. 2025",
  },
  {
    id: 2,
    patient: "สุดา ดวงดี",
    category: "หลังถอนฟัน",
    date: "12 พ.ค. 2025",
  },
];

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen bg-gray-50">
      

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b flex justify-between items-center h-16 px-6">
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center ml-auto">
            <div className="relative mr-4">
              <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500" />
              <Input
                type="search"
                placeholder="ค้นหา..."
                className="w-64 pl-8 h-9"
              />
            </div>
            <Button variant="ghost" size="icon" className="mr-2">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>ทพ</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">แดชบอร์ด</h1>
              <p className="text-gray-500">ภาพรวมของคลินิกทันตกรรม</p>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center">
                <UserPlus className="mr-2 h-4 w-4" />
                เพิ่มผู้ป่วยใหม่
              </Button>
              <Button className="flex items-center">
                <CalendarPlus className="mr-2 h-4 w-4" />
                นัดหมายใหม่
              </Button>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
              <TabsTrigger value="financial">การเงิน</TabsTrigger>
              <TabsTrigger value="technical">ทันตกรรมเทคนิค</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats row */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      การนัดหมายวันนี้
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {mockAppointments.length}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +2 จากวันที่แล้ว
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      ผู้ป่วยที่รักษาอยู่
                    </CardTitle>
                    <Users className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +5 จากเดือนที่แล้ว
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      รายได้เดือนนี้
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ฿{mockFinancialStats.totalRevenue.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +12% จากเดือนที่แล้ว
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      นัดติดตาม
                    </CardTitle>
                    <Clock className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {mockRecheckItems.length}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      รอดำเนินการ
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Appointments and patients */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>การนัดหมายวันนี้</CardTitle>
                    <CardDescription>วันที่ 8 พฤษภาคม 2568</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockAppointments.slice(0, 4).map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback>
                                {appointment.patient.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {appointment.patient}
                              </p>
                              <p className="text-xs text-gray-500">
                                {appointment.time} - {appointment.category}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              appointment.status === "confirmed"
                                ? "default"
                                : "outline"
                            }
                          >
                            {appointment.status === "confirmed"
                              ? "ยืนยันแล้ว"
                              : "รอยืนยัน"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4 text-sm">
                      ดูการนัดหมายทั้งหมด
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>ผู้ป่วยล่าสุด</CardTitle>
                    <CardDescription>
                      ผู้ป่วยที่เข้ารับการรักษาล่าสุด
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockRecentPatients.map((patient) => (
                        <div
                          key={patient.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback>
                                {patient.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {patient.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                เข้ารับการรักษาเมื่อ {patient.lastVisit}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              patient.treatmentStatus === "กำลังรักษา"
                                ? "text-blue-500 border-blue-200 bg-blue-50"
                                : patient.treatmentStatus === "เสร็จสิ้น"
                                  ? "text-green-500 border-green-200 bg-green-50"
                                  : "text-amber-500 border-amber-200 bg-amber-50"
                            }
                          >
                            {patient.treatmentStatus}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4 text-sm">
                      ดูผู้ป่วยทั้งหมด
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Reminders & Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>การแจ้งเตือนและติดตาม</CardTitle>
                  <CardDescription>
                    รายการที่ต้องติดตามและแจ้งเตือน
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 border rounded-lg bg-amber-50 border-amber-200">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">
                          วัสดุทันตกรรมใกล้หมด
                        </p>
                        <p className="text-xs text-gray-500">
                          ซีเมนต์สำหรับครอบฟัน และวัสดุอุดฟันเหลือน้อยกว่า 20%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 border rounded-lg bg-blue-50 border-blue-200">
                      <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">
                          นัดติดตามวันพรุ่งนี้
                        </p>
                        <p className="text-xs text-gray-500">
                          มีผู้ป่วย 3 คนที่มีการนัดติดตามในวันพรุ่งนี้
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 border rounded-lg bg-green-50 border-green-200">
                      <Smile className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">ทันตกรรมเทคนิค</p>
                        <p className="text-xs text-gray-500">
                          งานครอบฟันของคุณสมชาย ใจดี เสร็จเรียบร้อยแล้ว
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              {/* Financial overview */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>รายรับทั้งหมด</CardTitle>
                    <CardDescription>รายรับทั้งหมดในเดือนนี้</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      ฿{mockFinancialStats.totalRevenue.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-500 mt-1 font-medium">
                      +12% จากเดือนที่แล้ว
                    </div>
                    <Progress value={75} className="mt-4" />
                    <div className="text-xs text-gray-500 mt-2">
                      75% ของเป้าหมายเดือนนี้
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>ยอดค้างชำระ</CardTitle>
                    <CardDescription>ยอดรวมที่ยังไม่ได้รับชำระ</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      ฿{mockFinancialStats.pendingPayments.toLocaleString()}
                    </div>
                    <div className="text-xs text-amber-500 mt-1 font-medium">
                      จาก 14 รายการ
                    </div>
                    <Progress value={35} className="mt-4" />
                    <div className="text-xs text-gray-500 mt-2">
                      35% ของรายรับทั้งหมด
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>ค่าใช้จ่าย</CardTitle>
                    <CardDescription>
                      ค่าใช้จ่ายทั้งหมดในเดือนนี้
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      ฿{mockFinancialStats.expenseTotal.toLocaleString()}
                    </div>
                    <div className="text-xs text-blue-500 mt-1 font-medium">
                      -5% จากเดือนที่แล้ว
                    </div>
                    <Progress value={47} className="mt-4" />
                    <div className="text-xs text-gray-500 mt-2">
                      47% ของรายรับ
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Revenue by category */}
              <Card>
                <CardHeader>
                  <CardTitle>รายได้ตามประเภท</CardTitle>
                  <CardDescription>
                    สัดส่วนรายได้แยกตามประเภทการรักษา
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockFinancialStats.revenueByCategory.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">
                            {item.category}
                          </div>
                          <div className="text-sm">
                            ฿{item.amount.toLocaleString()}
                          </div>
                        </div>
                        <Progress
                          value={
                            (item.amount / mockFinancialStats.totalRevenue) *
                            100
                          }
                          className={
                            index === 0
                              ? "h-2 bg-blue-100"
                              : index === 1
                                ? "h-2 bg-emerald-100"
                                : index === 2
                                  ? "h-2 bg-violet-100"
                                  : "h-2 bg-amber-100"
                          }
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technical" className="space-y-6">
              {/* Dental Tech Overview */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      รอดำเนินการ
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      2 รายการเร่งด่วน
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      กำลังดำเนินการ
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      4 รายการใกล้เสร็จ
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      เสร็จแล้วรอส่งมอบ
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      รอการยืนยันการนัดหมาย
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Dental Tech List */}
              <Card>
                <CardHeader>
                  <CardTitle>รายการงานทันตกรรมเทคนิค</CardTitle>
                  <CardDescription>รายการงานที่ต้องติดตาม</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left">ผู้ป่วย</th>
                            <th className="px-4 py-3 text-left">ประเภท</th>
                            <th className="px-4 py-3 text-left">กำหนดส่ง</th>
                            <th className="px-4 py-3 text-left">สถานะ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockDentalTechItems.map((item) => (
                            <tr key={item.id} className="border-t">
                              <td className="px-4 py-3">{item.patient}</td>
                              <td className="px-4 py-3">{item.category}</td>
                              <td className="px-4 py-3">{item.deadline}</td>
                              <td className="px-4 py-3">
                                <Badge
                                  variant="outline"
                                  className={
                                    item.status === "รอดำเนินการ"
                                      ? "text-amber-500 border-amber-200 bg-amber-50"
                                      : item.status === "กำลังดำเนินการ"
                                        ? "text-blue-500 border-blue-200 bg-blue-50"
                                        : "text-green-500 border-green-200 bg-green-50"
                                  }
                                >
                                  {item.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Button variant="ghost" className="w-full mt-2 text-sm">
                      ดูรายการทั้งหมด
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recheck List */}
              <Card>
                <CardHeader>
                  <CardTitle>รายการนัดติดตาม</CardTitle>
                  <CardDescription>
                    รายการนัดติดตามที่กำลังจะถึง
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecheckItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>
                              {item.patient.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {item.patient}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.category}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-3">
                            {item.date}
                          </Badge>
                          <Button size="sm" variant="outline">
                            ยืนยัน
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="ghost" className="w-full mt-2 text-sm">
                      ดูรายการทั้งหมด
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

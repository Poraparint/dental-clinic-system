import {
    Aperture,
  CheckCircle2,
  Clock,
  Flame,
  Gauge,
  LampDesk,
  Timer,
  UserCheck,
} from "lucide-react";

export function renderStatusIcon(status: string) {
    switch (status) {
      case "รอดำเนินการ":
        return <Clock className="size-4 text-yellow-600" />;
      case "รับงานเรียบร้อย":
        return <UserCheck className="size-4 text-blue-600" />;
      case "เสร็จสิ้น":
        return <CheckCircle2 className="size-4 text-green-600" />;
      case "รอยืนยัน":
        return <LampDesk className="size-4 text-purple-600" />;
      case "ยืนยันแล้ว":
        return <LampDesk className="size-4 text-green-600" />;
      default:
        return null;
    }
}

export function renderLevelIcon(level: string) {
    switch (level) {
      case "ทั้งหมด":
        return <Aperture className="size-4 text-muted-foreground" />;
      case "ปกติ":
        return <Gauge className="size-4 text-blue-500" />;
      case "เร่งด่วน":
        return <Timer className="size-4 text-orange-500" />;
      case "ด่วนมาก":
        return <Flame className="size-4 text-red-500" />;
      default:
        return null;
    }
}

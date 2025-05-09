import { formatDate } from "@/lib/utils";
import { Banknote, Calendar, CalendarCheck, CheckCircle } from "lucide-react";

interface UpComingCardUiProps{
    datetime?: Date | null;
    detail?: string;
    price?: number;
}

export const UpComingCardUi = ({
    datetime = null,
    detail= "",
    price = 0
}: UpComingCardUiProps) => {
    if (!datetime) {
      return (
        <div className="mt-3 rounded-lg text-sm p-3 border flex items-center justify-between bg-green-50">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            <span className="text-green-700">เสร็จสิ้นแล้ว</span>
          </div>
          <div className="text-muted-foreground text-sm">{detail}</div>
        </div>
      );
    }
    
    return (
        <div className="mt-3 rounded-lg text-sm p-3 border flex justify-between">
            <div>
                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                    <CalendarCheck size={16} />
                    <span className="font-medium">นัดหมายถัดไป</span>
                </div>
                <p>{formatDate(datetime)}</p>
            </div>
            <div className="pl-6 space-y-1">
                <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-muted-foreground" />
                    <span>{detail}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Banknote size={14} className="text-muted-foreground" />
                    <span>{price}</span>
                </div>
            </div>
        </div>
    );
}
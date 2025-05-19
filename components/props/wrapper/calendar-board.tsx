"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";
import { MinimalCalendar } from "@/components/ui/minimalcalendar";
import { RefreshButton } from "@/components/props/component/button/refresh-button";


interface ItemWithStatus {
  status?: "รอดำเนินการ" | "รับงานเรียบร้อย" | "เสร็จสิ้น" | string;
  [key: string]: unknown;
}

interface CalendarBoardProps<T extends ItemWithStatus> {
  data?: T[] | undefined;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  onRefresh: () => void;
  isLoading: boolean;
  isRefreshing: boolean;
  getDateFromItem: (item: T) => Date;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
}

function CalendarBoard<T extends ItemWithStatus> ({
    data,
    date,
    onDateChange,
    onRefresh,
    isLoading,
    isRefreshing,
    getDateFromItem,
    children,
    headerActions,
}: CalendarBoardProps<T>) { 
    return (
      <Card className="w-full">
        <CardContent className="p-0">
          <div className="md:flex space-y-2">
            <div className="md:w-4/6 px-3 relative">
              <MinimalCalendar
                data={data}
                getDate={getDateFromItem}
                selected={date}
                onSelect={onDateChange}
              />
              <div className="absolute top-1 right-4 flex gap-2">
                <RefreshButton
                  onClick={onRefresh}
                  isLoading={isLoading}
                  isRefreshing={isRefreshing}
                />
                {headerActions}
              </div>
            </div>
            <div className="p-6 space-y-4 md:w-2/6">
              <div className="flex items-center">
                <div className="flex gap-2">
                  <CalendarClock className="text-muted-foreground" />
                  <h3 className="text-xl font-medium">
                    {date
                      ? date.toLocaleDateString("th-TH", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "เลือกวันที่"}
                  </h3>
                </div>
              </div>
              {children}
            </div>
          </div>
        </CardContent>
      </Card>
    );
}
 
export { CalendarBoard, type ItemWithStatus };
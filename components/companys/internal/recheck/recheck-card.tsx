"use client";

import { useParams } from "next/navigation";
import { useRechecks } from "@/hooks/internal/use-recheck";
import { formatDate } from "@/lib/utils";
import { Loading } from "@/components/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  Banknote,
  Calendar,
  CalendarCheck,
  Clock,
} from "lucide-react";
import { RecheckCardUi } from "@/components/props/component/recheck-card-ui";

interface RecheckList {
  datetime: Date;
  detail: string;
  price: number;
  transactionCategory: {
    name: string;
  };
}

export const RecheckCard = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const { rechecks, isLoading } = useRechecks(companyId);

  const getUpComingDate = (recheckList: RecheckList[]) => {
    if (!recheckList || recheckList.length < 1) return null;

    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const upComingDates = recheckList
      .map((item) => ({
        ...item,
        datetime: new Date(item.datetime),
      }))
      .filter((item) => {
        const itemDate = new Date(
          item.datetime.getFullYear(),
          item.datetime.getMonth(),
          item.datetime.getDate()
        );
        return itemDate >= startOfToday;
      })
      .sort((a, b) => a.datetime.getTime() - b.datetime.getTime());

    return upComingDates.length > 0 ? upComingDates[0] : null;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {rechecks.map((recheck) => {
        const upComingDate = getUpComingDate(recheck.recheckList);

        return (
          <Drawer key={recheck.id}>
            <DrawerTrigger asChild>
              <RecheckCardUi
                name={recheck.patient.name}
                createdAt={recheck.createdAt}
                phone={recheck.patient.phone}
                creator={recheck.creator.name}
                transaction={recheck.transaction.transactionCategory.name}
              >
                {upComingDate && (
                  <div className="mt-3 rounded-lg text-sm p-3 border flex justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                        <CalendarCheck size={16} />
                        <span className="font-medium">นัดหมายถัดไป</span>
                      </div>
                      <p>{formatDate(upComingDate.datetime)}</p>
                    </div>
                    <div className="pl-6 space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-muted-foreground" />
                        <span>{upComingDate.detail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Banknote size={14} className="text-muted-foreground" />
                        <span>{upComingDate.price}</span>
                      </div>
                    </div>
                  </div>
                )}
              </RecheckCardUi>
            </DrawerTrigger>

            {/* Drawer content */}
            <DrawerContent className="max-h-[90vh] overflow-hidden rounded-t-xl">
              <DrawerHeader>
                <DrawerTitle>
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="size-5" />
                    ประวัติการนัดหมาย
                  </div>
                </DrawerTitle>
                <DrawerDescription>
                  รายการทั้งหมดของ <strong>{recheck.patient.name}</strong>
                </DrawerDescription>
              </DrawerHeader>

              <ScrollArea className="h-[60vh] px-4">
                <div className="grid gap-3 pb-4">
                  {[...recheck.recheckList]
                    .sort(
                      (a, b) =>
                        new Date(b.datetime).getTime() -
                        new Date(a.datetime).getTime()
                    )
                    .map((item, idx) => {
                      const appointmentDate = new Date(item.datetime);
                      const today = new Date();

                      const isToday =
                        appointmentDate.getFullYear() === today.getFullYear() &&
                        appointmentDate.getMonth() === today.getMonth() &&
                        appointmentDate.getDate() === today.getDate();

                      const isFuture = appointmentDate > today;

                      return (
                        <div
                          key={idx}
                          className="flex items-center space-x-3 p-3 border-b hover:bg-background/90 transition-colors"
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isToday
                                ? " bg-indigo"
                                : isFuture
                                  ? " bg-emerald-700"
                                  : " bg-muted-foreground/80"
                            }`}
                          >
                            <Clock className="size-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                              {formatDate(item.datetime)}
                            </p>
                            <div className="flex items-center justify-between text-sm">
                              <div className="text-muted-foreground">
                                <p>{item.transactionCategory.name}</p>
                                <p>{item.detail}</p>
                              </div>
                              <p>฿ {item.price}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        );
      })}
    </div>
  );
};

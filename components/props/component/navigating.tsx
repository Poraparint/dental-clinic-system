import { Loader } from "lucide-react";

export const NavigatingUi = () => {
    return (
      <div className="fixed inset-0 bg-background/80 z-50 flex items-center gap-3 justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">กำลังโหลดข้อมูล...</p>
      </div>
    );
}
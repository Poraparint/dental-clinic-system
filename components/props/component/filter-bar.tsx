import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { renderLevelIcon } from "@/components/props/render/render-icons";
import { Funnel } from "lucide-react";

interface FilterBarProps {
  onStatusChange: (status: string) => void;
  onLevelChange: (level: string) => void;
}

export const FilterBar = ({
  onStatusChange,
  onLevelChange,
}: FilterBarProps) => {


  return (
    <div className="flex flex-wrap justify-between gap-4">
      <Tabs defaultValue="ทั้งหมด" onValueChange={onStatusChange}>
        <TabsList>
          <TabsTrigger value="ทั้งหมด">ทั้งหมด</TabsTrigger>
          <TabsTrigger value="รอดำเนินการ">รอดำเนินการ</TabsTrigger>
          <TabsTrigger value="รับงานเรียบร้อย">รับงานแล้ว</TabsTrigger>
          <TabsTrigger value="เสร็จสิ้น">เสร็จสิ้น</TabsTrigger>
        </TabsList>
      </Tabs>

      <Select defaultValue="ทั้งหมด" onValueChange={onLevelChange}>
        <SelectTrigger className="w-[180px] [&>svg:last-child]:hidden relative pr-10">
          <SelectValue placeholder="ระดับความเร่งด่วน" />
          <Funnel className="absolute right-3 top-1/2 -translate-y-1/2 size-4" />
        </SelectTrigger>
        <SelectContent>
          {["ทั้งหมด", "ปกติ", "เร่งด่วน", "ด่วนมาก"].map((lvl) => (
            <SelectItem key={lvl} value={lvl}>
              <div className="flex items-center gap-2">
                {renderLevelIcon(lvl)}
                {lvl}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

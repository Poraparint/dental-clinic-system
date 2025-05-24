import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Period } from "@/lib/utils/stat/stat";

type Props = {
  period: Period;
  onChange: (value: Period) => void;
};

export const PeriodTabs = ({ period, onChange }: Props) => {
  return (
    <Tabs value={period} onValueChange={(value) => onChange(value as Period)}>
      <TabsList className="grid grid-cols-3 w-fit">
        <TabsTrigger value="month">เดือน</TabsTrigger>
        <TabsTrigger value="week">สัปดาห์</TabsTrigger>
        <TabsTrigger value="year">ปี</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

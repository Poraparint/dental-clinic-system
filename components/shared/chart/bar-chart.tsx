"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { CategoryChartItem } from "@/lib/utils/stat/stat";

const colors = [
  "#3b78d8", // จาก #5d9cec → ฟ้าเข้มขึ้น
  "#ff6f7d", // จาก #ff9aa2 → ชมพูเข้ม
  "#5cb85c", // จาก #96e6a1 → เขียวเข้ม
  "#ff8c00", // จาก #ffb347 → ส้มเข้ม
  "#ffd700", // จาก #ffef96 → เหลืองทองเข้ม
  "#7c3aed", // จาก #a78bfa → ม่วงเข้ม
  "#3b5998", // จาก #7aa3e5 → น้ำเงินเข้ม
  "#43a047", // จาก #9be7a8 → เขียวป่า
];


interface Props {
  data: CategoryChartItem[];
  unit?: string;
}

export const CategoryBarChart = ({ data, unit="บาท" }: Props) => {
  if (!data) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 10, right: 30, bottom: 10, left: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          type="category"
          dataKey="category"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          width={100}
        />
        <Tooltip
          contentStyle={{ borderRadius: 8, fontSize: 13 }}
          formatter={(value: number) => `${value.toLocaleString()} ${unit}`}
        />
        <Bar dataKey="total" radius={[0, 6, 6, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color || colors[index % colors.length]}
            />
          ))}
          <LabelList
            dataKey="total"
            position="right"
            style={{ fontSize: 12, fontWeight: 500 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

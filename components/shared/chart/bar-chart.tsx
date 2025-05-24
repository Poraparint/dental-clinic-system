"use client";

import { CategoryChartItem } from "@/lib/utils/stat/stat";
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

interface Props {
  data: CategoryChartItem[];
}

const colors = [
  "#5d9cec", 
  "#ff9aa2", 
  "#96e6a1", 
  "#ffb347", 
  "#ffef96", 
  "#a78bfa", 
  "#7aa3e5", 
  "#9be7a8",
];

export const CategoryBarChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
      >
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis
          type="number"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          type="category"
          dataKey="category"
          width={140}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 14, fontWeight: 500 }}
        />
        <Tooltip
          cursor={{ fill: "rgba(0,0,0,0.05)" }}
          contentStyle={{ borderRadius: 8, fontSize: 13 }}
          formatter={(value: number) => `${value.toLocaleString()} บาท`}
        />
        <Bar dataKey="total" radius={[6, 6, 6, 6]}>
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

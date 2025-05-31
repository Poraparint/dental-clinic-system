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
  "#5d9cec",
  "#ff9aa2",
  "#96e6a1",
  "#ffb347",
  "#ffef96",
  "#a78bfa",
  "#7aa3e5",
  "#9be7a8",
];

interface Props {
  data: CategoryChartItem[];
}

export const CategoryBarChart = ({ data }: Props) => {
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
          formatter={(value: number) => `${value.toLocaleString()} บาท`}
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

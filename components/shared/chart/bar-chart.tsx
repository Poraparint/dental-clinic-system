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
  return (
    
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, bottom: 30, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              interval={0}
            />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              contentStyle={{ borderRadius: 8, fontSize: 13 }}
              formatter={(value: number) => `${value.toLocaleString()} บาท`}
            />
            <Bar dataKey="total" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || colors[index % colors.length]}
                />
              ))}
              <LabelList
                dataKey="total"
                position="top"
                style={{ fontSize: 12, fontWeight: 500 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      
  );
};

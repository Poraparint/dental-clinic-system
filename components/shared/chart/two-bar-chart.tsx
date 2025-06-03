import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface ComparisonItem {
  month: string; // หรือใช้เป็น 'year' ก็ได้
  revenue: number;
  expenses: number;
  profit: number;
}

interface RevenueExpenseComparisonChartProps {
  data: ComparisonItem[];
  title?: string;
  description?: string;
  height?: number;
}


export const RevenueExpenseComparisonChart = ({
  data,
  title = "เปรียบเทียบรายรับและรายจ่าย",
  description = "แสดงข้อมูลเปรียบเทียบรายรับ รายจ่าย และกำไรสุทธิ",
  height = 400,
}: RevenueExpenseComparisonChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">{title}</CardTitle>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <YAxis
              tickFormatter={(value) => formatCurrency(value).replace("฿", "")}
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              labelClassName="font-semibold text-muted-foreground"
            />

            <Legend wrapperStyle={{ fontSize: "14px" }} iconType="rect" />
            <Bar
              dataKey="revenue"
              name="รายรับ"
              fill="#3b82f6"
              radius={[2, 2, 0, 0]}
              className="hover:opacity-80 transition-opacity"
            />
            <Bar
              dataKey="expenses"
              name="รายจ่าย"
              fill="#f97316"
              radius={[2, 2, 0, 0]}
              className="hover:opacity-80 transition-opacity"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

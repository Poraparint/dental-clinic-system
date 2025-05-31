import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
  subMonths,
  subWeeks,
  subYears,
  format,
  eachMonthOfInterval,
} from "date-fns";

export type Period = "month" | "week" | "year";

export interface PeriodData<T> {
  current: T[];
  previous: T[];
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  previousPeriodStart: Date;
  previousPeriodEnd: Date;
}

export interface ComparisonResult {
  currentValue: number;
  previousValue: number;
  percentChange: number;
  isPositive: boolean;
  compareLabel: string;
}

export type CategoryChartItem = {
  category: string;
  total: number;
  color?: string;
};

export interface ProfitResult extends ComparisonResult {
  netProfit: number;
  revenue: number;
  expenses: number;
}

export interface MonthlyComparisonItem {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

function getValueByPath<T>(obj: T, path: string): unknown {
  return path.split(".").reduce((acc, key) => {
    if (typeof acc === "object" && acc !== null && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
}

/**
 * คำนวณช่วงเวลาเริ่มต้นและสิ้นสุดของช่วงเวลาปัจจุบันและก่อนหน้า
 */

export const getPeriodRanges = (
  period: Period,
  referenceDate: Date = new Date()
) => {
  const current = {
    start: new Date(),
    end: new Date(),
  };
  const previous = {
    start: new Date(),
    end: new Date(),
  };

  switch (period) {
    case "month":
      current.start = startOfMonth(referenceDate);
      current.end = endOfMonth(referenceDate);
      previous.start = startOfMonth(subMonths(referenceDate, 1));
      previous.end = endOfMonth(subMonths(referenceDate, 1));
      break;
    case "week":
      current.start = startOfWeek(referenceDate, { weekStartsOn: 1 }); 
      current.end = endOfWeek(referenceDate, { weekStartsOn: 1 });
      previous.start = startOfWeek(subWeeks(referenceDate, 1), {
        weekStartsOn: 1,
      });
      previous.end = endOfWeek(subWeeks(referenceDate, 1), { weekStartsOn: 1 });
      break;
    case "year":
      current.start = startOfYear(referenceDate);
      current.end = endOfYear(referenceDate);
      previous.start = startOfYear(subYears(referenceDate, 1));
      previous.end = endOfYear(subYears(referenceDate, 1));
      break;
  }

  return { current, previous };
};

/**
 * กรองข้อมูลตามช่วงวันที่ที่กำหนด
 */
export const filterDataByDateRange = <T>(
  data: T[],
  startDate: Date,
  endDate: Date,
  dateField: keyof T
): T[] => {
  return data.filter((item) => {
    const itemDate = new Date(item[dateField] as string);
    return itemDate >= startDate && itemDate <= endDate;
  });
};

/**
 * จัดกลุ่มข้อมูลตามช่วงเวลาปัจจุบันและก่อนหน้า
 */
export const getPeriodData = <T>(
  data: T[],
  period: Period,
  dateField: keyof T,
  referenceDate: Date = new Date()
): PeriodData<T> => {
  const { current, previous } = getPeriodRanges(period, referenceDate);

  return {
    current: filterDataByDateRange(data, current.start, current.end, dateField),
    previous: filterDataByDateRange(
      data,
      previous.start,
      previous.end,
      dateField
    ),
    currentPeriodStart: current.start,
    currentPeriodEnd: current.end,
    previousPeriodStart: previous.start,
    previousPeriodEnd: previous.end,
  };
};

/**
 * คำนวณการเปลี่ยนแปลงเป็นเปอร์เซ็นต์
 */
export const calculatePercentChange = (
  current: number,
  previous: number
): number => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return Math.round(((current - previous) / previous) * 100);
};

/**
 * ส่งกลับข้อความภาษาไทยสำหรับช่วงเวลาก่อนหน้า
 */
export const getPeriodLabel = (period: Period): string => {
  const labels = {
    month: "เดือนที่แล้ว",
    week: "สัปดาห์ที่แล้ว",
    year: "ปีที่แล้ว",
  };
  return labels[period];
};

/**
 * Calculate total revenue comparison
 */
export const calculateRevenueComparison = <T>(
  data: T[],
  period: Period,
  dateField: keyof T,
  priceField: keyof T,
  referenceDate?: Date
): ComparisonResult => {
  const periodData = getPeriodData(data, period, dateField, referenceDate);

  const currentValue = periodData.current.reduce(
    (sum, item) => sum + (Number(item[priceField]) || 0),
    0
  );

  const previousValue = periodData.previous.reduce(
    (sum, item) => sum + (Number(item[priceField]) || 0),
    0
  );

  const percentChange = calculatePercentChange(currentValue, previousValue);

  return {
    currentValue,
    previousValue,
    percentChange,
    isPositive: percentChange >= 0,
    compareLabel: getPeriodLabel(period),
  };
};

/**
 * เปรียบเทียบจำนวนนับ (เช่น จำนวนผู้ป่วย, จำนวนธุรกรรม)
 */
export const calculateCountComparison = <T>(
  data: T[],
  period: Period,
  dateField: keyof T,
  referenceDate?: Date
): ComparisonResult => {
  const periodData = getPeriodData(data, period, dateField, referenceDate);

  const currentValue = periodData.current.length;
  const previousValue = periodData.previous.length;
  const percentChange = calculatePercentChange(currentValue, previousValue);

  return {
    currentValue,
    previousValue,
    percentChange,
    isPositive: percentChange >= 0,
    compareLabel: getPeriodLabel(period),
  };
};

/**
 * เปรียบเทียบค่าเฉลี่ยระหว่างช่วงเวลา
 */
export const calculateAverageComparison = <T>(
  data: T[],
  period: Period,
  dateField: keyof T,
  valueField: keyof T,
  referenceDate?: Date
): ComparisonResult => {
  const periodData = getPeriodData(data, period, dateField, referenceDate);

  const currentSum = periodData.current.reduce(
    (sum, item) => sum + (Number(item[valueField]) || 0),
    0
  );
  const currentAvg =
    periodData.current.length > 0 ? currentSum / periodData.current.length : 0;

  const previousSum = periodData.previous.reduce(
    (sum, item) => sum + (Number(item[valueField]) || 0),
    0
  );
  const previousAvg =
    periodData.previous.length > 0
      ? previousSum / periodData.previous.length
      : 0;

  const percentChange = calculatePercentChange(currentAvg, previousAvg);

  return {
    currentValue: Math.round(currentAvg),
    previousValue: Math.round(previousAvg),
    percentChange,
    isPositive: percentChange >= 0,
    compareLabel: getPeriodLabel(period),
  };
};

/**
 * รวมยอดของหมวดหมู่
 */
export const getCategoryTotals = <T>(
  data: T[],
  period: Period,
  dateField: keyof T,
  categoryField: string,
  priceField: keyof T,
  referenceDate?: Date
): CategoryChartItem[] => {
  const periodData = getPeriodData(
    data,
    period,
    dateField,
    referenceDate
  ).current;

  const categoryTotals = periodData.reduce(
    (acc, item) => {
      const category = String(getValueByPath(item, categoryField));
      const price = Number(item[priceField]) || 0;
      acc[category] = (acc[category] || 0) + price;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(categoryTotals).map(([category, total]) => ({
    category,
    total: Math.round(total),
  }));
};

/**
 * หาหมวดหมู่ที่มีรายได้สูงสุดและเปรียบเทียบกับช่วงเวลาก่อนหน้า
 */
export const getTopCategoryComparison = <T>(
  data: T[],
  period: Period,
  dateField: keyof T,
  categoryField: string,
  priceField: keyof T,
  referenceDate?: Date
): ComparisonResult & { categoryName: string } => {
  const periodData = getPeriodData(data, period, dateField, referenceDate);

  // หมวดหมู่รายได้ปัจจุบัน
  const currentCategoryTotals = periodData.current.reduce(
    (acc, item) => {
      const category = String(getValueByPath(item, categoryField));
      const price = Number(item[priceField]) || 0;
      acc[category] = (acc[category] || 0) + price;
      return acc;
    },
    {} as Record<string, number>
  );

  const currentTopCategory = Object.entries(currentCategoryTotals).sort(
    ([, a], [, b]) => b - a
  )[0];


  const previousCategoryTotal = periodData.previous
    .filter(
      (item) =>
        String(getValueByPath(item, categoryField)) === currentTopCategory?.[0]
    )
    .reduce((sum, item) => sum + (Number(item[priceField]) || 0), 0);

  const currentValue = currentTopCategory?.[1] || 0;
  const previousValue = previousCategoryTotal;
  const percentChange = calculatePercentChange(currentValue, previousValue);

  return {
    currentValue: Math.round(currentValue),
    previousValue: Math.round(previousValue),
    percentChange,
    isPositive: percentChange >= 0,
    compareLabel: getPeriodLabel(period),
    categoryName: currentTopCategory?.[0] || "ไม่มีข้อมูล",
  };
};

/**
 * คำนวณกำไรสุทธิโดยเปรียบเทียบระหว่างช่วงเวลา
 */
export const calculateProfitComparison = <T, E>(
  transactions: T[],
  expenses: E[],
  period: Period,
  transactionDateField: keyof T,
  transactionAmountField: keyof T,
  expenseDateField: keyof E,
  expenseAmountField: keyof E,
  referenceDate?: Date
): ProfitResult => {
  // คำนวณรายได้
  const revenueData = getPeriodData(transactions, period, transactionDateField, referenceDate);
  const currentRevenue = revenueData.current.reduce(
    (sum, item) => sum + (Number(item[transactionAmountField]) || 0),
    0
  );
  const previousRevenue = revenueData.previous.reduce(
    (sum, item) => sum + (Number(item[transactionAmountField]) || 0),
    0
  );

  // คำนวณรายจ่าย
  const expensesData = getPeriodData(expenses, period, expenseDateField, referenceDate);
  const currentExpenses = expensesData.current.reduce(
    (sum, item) => sum + (Number(item[expenseAmountField]) || 0),
    0
  );
  const previousExpenses = expensesData.previous.reduce(
    (sum, item) => sum + (Number(item[expenseAmountField]) || 0),
    0
  );

  // คำนวณกำไรสุทธิ
  const currentNetProfit = currentRevenue - currentExpenses;
  const previousNetProfit = previousRevenue - previousExpenses;
  const percentChange = calculatePercentChange(currentNetProfit, previousNetProfit);

  return {
    currentValue: currentNetProfit,
    previousValue: previousNetProfit,
    percentChange,
    isPositive: percentChange >= 0,
    compareLabel: getPeriodLabel(period),
    netProfit: currentNetProfit,
    revenue: currentRevenue,
    expenses: currentExpenses,
  };
};

/**
 * คำนวณข้อมูลรายรับ รายจ่าย และกำไรแยกตามเดือน
 */
export const getMonthlyRevenueExpenseComparison = <T, E>(
  transactions: T[],
  expenses: E[],
  transactionDateField: keyof T,
  transactionAmountField: keyof T,
  expenseDateField: keyof E,
  expenseAmountField: keyof E,
  monthsBack: number = 6, // จำนวนเดือนย้อนหลังที่ต้องการ
  referenceDate: Date = new Date()
): MonthlyComparisonItem[] => {
  // สร้างช่วงเดือนที่จะแสดง
  const endDate = endOfMonth(referenceDate);
  const startDate = startOfMonth(subMonths(referenceDate, monthsBack - 1));
  
  const months = eachMonthOfInterval({
    start: startDate,
    end: endDate,
  });

  return months.map((monthDate) => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);

    // คำนวณรายรับของเดือนนี้
    const monthlyRevenue = transactions
      .filter((item) => {
        const itemDate = new Date(item[transactionDateField] as string);
        return itemDate >= monthStart && itemDate <= monthEnd;
      })
      .reduce((sum, item) => sum + (Number(item[transactionAmountField]) || 0), 0);

    // คำนวณรายจ่ายของเดือนนี้
    const monthlyExpenses = expenses
      .filter((item) => {
        const itemDate = new Date(item[expenseDateField] as string);
        return itemDate >= monthStart && itemDate <= monthEnd;
      })
      .reduce((sum, item) => sum + (Number(item[expenseAmountField]) || 0), 0);

    // คำนวณกำไรสุทธิ
    const profit = monthlyRevenue - monthlyExpenses;

    return {
      month: format(monthDate, "MMM yyyy"), // เช่น "Jan 2024"
      revenue: Math.round(monthlyRevenue),
      expenses: Math.round(monthlyExpenses),
      profit: Math.round(profit),
    };
  });
};

/**
 * คำนวณข้อมูลรายรับ รายจ่าย แยกตามปี
 */
export const getYearlyRevenueExpenseComparison = <T, E>(
  transactions: T[],
  expenses: E[],
  transactionDateField: keyof T,
  transactionAmountField: keyof T,
  expenseDateField: keyof E,
  expenseAmountField: keyof E,
  yearsBack: number = 3,
  referenceDate: Date = new Date()
): MonthlyComparisonItem[] => {
  const years = [];
  for (let i = yearsBack - 1; i >= 0; i--) {
    years.push(subYears(referenceDate, i));
  }

  return years.map((yearDate) => {
    const yearStart = startOfYear(yearDate);
    const yearEnd = endOfYear(yearDate);

    // คำนวณรายรับของปีนี้
    const yearlyRevenue = transactions
      .filter((item) => {
        const itemDate = new Date(item[transactionDateField] as string);
        return itemDate >= yearStart && itemDate <= yearEnd;
      })
      .reduce((sum, item) => sum + (Number(item[transactionAmountField]) || 0), 0);

    // คำนวณรายจ่ายของปีนี้
    const yearlyExpenses = expenses
      .filter((item) => {
        const itemDate = new Date(item[expenseDateField] as string);
        return itemDate >= yearStart && itemDate <= yearEnd;
      })
      .reduce((sum, item) => sum + (Number(item[expenseAmountField]) || 0), 0);

    const profit = yearlyRevenue - yearlyExpenses;

    return {
      month: format(yearDate, "yyyy"), 
      revenue: Math.round(yearlyRevenue),
      expenses: Math.round(yearlyExpenses),
      profit: Math.round(profit),
    };
  });
};
"use client";

import IncomeExpenseChart from "./IncomeExpenseChart";

type ChartItem = {
  name: string;
  value: number;
};

export default function GraphsClient({
  data,
}: {
  data: ChartItem[];
}) {
  return (
    <IncomeExpenseChart data={data} />
  );
}

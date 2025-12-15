"use client";

import IncomeExpenseChart from "./IncomeExpenseChart";
import CategoryChart from "./CategoryChart";

type ChartItem = {
  name: string;
  value: number;
  color?: string;
};


type GraphsClientProps = {
  data: ChartItem[];
  categoryData: ChartItem[];
};

export default function GraphsClient({
  data,
  categoryData,
}: GraphsClientProps) {
  return (
    <div className="space-y-6">
      <IncomeExpenseChart data={data} />
      <CategoryChart data={categoryData} />
    </div>
  );
}

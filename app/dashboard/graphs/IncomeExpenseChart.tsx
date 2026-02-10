"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartItem = {
  name: string;
  value: number;
};

export default function IncomeExpenseChart({ //test
  data,
}: {
  data: ChartItem[];
}) {
  return (
    <div className="bg-[#161a22] border border-[#262b36] rounded-xl p-4">
      <h2 className="text-lg font-medium mb-4">
        Prihodki vs Stroški
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#9aa1ad"
            />
            <YAxis stroke="#9aa1ad" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f1115",
                border: "1px solid #262b36",
                color: "#e6e8eb",
              }}
            />
            <Bar
              dataKey="value"
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartItem = {
  name: string;
  value: number;
  color?: string;
};

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#3b82f6",
  "#eab308",
  "#a855f7",
  "#14b8a6",
  "#f97316",
  "#ec4899",
];

export default function CategoryChart({
  data,
}: {
  data: ChartItem[];
}) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-[#161a22] border border-[#262b36] rounded-xl p-4 text-[#9aa1ad]">
        Ni stroškov za prikaz po kategorijah.
      </div>
    );
  }

  return (
    <div className="bg-[#161a22] border border-[#262b36] rounded-xl p-4">
      <h2 className="text-lg font-medium mb-4">
        Stroški po kategorijah
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
  <Cell
    key={index}
    fill={entry.color || COLORS[index % COLORS.length]}
  />
))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f1115",
                border: "1px solid #262b36",
                color: "#e6e8eb",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

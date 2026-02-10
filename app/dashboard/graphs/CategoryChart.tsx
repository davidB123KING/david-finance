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

// Custom Tooltip komponenta
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          position: "fixed",
          top: "100px", // višino prilagodi glede na graf
          left: "100%",  // ali pixel vrednost desno od grafa
          backgroundColor: "#0f1115",
          border: "1px solid #262b36",
          padding: "8px",
          borderRadius: "8px",
          color: "#e6e8eb",
        }}
      >
        <p style={{ fontWeight: "500" }}>{data.name}</p>
        <p>{data.value}</p>
      </div>
    );
  }
  return null;
};

export default function CategoryChart({ data }: { data: ChartItem[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-[#161a22] border border-[#262b36] rounded-xl p-4 text-[#9aa1ad]">
        Ni stroškov za prikaz po kategorijah.
      </div>
    );
  }

  return (
    <div className="bg-[#161a22] border border-[#262b36] rounded-xl p-4 relative">
      <h2 className="text-lg font-medium mb-4 w-full">
        Stroški po kategorijah
      </h2>

      <div className="h-72 w-full relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <ResponsiveContainer width={250} height={250}>
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

              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

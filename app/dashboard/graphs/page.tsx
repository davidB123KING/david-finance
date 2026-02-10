import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import GraphsClient from "./GraphsClient";

export default async function GraphsPage() {
  const { userId } = await auth();
  if (!userId) return null;

  // 1️⃣ Prihodki vs stroški
  const data = await sql`
    SELECT
      type,
      SUM(amount) as total
    FROM transactions
    WHERE user_id = ${userId}
    GROUP BY type;
  `;

  const chartData = [
    {
      name: "Prihodki",
      value: Number(
        data.find((d) => d.type === "income")?.total
      ) || 0,
    },
    {
      name: "Stroški",
      value: Number(
        data.find((d) => d.type === "expense")?.total
      ) || 0,
    },
  ];

  // 2️⃣ Stroški po kategorijah
  const categoryData = await sql`
  SELECT
    COALESCE(c.name, 'Brez kategorije') AS name,
    COALESCE(c.color, '#3b82f6') AS color,
    SUM(t.amount) AS total
  FROM transactions t
  LEFT JOIN categories c ON t.category_id = c.id
  WHERE t.user_id = ${userId}
    AND t.type = 'expense'
  GROUP BY c.name, c.color
  ORDER BY total DESC;
`;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Grafi
      </h1>

      <GraphsClient
  data={chartData}
  categoryData={categoryData.map((c) => ({
    name: c.name,
    value: Number(c.total) || 0,
    color: c.color,
  }))}
/>
    </div>
  );
}

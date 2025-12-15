import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import GraphsClient from "./GraphsClient";

export default async function GraphsPage() {
  const { userId } = await auth();
  if (!userId) return null;

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
      value:
        Number(
          data.find((d) => d.type === "income")?.total
        ) || 0,
    },
    {
      name: "Stroški",
      value:
        Number(
          data.find((d) => d.type === "expense")?.total
        ) || 0,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Grafi
      </h1>

      <GraphsClient data={chartData} />
    </div>
  );
}
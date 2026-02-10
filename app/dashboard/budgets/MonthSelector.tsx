"use client";

import { useState } from "react";

export default function MonthSelector({
  initialMonth,
}: {
  initialMonth: string;
}) {
  const [month, setMonth] = useState(initialMonth);

  const months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return d.toISOString().slice(0, 7);
  });

  return (
    <div>
      <label className="block text-sm mb-1">Mesec</label>

      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="w-full bg-[#0f1115] border border-[#262b36] rounded px-3 py-2"
      >
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      {/* 🔑 KLJUČNA STVAR */}
      <input type="hidden" name="month" value={month} />
    </div>
  );
}

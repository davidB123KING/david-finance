"use client";

import { useState } from "react";

export default function BudgetActions({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-[#9aa1ad] hover:text-white px-2"
      >
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-[#161a22] border border-[#262b36] rounded-lg shadow-lg z-10">
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="w-full text-left px-4 py-2 hover:bg-[#262b36]"
          >
            ✏️ Uredi
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="w-full text-left px-4 py-2 hover:bg-[#262b36] text-red-400"
          >
            🗑️ Izbriši
          </button>
        </div>
      )}
    </div>
  );
}

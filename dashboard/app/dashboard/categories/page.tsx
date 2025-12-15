import { auth } from "@clerk/nextjs/server";
import {
  getCategories,
  createCategory,
} from "../actions";

export default async function CategoriesPage() {
  const { userId } = await auth();
  if (!userId) return <div>Nisi prijavljen</div>;

  const categories = await getCategories();

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">
        Kategorije
      </h1>

      {/* Add category */}
      <form
        action={createCategory}
        className="flex gap-2"
      >
        <input
          name="name"
          placeholder="Ime kategorije"
          required
          className="border rounded px-3 py-2"
        />

        <input
          name="icon"
          placeholder="🍔"
          className="border rounded px-3 py-2 w-20"
        />

        <input
          name="color"
          type="color"
          className="border rounded px-3 py-2 w-20"
        />

        <button className="bg-black text-white px-4 rounded">
          Dodaj
        </button>
      </form>

      {/* Category list */}
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex items-center justify-between p-3 border rounded"
          >
            <div className="flex items-center gap-3">
              <span>{cat.icon}</span>
              <span className="font-medium">
                {cat.name}
              </span>
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
            </div>

            {/* delete later */}
            <span className="text-gray-400 text-sm">
              (brisanje kmalu)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

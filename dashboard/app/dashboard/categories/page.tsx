import { auth } from "@clerk/nextjs/server";
import {
  getCategories,
  createCategory,
} from "../actions";
import {
  updateCategory,
  deleteCategory,
} from "./actions";

export default async function CategoriesPage() {
  const { userId } = await auth();
  if (!userId) return <div>Nisi prijavljen</div>;

  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">
          Kategorije
        </h1>
        <p className="text-sm text-[#9aa1ad]">
          Upravljaj svoje kategorije za transakcije.
        </p>
      </div>

      {/* ADD CATEGORY */}
      <form
        action={createCategory}
        className="bg-[#161a22] border border-[#262b36] rounded-xl p-4 flex flex-wrap gap-3 items-end max-w-xl"
      >
        <div className="flex-1">
          <label className="block text-sm mb-1">
            Ime
          </label>
          <input
            name="name"
            required
            placeholder=""
            className="w-full bg-[#0f1115] border border-[#262b36] rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Ikona
          </label>
          <input
            name="icon"
            placeholder=""
            className="w-20 bg-[#0f1115] border border-[#262b36] rounded px-3 py-2 text-center"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Barva
          </label>
          <input
            name="color"
            type="color"
            className="w-12 h-10 bg-transparent border border-[#262b36] rounded"
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">
          Dodaj
        </button>
      </form>

      {/* CATEGORY LIST */}
      <div className="space-y-3 max-w-2xl">
        {categories.length === 0 ? (
          <p className="text-sm text-[#9aa1ad] italic">
            Ni še dodanih kategorij.
          </p>
        ) : (
          categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-[#161a22] border border-[#262b36] rounded-xl p-4 flex items-center justify-between gap-4"
            >
              {/* EDIT */}
              <form
                action={updateCategory}
                className="flex items-center gap-3 flex-1"
              >
                <input
                  type="hidden"
                  name="id"
                  value={cat.id}
                />

                <span className="text-lg">
                  {cat.icon}
                </span>

                <input
                  name="name"
                  defaultValue={cat.name}
                  className="flex-1 bg-[#0f1115] border border-[#262b36] rounded px-3 py-2"
                />

                <input
                  name="color"
                  type="color"
                  defaultValue={cat.color}
                  className="w-10 h-8 bg-transparent border border-[#262b36] rounded"
                />

                <button className="bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded text-sm">
                  Shrani
                </button>
              </form>

              {/* DELETE */}
              <form action={deleteCategory}>
                <input
                  type="hidden"
                  name="id"
                  value={cat.id}
                />
                <button
                  title="Izbriši kategorijo"
                  className="bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded text-sm"
                >
                  Izbriši
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import Item from "./item";
import itemsData from "./items.json";

type ItemData = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function ItemList() {
  const [sortBy, setSortBy] = useState<"name" | "category" | "grouped">("name");

  const items = itemsData as ItemData[];

  const sortedItems = useMemo(() => {
    const copy = [...items];

    if (sortBy === "name") {
      copy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "category") {
      copy.sort((a, b) => a.category.localeCompare(b.category));
    }

    return copy;
  }, [items, sortBy]);

  const groupedItems = useMemo(() => {
    const grouped = sortedItems.reduce<Record<string, ItemData[]>>((acc, item) => {
      const key = item.category;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

    // sort items inside each category by name
    for (const cat of Object.keys(grouped)) {
      grouped[cat].sort((a, b) => a.name.localeCompare(b.name));
    }

    return grouped;
  }, [sortedItems]);

  const buttonBase =
    "px-3 py-2 rounded border border-slate-700";
  const active = "bg-blue-600 text-white";
  const inactive = "bg-slate-900 text-slate-200 hover:bg-slate-800";

  return (
    <section>
      <div className="flex gap-2 mb-4">
        <button
          className={`${buttonBase} ${sortBy === "name" ? active : inactive}`}
          onClick={() => setSortBy("name")}
        >
          Sort by Name
        </button>

        <button
          className={`${buttonBase} ${sortBy === "category" ? active : inactive}`}
          onClick={() => setSortBy("category")}
        >
          Sort by Category
        </button>

        <button
          className={`${buttonBase} ${sortBy === "grouped" ? active : inactive}`}
          onClick={() => setSortBy("grouped")}
        >
          Group by Category
        </button>
      </div>

      {sortBy !== "grouped" && (
        <ul>
          {sortedItems.map((item) => (
            <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
          ))}
        </ul>
      )}

      {sortBy === "grouped" && (
        <div className="space-y-6">
          {Object.keys(groupedItems)
            .sort((a, b) => a.localeCompare(b))
            .map((category) => (
              <div key={category}>
                <h2 className="text-xl font-bold capitalize mb-2">{category}</h2>
                <ul>
                  {groupedItems[category].map((item) => (
                    <Item
                      key={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                    />
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}

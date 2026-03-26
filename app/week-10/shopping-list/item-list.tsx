"use client";

import { useMemo, useState } from "react";
import Item from "./item";

type ItemData = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

type ItemListProps = {
  items: ItemData[];
  onItemSelect: (item: ItemData) => void;
};

export default function ItemList({ items, onItemSelect }: ItemListProps) {
  const [sortBy, setSortBy] = useState<"name" | "category" | "grouped">("name");

  const sortedItems = useMemo(() => {
    const copy = [...items];

    if (sortBy === "name") copy.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "category") copy.sort((a, b) => a.category.localeCompare(b.category));

    return copy;
  }, [items, sortBy]);

  const groupedItems = useMemo(() => {
    const grouped = sortedItems.reduce<Record<string, ItemData[]>>((acc, item) => {
      (acc[item.category] ??= []).push(item);
      return acc;
    }, {});

    for (const cat of Object.keys(grouped)) {
      grouped[cat] = [...grouped[cat]].sort((a, b) => a.name.localeCompare(b.name));
    }

    return grouped;
  }, [sortedItems]);

  const buttonBase = "px-3 py-2 rounded border border-slate-700";
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
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              onSelect={() => onItemSelect(item)}
            />
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
                      onSelect={() => onItemSelect(item)}
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
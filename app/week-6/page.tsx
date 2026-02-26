"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

type Item = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  const [items, setItems] = useState<Item[]>(itemsData as Item[]);

  function handleAddItem(item: { name: string; quantity: number; category: string }) {
    const newItem: Item = {
      id: crypto.randomUUID(),
      ...item,
    };

    setItems((prev) => [...prev, newItem]);
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping List</h1>

      <NewItem onAddItem={handleAddItem} />

      <div className="mt-8">
        <ItemList items={items} />
      </div>
    </main>
  );
}
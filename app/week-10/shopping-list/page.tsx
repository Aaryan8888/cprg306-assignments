"use client";

import { useEffect, useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/shopping-list-service";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";

type Item = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

function cleanItemName(text: string) {
  const beforeComma = text.split(",")[0].trim();

  const noEmoji = beforeComma.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\uFE0F)/g,
    ""
  );

  return noEmoji.trim().toLowerCase();
}

export default function Page() {
  const { user } = useUserAuth();

  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  useEffect(() => {
    async function loadItems() {
      if (!user) return;

      try {
        const userItems = await getItems(user.uid);
        setItems(userItems);
      } catch (error) {
        console.error("Error loading items:", error);
      }
    }

    loadItems();
  }, [user]);

  async function handleAddItem(item: {
    name: string;
    quantity: number;
    category: string;
  }) {
    if (!user) {
      alert("You must be logged in.");
      return;
    }

    try {
      const id = await addItem(user.uid, item);

      const newItem: Item = {
        id,
        ...item,
      };

      setItems((prev) => [...prev, newItem]);
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Item was not saved to Firestore.");
    }
  }

  function handleItemSelect(item: Item) {
    const cleanedName = cleanItemName(item.name);
    setSelectedItemName(cleanedName);
  }

  if (!user) {
    return (
      <main className="p-6">
        <p>You must be logged in to view the shopping list.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping List</h1>

      <div className="flex gap-6">
        <div className="w-1/2">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        <div className="w-1/2">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
"use client";

import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // advanced validation
    if (!name || name.trim().length < 2) {
      alert("Name must be at least 2 characters long.");
      return;
    }

    const item = {
      name: name.trim(),
      quantity,
      category,
    };

    console.log(item);
    alert(`Name: ${item.name}\nQuantity: ${item.quantity}\nCategory: ${item.category}`);

    // reset
    setName("");
    setNameTouched(false);
    setQuantity(1);
    setCategory("produce");
  }

  const nameIsInvalid = nameTouched && name.trim().length < 2;
  const isFormInvalid = name.trim().length < 2;

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      {/* Name */}
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setNameTouched(true)}
          className={`w-full p-2 rounded border bg-slate-900 text-white ${
            nameIsInvalid ? "border-red-500" : "border-slate-700"
          }`}
          placeholder="e.g., Apples"
        />
        {nameIsInvalid && (
          <p className="text-red-500 text-sm mt-1">
            Name must be at least 2 characters.
          </p>
        )}
      </div>

      {/* Quantity */}
      <div>
        <label className="block mb-1 font-medium">Quantity</label>
        <input
          type="number"
          min="1"
          max="99"
          value={quantity}
          required
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full p-2 rounded border border-slate-700 bg-slate-900 text-white"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 rounded border border-slate-700 bg-slate-900 text-white"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isFormInvalid}
        className="w-full p-2 rounded bg-blue-600 text-white hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Add Item
      </button>
    </form>
  );
}

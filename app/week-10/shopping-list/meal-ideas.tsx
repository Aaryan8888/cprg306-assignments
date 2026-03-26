"use client";

import { useEffect, useState } from "react";

// This describes what one meal looks like from the API
type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

// Fetch meals from TheMealDB API using an ingredient
async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  // If ingredient is empty, return no meals
  if (!ingredient) return [];

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
    ingredient
  )}`;

  const response = await fetch(url);
  const data = await response.json();

  // Sometimes data.meals is null, so return [] in that case
  return data.meals ? data.meals : [];
}

export default function MealIdeas({ ingredient }: { ingredient: string }) {
  // meals = list we show on screen
  const [meals, setMeals] = useState<Meal[]>([]);

  // This function loads meals and puts them into state
  async function loadMealIdeas() {
    const mealList = await fetchMealIdeas(ingredient);
    setMeals(mealList);
  }

  // Run loadMealIdeas whenever the ingredient changes
  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Meal Ideas</h2>

      {/* If nothing is selected yet */}
      {!ingredient && (
        <p className="text-slate-300">Click an item to see meal ideas.</p>
      )}

      {/* If selected but API returns no meals */}
      {ingredient && meals.length === 0 && (
        <p className="text-slate-300">No meals found for “{ingredient}”.</p>
      )}

      {/* If we have meals, show them */}
      {meals.length > 0 && (
        <>
          <p className="text-slate-300 mb-2">For ingredient: {ingredient}</p>
          <ul className="list-disc list-inside space-y-1">
            {meals.map((meal) => (
              <li key={meal.idMeal} className="text-slate-200">
                {meal.strMeal}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
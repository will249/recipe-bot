import { Ingredient } from "../app/ingredients";
import { Recipe } from "../app/recipes";

export const extractSelectedIngredients = (ingredients: Ingredient[]): string =>
  ingredients
    .filter((ingredient) => ingredient.selected)
    .map((ingredient) => ingredient.value)
    .join(", ");

export const formatIngredientsResponse = (response: string): Ingredient[] => {
  const labelsArray: string[] = response
    .split(",")
    .map((label) => label.trim());

  const ingredients: Ingredient[] = labelsArray.map((value, index) => ({
    id: index.toString(),
    value: value.toLowerCase(),
    selected: true,
  }));
  console.log(ingredients);

  return ingredients;
};

const exampleRecipe = {
  title: "Roasted Cherry Tomato and Olive Pasta with Parmesan and Leeks",
  ingredients: [
    { id: "0", label: "250g whole wheat fusilli pasta" },
    { id: "1", label: "200g cherry tomatoes" },
    { id: "2", label: "100g green olives, pitted and halved" },
    { id: "3", label: "1 leek, sliced" },
    { id: "4", label: "2 cloves of garlic, minced" },
    { id: "5", label: "50g Parmigiano Reggiano cheese, grated" },
    { id: "6", label: "1 can (400g) cannellini beans, rinsed and drained" },
    { id: "7", label: "Salt and pepper to taste" },
    { id: "8", label: "2 tablespoons olive oil" },
  ],
  method: [
    { id: "0", label: "Preheat the oven to 200°C (400°F)" },
    {
      id: "1",
      label:
        "Place the cherry tomatoes on a baking tray, drizzle with 1 tablespoon of olive oil, sprinkle with salt and pepper, and roast in the oven for 15-20 minutes until they start to burst",
    },
    {
      id: "2",
      label:
        "In a large pot, bring water to a boil, add salt, and cook the whole wheat fusilli pasta according to package instructions until al dente. Drain and set aside",
    },
    {
      id: "3",
      label:
        "In a large skillet, heat the remaining olive oil over medium heat. Add the sliced leeks and minced garlic, sauté until the leeks are softened and fragrant",
    },
    {
      id: "4",
      label:
        "Add the drained cannellini beans and halved green olives to the skillet. Cook for another 3-4 minutes until heated through",
    },
    {
      id: "5",
      label:
        "Add the cooked pasta to the skillet with the leek, beans, and olives. Toss everything together gently",
    },
    {
      id: "6",
      label:
        "Stir in the roasted cherry tomatoes, mixing carefully not to break them completely. Season with salt and pepper to taste",
    },
    {
      id: "7",
      label:
        "Serve the pasta hot, sprinkled with grated Parmigiano Reggiano cheese on top",
    },
    {
      id: "8",
      label:
        "Enjoy your delicious Roasted Cherry Tomato and Olive Pasta with Parmesan and Leeks!",
    },
  ],
  time: "25",
  portions: "2",
};

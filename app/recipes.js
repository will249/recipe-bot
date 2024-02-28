import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { OpenAI } from "openai";
import { Link, useLocalSearchParams } from "expo-router";

const RecipeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState(null);
  const params = useLocalSearchParams();

  const getRecipesAsync = async () => {
    // const openai = new OpenAI({
    //   apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    // });

    // const response = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "user",
    //       content: [
    //         {
    //           type: "text",
    //           text: "Create a recipe using ONLY the ingredients provided in the prompt (as well as salt, pepper and oil). You do not need to use every ingredient. Provide quantities (metric) for each ingredient as well as a detailed method broken down into steps.",
    //         },
    //       ],
    //     },
    //     {
    //       role: "user",
    //       content: [
    //         {
    //           type: "text",
    //           text: `${params.ingredients}`,
    //         },
    //       ],
    //     },
    //     {
    //       role: "system",
    //       content: [
    //         {
    //           type: "text",
    //           text: "You are an expert chef who can create delicious, simple recipes from any cuisine.",
    //         },
    //       ],
    //     },
    //   ],
    // });

    // setRecipes(response.choices[0].message.content);
    setRecipes(exampleRecipe);
    setLoading(false);
  };

  useEffect(() => {
    getRecipesAsync();
  }, []);

  return (
    <View
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text>Recipe:</Text>
          <Text>{recipes ? recipes : "No data"}</Text>
        </View>
      )}
    </View>
  );
};

export default RecipeScreen;

const exampleRecipe = `Recipe: Roasted Cherry Tomato and Olive Pasta with Parmesan and Leeks

Ingredients:
- 250g whole wheat fusilli pasta
- 200g cherry tomatoes
- 100g green olives, pitted and halved
- 1 leek, sliced
- 2 cloves of garlic, minced
- 50g Parmigiano Reggiano cheese, grated
- 1 can (400g) cannellini beans, rinsed and drained
- Salt and pepper to taste
- 2 tablespoons olive oil

Instructions:

1. Preheat the oven to 200°C (400°F).
2. Place the cherry tomatoes on a baking tray, drizzle with 1 tablespoon of olive oil, sprinkle with salt and pepper, and roast in the oven for 15-20 minutes until they start to burst.
3. In a large pot, bring water to a boil, add salt, and cook the whole wheat fusilli pasta according to package instructions until al dente. Drain and set aside.
4. In a large skillet, heat the remaining olive oil over medium heat. Add the sliced leeks and minced garlic, sauté until the leeks are softened and fragrant.
5. Add the drained cannellini beans and halved green olives to the skillet. Cook for another 3-4 minutes until heated through.
6. Add the cooked pasta to the skillet with the leek, beans, and olives. Toss everything together gently.
7. Stir in the roasted cherry tomatoes, mixing carefully not to break them completely. Season with salt and pepper to taste.
8. Serve the pasta hot, sprinkled with grated Parmigiano Reggiano cheese on top.
9. Enjoy your delicious Roasted Cherry Tomato and Olive Pasta with Parmesan and Leeks!`;

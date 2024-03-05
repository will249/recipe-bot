import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  LogBox,
  ScrollView,
  Text,
  View,
} from "react-native";
import { OpenAI } from "openai";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Ingredient } from "./ingredients";
import { LoadingScreen } from "../components/LoadingScreen";
import { RecipeDetails } from "../components/RecipeDetails";
import { IngredientList } from "../components/IngredientList";
import { RecipeMethod } from "../components/RecipeMethod";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function RecipeScreen() {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe>(null);
  const params = useLocalSearchParams();
  const windowWidth = Dimensions.get("window").width;

  const getRecipesAsync = async () => {
    const openai = new OpenAI({
      apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: `Create a recipe using ONLY the ingredients provided in the prompt (as well as salt, pepper and oil). You do not need to use every ingredient. Return your response with recipe title, method steps, ingredients in metric or conventional quantities (eg. cloves of garlic), the time requirement to cook in minutes, and the number of people it serves, as a JSON object with the structure {"title": "<recipe title>", "method": [{"id": 0, "value": "First step of method"}, {"id": 1, "value": "Second step of method"},...], "ingredients": [{"id": 0, "value": "First ingredient"},...], "time": <x>, "serves": <y>}.`,
        },
        {
          role: "user",
          content: `${params.ingredients}`,
        },
        {
          role: "system",
          content:
            "You are an expert chef who can create delicious, simple recipes from any cuisine.",
        },
      ],
    });

    console.log(response.choices[0].message.content);

    setRecipes(JSON.parse(response.choices[0].message.content));
    setLoading(false);
  };

  useEffect(() => {
    getRecipesAsync();
  }, []);

  return (
    <View
      style={{
        height: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {loading ? (
        <LoadingScreen text={"preparing recipes..."} />
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 38,
              fontWeight: "bold",
              color: "#34A26D",
              marginHorizontal: 25,
              marginTop: "25%",
            }}
          >
            {recipes.title}
          </Text>
          <RecipeDetails recipe={recipes} />
          <Text
            style={{
              fontSize: 38,
              fontWeight: "bold",
              color: "black",
              marginLeft: 25,
            }}
          >
            Ingredients:
          </Text>
          <IngredientList ingredients={recipes.ingredients} />
          <Text
            style={{
              fontSize: 38,
              fontWeight: "bold",
              color: "black",
              marginLeft: 25,
            }}
          >
            Method:
          </Text>
          <RecipeMethod method={recipes.method} />
        </ScrollView>
      )}
    </View>
  );
}

export interface MethodStep {
  id: string;
  value: string;
}
export interface Recipe {
  title: string;
  ingredients: Ingredient[];
  method: MethodStep[];
  time: string;
  portions: string;
}

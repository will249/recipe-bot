import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { OpenAI } from "openai";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import * as fs from "expo-file-system";
import { IngredientsList } from "../components/IngredientList";

export interface Ingredient {
  id: string;
  label: string;
  selected: boolean;
}

const extractSelectedIngredients = (ingredients: Ingredient[]): string =>
  ingredients
    .filter((ingredient) => ingredient.selected)
    .map((ingredient) => ingredient.label)
    .join(", ");

export default function IngredientsScreen() {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>(null);
  const onUpdateValue = (index, value) => {
    ingredients[index].selected = value;

    return setIngredients([...ingredients]);
  };

  const params = useLocalSearchParams();

  const getIngredientsAsync = async () => {
    // const encodedImage = await fs.readAsStringAsync(params.imagePath, {
    //   encoding: "base64",
    // });

    // const openai = new OpenAI({
    //   apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    // });

    // const response = await openai.chat.completions.create({
    //   model: "gpt-4-vision-preview",
    //   messages: [
    //     {
    //       role: "user",
    //       content: [
    //         {
    //           type: "text",
    //           text: "Identify all food items in this image, return them as items in an array, where each item is an object with an id and a label",
    //         },
    //         {
    //           type: "image_url",
    //           image_url: {
    //             url: `data:image/jpeg;base64,{${encodedImage}}`,
    //             detail: "low",
    //           },
    //         },
    //       ],
    //     },
    //   ],
    //   max_tokens: 250,
    // });

    // console.log(response.choices[0].message.content);
    const response = [
      { id: "0", label: "Green olives", selected: true },
      { id: "1", label: "Garlic", selected: true },
      { id: "2", label: "Parmigiano Reggiano cheese", selected: true },
      { id: "3", label: "Cherry tomatoes", selected: true },
      { id: "4", label: "Leeks", selected: true },
      { id: "5", label: "Whole wheat fusilli pasta", selected: true },
      { id: "6", label: "Cannellini beans", selected: true },
    ];
    setIngredients(response);
    setLoading(false);
  };

  useEffect(() => {
    getIngredientsAsync();
  }, []);

  return (
    <View
      style={{
        height: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Stack.Screen
        options={{
          title: "Confirm your ingredients:",
        }}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#f4511e" />
      ) : (
        <View>
          <IngredientsList
            ingredients={ingredients}
            onUpdateValue={onUpdateValue}
          />
          <Link
            href={{
              pathname: "/recipes",
              params: { ingredients: extractSelectedIngredients(ingredients) },
            }}
            asChild
          >
            <Pressable style={styles.button}>
              <Text style={styles.text}>Show me recipes!</Text>
            </Pressable>
          </Link>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#f4511e",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

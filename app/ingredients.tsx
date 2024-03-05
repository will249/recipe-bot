import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { OpenAI } from "openai";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import * as fs from "expo-file-system";
import { LoadingScreen } from "../components/LoadingScreen";
import { IngredientChecklist } from "../components/IngredientChecklist";
import {
  extractSelectedIngredients,
  formatIngredientsResponse,
} from "../helpers/processResponses";

export interface Ingredient {
  id: string;
  value: string;
  selected?: boolean;
}

export default function IngredientsScreen() {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>(null);
  const windowWidth = Dimensions.get("window").width;

  const onUpdateValue = (index, value) => {
    ingredients[index].selected = value;

    return setIngredients([...ingredients]);
  };

  const params = useLocalSearchParams<{ imagePath: string }>();

  const getIngredientsAsync = async () => {
    const encodedImage = await fs.readAsStringAsync(params.imagePath, {
      encoding: "base64",
    });

    const openai = new OpenAI({
      apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Identify all food items in this image, return them as a list of ingredients separated by commas with no trailing full-stop",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,{${encodedImage}}`,
                detail: "high",
              },
            },
          ],
        },
      ],
      max_tokens: 250,
    });
    setIngredients(
      formatIngredientsResponse(response.choices[0].message.content),
    );
    setLoading(false);
  };

  useEffect(() => {
    getIngredientsAsync();
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
        <LoadingScreen text={"detecting ingredients..."} />
      ) : (
        <View>
          <Text
            style={{
              fontSize: 38,
              fontWeight: "bold",
              marginLeft: (windowWidth - 340) / 2,
              marginTop: "25%",
            }}
          >
            Confirm your ingredients:
          </Text>
          <IngredientChecklist
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
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#34A26D",
    marginTop: 100,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

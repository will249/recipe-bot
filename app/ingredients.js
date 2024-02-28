import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { OpenAI } from "openai";
import { Link, useLocalSearchParams } from "expo-router";
import * as fs from "expo-file-system";

const IngredientsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState(null);
  const params = useLocalSearchParams();

  const getIngredientsAsync = async () => {
    // const encodedImage = await fs.readAsStringAsync(params.image, {
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
    //           text: "Identify all food items in this image, return them as items in an array",
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
      "Green olives",
      "Garlic",
      "Parmigiano Reggiano cheese",
      "Cherry tomatoes",
      "Leeks",
      "Whole wheat fusilli pasta",
      "Cannellini beans",
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
          <Text>Ingredients:</Text>
          <Text>{ingredients ? ingredients : "No data"}</Text>
          <Link
            href={{
              pathname: "/recipes",
              params: { ingredients },
            }}
          >
            Get Recipes
          </Link>
        </View>
      )}
    </View>
  );
};

export default IngredientsScreen;

import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const RecipeDetails = ({ recipe }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginHorizontal: 10,
          marginVertical: 3,
        }}
      >
        <FontAwesome name="clock-o" size={24} color="black" />
        <Text style={styles.text}>{`${recipe.time} min`}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginHorizontal: 10,
          marginVertical: 2,
        }}
      >
        <FontAwesome name="users" size={20} color="black" />
        <Text style={styles.text}>{`serves ${recipe.serves}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 25,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.25,
    color: "black",
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
  },
});

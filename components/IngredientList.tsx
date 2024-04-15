import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ingredient } from "../entities/recipe";

export const IngredientList = ({
  ingredients,
}: {
  ingredients: Ingredient[];
}) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.item}>{`• ${item.value}`}</Text>
      </View>
    );
  };
  const windowWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <FlatList
        data={ingredients}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#5EC593",
    borderRadius: 10,
    margin: 25,
    paddingTop: 5,
  },
  item: {
    marginHorizontal: 12,
    marginVertical: 3,
    fontSize: 18,
    color: "white",
    flexDirection: "row",
    alignItems: "center",
  },
});

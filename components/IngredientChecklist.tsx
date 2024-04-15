import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CheckBox from "expo-checkbox";
import { Ingredient } from "../entities/recipe";

export const IngredientChecklist = ({
  ingredients,
  onUpdateValue,
}: {
  ingredients: Ingredient[];
  onUpdateValue: (index: number, value: boolean) => void;
}) => {
  const renderItem = ({ item }) => (
    <ItemRenderer item={item} onUpdateValue={onUpdateValue} />
  );

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

const ItemRenderer = ({ item, onUpdateValue }) => {
  const color = item.selected ? "black" : "grey";

  return (
    <View style={styles.item}>
      <CheckBox
        value={item.selected}
        onValueChange={(value) => onUpdateValue(item.id, value)}
        color="#5EC593"
      />
      <Text style={[styles.item, { color }]}>{item.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: "15%",
    marginLeft: "10%",
  },
  item: {
    marginHorizontal: 12,
    marginVertical: 8,
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    fontSize: 18,
  },
});

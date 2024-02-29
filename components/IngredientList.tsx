import React, { useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { Ingredient } from "../app/ingredients";

export const IngredientsList = ({
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
      <Switch
        value={item.selected}
        onValueChange={(value) => onUpdateValue(item.id, value)}
      />
      <Text style={[styles.title, { color }]}>{item.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 18,
    color: "black",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
  },
});

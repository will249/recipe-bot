import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MethodStep } from "../entities/recipe";

export const RecipeMethod = ({ method }: { method: MethodStep[] }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.stepNumber}>{`${item.id}.  `}</Text>
        <Text style={styles.itemText}>{`${item.value}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={method}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 25,
  },
  itemContainer: {
    marginRight: 40,
    marginVertical: 5,
    fontSize: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    marginVertical: 5,
    fontSize: 18,
    color: "black",
  },
  stepNumber: {
    marginHorizontal: 5,
    marginVertical: 5,
    fontSize: 18,
    color: "#5EC593",
  },
});

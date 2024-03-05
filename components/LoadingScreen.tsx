import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export const LoadingScreen = ({ text }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="#ffffff"
        style={{ position: "absolute", bottom: "50%" }}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#34A26D",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    marginTop: "114%",
  },
  title: {
    fontSize: 18,
  },
});

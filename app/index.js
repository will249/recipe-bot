import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [pickedImage, setPickedImage] = useState("");
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setPickedImage(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {pickedImage === "" ? (
        <View>
          <Pressable style={styles.button} onPress={pickImage}>
            <Text style={styles.text}>Select an image</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Image
            source={{ uri: pickedImage }}
            style={{ width: 200, height: 200, margin: 40 }}
          />
          <Link
            href={{
              pathname: "/ingredients",
              params: { imagePath: pickedImage },
            }}
            asChild
          >
            <Pressable style={styles.button}>
              <Text style={styles.text}>Scan your ingredients!</Text>
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

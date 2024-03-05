import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, Stack } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import Animated, {
  SharedTransition,
  withSpring,
} from "react-native-reanimated";

export default function App() {
  const [pickedImage, setPickedImage] = useState("");
  const windowWidth = Dimensions.get("window").width;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
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
        justifyContent: "flex-start",
        marginTop: "25%",
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View
        style={{
          marginLeft: (windowWidth - 340) / 2,
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 38, fontWeight: "bold", marginBottom: 20 }}>
          Hello,
        </Text>
        <Text
          style={{
            fontSize: 38,
            fontWeight: "bold",
            marginBottom: 20,
            color: "#34A26D",
          }}
        >
          {" Mo"}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {pickedImage === "" ? (
          <View>
            <View
              style={{
                borderColor: "#34A26D",
                borderWidth: 13,
                borderStyle: "dashed",
                height: 340,
                width: 340,
                margin: 40,
              }}
            ></View>
            <Pressable style={styles.button} onPress={pickImage}>
              <Text style={styles.text}>select an image</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <Image
              source={{ uri: pickedImage }}
              style={{ width: 340, height: 340, margin: 40 }}
            />
            <View style={styles.button}>
              <Link
                href={{
                  pathname: "/ingredients",
                  params: { imagePath: pickedImage },
                }}
                asChild
              >
                <Pressable>
                  <Text style={styles.text}>scan your ingredients!</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#34A26D",
    margin: "10%",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

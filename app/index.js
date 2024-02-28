import React, { useState } from "react";
import { Button, Image, Text, View } from "react-native";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const App = () => {
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
          <Button title="Pick an image" onPress={pickImage} />
          <Text>Pick an image to classify!</Text>
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
              params: { image: pickedImage },
            }}
          >
            Get Ingredients
          </Link>
        </View>
      )}
    </View>
  );
};
export default App;

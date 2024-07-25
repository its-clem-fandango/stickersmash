import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  /* NOTES: useState: selectedImage is a variable that holds the current state value. It starts with the default value provided in useState(). setStateFunction is a function you use to update the state. When you call this function with a new value, react RE-RENDERS the component with the new state value */
  const [selectedImage, setSelectedImage] = useState(null); //State = data that a component maintains and can change over time
  const [showAppOptions, setShowAppOptions] = useState(false);

  /* NOTES: pickImageAsync invokes launchImageLib... and handles the result */
  const pickImageAsync = async () => {
    /* NOTES: launchImageLib... method displays the system UI for choosing an image or video from the device's media library. It returns the object containing information about the selected image, which you can log in "result" and includes stuff like height, width, uri (phoneurl) and more. We will select the uri to display the image in the app */
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, //allows user to crop image during selection process on ios/android but not web
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
      console.log(result);
    } else {
      alert("You did not select an image.");
    }
  };

  /* MODAL BUTTONS */
  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    //TODO
  };

  const onSaveImageAsync = async () => {
    // TODO
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer //conditional rendering between placeholder and selectedImage done within ImageViewer component
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>

      {/* Conditionally render choose photo/usephoto if a new photo is chosen or user chooses to "reset" their selection  */}
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});

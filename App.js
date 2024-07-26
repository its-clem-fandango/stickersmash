import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState, useRef } from "react";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  /* NOTES: useState: selectedImage is a variable that holds the current state value. It starts with the default value provided in useState(). setStateFunction is a function you use to update the state. When you call this function with a new value, react RE-RENDERS the component with the new state value */
  const [selectedImage, setSelectedImage] = useState(null); //State = data that a component maintains and can change over time
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

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
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  /* S C R E E N S H O T S */

  //FIRST: we check for permissions using expo-media-library.
  //when creating an app that requires access to potentially sensitive information, such as access to media library, we must first request permissions
  const [status, requestPermission] = MediaLibrary.usePermissions();

  //initially when app loads for first time, the default status is null (permissions neither granted nor denied)
  if (status === null) {
    //once permission is given, value of status changes to "granted"
    requestPermission();
  }

  //SECOND: use react-native-view-shot to capture a screenshot in <View> component, which returns the URI of the screenshot image file
  // useref creates mutable objects (changeable) which persists across renders and doesn't trigger re-render, which is crucial for performance to not unnecessarily render. Here, useRef is used to keep a reference to the component that needs to be captured as an image.
  const imageRef = useRef();

  const onSaveImageAsync = async () => {
    try {
      //captureRef is a function provided by react-native-view-shot which lets you capture a screenshot of a specific component or part of your apps UI
      //captureRef requires a reference to the component you want to capture. To do this we are using useRef
      //imageRef is used as the ref property in View down below
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });
      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Why are we using an additional view and not just the one above? */}
        {/* Seperation of concerns: View with styles might contain elements or 
        logic you dont want to capture. by using another View we isolate the exact
        elemenets we want to capture. This also allows us to modify the parent 
        View container without messing with the screen capturing logic */}
        <View ref={imageRef} collapsable={false}>
          <ImageViewer //conditional rendering between placeholder and selectedImage done within ImageViewer component
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {/* Place the sticker on the imageContainer view */}
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
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
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        {/* Emoji is picked onSelect by user and placed above using the pickedEmoji && EmojiSticker logic in ImageViewer  */}
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
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

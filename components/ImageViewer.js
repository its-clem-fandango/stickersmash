import { StyleSheet, Image } from "react-native";

/* NOTES: custom component for displaying images, takes the placeholderImageSource prop and formats the image into a 320x440 img.  */
export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  /* NOTES: if selectedImage is truthy then use {uri: selectedImage}. if falsy, use placeholder */
  const imageSource = selectedImage
    ? { uri: selectedImage }
    : placeholderImageSource;
  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

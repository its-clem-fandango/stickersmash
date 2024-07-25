import { useState } from "react";
import { StyleSheet, FlatList, Image, Platform, Pressable } from "react-native";

export default function EmojiList({ onSelect, onCloseModal }) {
  const [emoji] = useState([
    require("../assets/images/emoji1.png"),
    require("../assets/images/emoji2.png"),
    require("../assets/images/emoji3.png"),
    require("../assets/images/emoji4.png"),
    require("../assets/images/emoji5.png"),
    require("../assets/images/emoji6.png"),
  ]);

  /* FlatList renders all emoji images using an <Image> component wrapped with a <Pressable> component */

  return (
    <FlatList
      horizontal //the horizontal prop renders list horizontally instead of vertically
      showsHorizontalScrollIndicator={Platform.OS === "web"} //checks the platform using Platform module from RN and displays horizontal scroll bar only on the web
      data={emoji} //flatlist uses the the data prop to take an array of items
      contentContainerStyle={StyleSheet.listCointainer}
      renderItem={(
        { item, index } //the renderItem prop takes the item from the data={emoji} prop and returns the item in the list
      ) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}
        >
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});

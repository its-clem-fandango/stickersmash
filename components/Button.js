import { Pressable, StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

/* NOTES: custom button & props. React native button doesnt allow much customization */
export default function Button({ label, theme, onPress }) {
  /* Primary button component */
  if (theme === "primary") {
    return (
      /* By using inline styles here, the styles defined in Stylesheet.create are overriden, just like a CSS cascade */
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }

  /* NOTES: View is a UI component that works as a container and supports layout with flexbox, styles, touch handling and accessibility controls. */

  /* Default button component (no borders) */
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

/* NOTES: Native apps are styled using javascript instead of CSS. Most core components take a "style" prop for styling which accepts a javascript object as its value. The style names and values mostly correspond to how css works, except camel casing is used e.g. backgroundColor instead of background-color. The StyleSheet method is used create an object that contains your style rules */
const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});

import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function IconButton({ icon, label, onPress }) {
  return (
    <Pressable style={StyleSheet.IconButton} onPress={onPress}>
      {/* NOTES: JSX syntax - icon is a variable so you use {} to tell JSX to evaluate this variable and pass its value to the name prop. {24} is a number, in JS numbers are not wrapped in quotes so you use {} to pass it as a number. "#fff" is a string literal. Strings in JS are wrapped in quotes, and in JSX you pass them directly without {} */}
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text style={styles.IconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  IconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  IconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});

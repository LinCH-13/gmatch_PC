// app/about.tsx
import { Redirect } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the About Screen</Text>
      <Redirect href="/(tabs)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

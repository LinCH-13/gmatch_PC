import { View, Text, StyleSheet } from "react-native";

export default function resume() {
  return (
    <View style={styles.container}>
      <Text>技術者１</Text>
      <Text>技術者２</Text>
      <Text>技術者３</Text>
      <Text>技術者４</Text>
      <Text>技術者５</Text>
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

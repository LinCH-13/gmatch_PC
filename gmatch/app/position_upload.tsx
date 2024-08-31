import { View, Text, StyleSheet } from "react-native";

export default function position_upload() {
  return (
    <View style={styles.container}>
      <Text>案件１</Text>
      <Text>案件２</Text>
      <Text>案件３</Text>
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

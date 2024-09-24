import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
// Navigation
import { Link, Redirect } from "expo-router";

interface componentNameProps {}

const Index = (props: componentNameProps) => {
  return (
    <View style={styles.container}>
      <Text>Ihis is Index Page</Text>
      {/* redirect to sign in screen */}
      <Redirect href="/home" />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 48,
  },
});

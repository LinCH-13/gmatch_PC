import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#77eafc" },
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="index" />
      <Stack.Screen name="about" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

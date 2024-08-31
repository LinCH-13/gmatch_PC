// app(tabs)/_layout.tsx
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Tabs } from "expo-router";
// icon sample  https://icons.expo.fyi/Index
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "ホーム",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="position"
        options={{
          title: "案件",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "logo-yen" : "logo-yen"}
              color={color}
            />
          ),
        }}
      />
      {/* Add other tabs as needed */}
      <Tabs.Screen
        name="resume"
        options={{
          title: "技術者",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "body" : "body"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

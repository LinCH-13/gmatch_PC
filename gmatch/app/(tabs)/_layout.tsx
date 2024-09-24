import { Tabs } from 'expo-router';
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

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
      <Tabs.Screen
        name="resume"
        options={{
          title: "技術者",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "body" : "body"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="result"
        options={{
          title: "結果",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "list" : "list-outline"} color={color} />
          ),
        }}
      />
      {/* JobDetailScreen をタブに表示しない */}
      <Tabs.Screen 
        name="jobdetail" 
        options={{ 
          title: 'Job Detail',
          href: null // タブバーに表示しない
        }} 
      />
    </Tabs>
  );
}
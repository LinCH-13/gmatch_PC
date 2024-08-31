// navigation/Navigation.tsx

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../home";
import AboutScreen from "../about";
import SignupScreen from "../signup";
import TabsScreen from "../(tabs)/_layout";

import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="about" component={AboutScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="tabs" component={TabsScreen} />

        {/* <Stack.Screen name="index" component={IndexScreen} /> */}
        {/* Other screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

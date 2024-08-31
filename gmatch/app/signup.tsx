// necessary package
/*
npm install @react-navigation/native @react-navigation/stack
npm install @types/react @types/react-native
npm install react-native-screens react-native-safe-area-context

*/

// call API
import axios from "axios";
import { Text } from "react-native";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ensure you've installed @expo/vector-icons

// function key
//import "dotenv/config";
// Now you can use apiUrl and apiKey in your application
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./navigation/types";

export default function signup() {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "home">>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [organizationId, setOrganizationId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  //const navigation = useNavigation();
  //const apiUrl = process.env.API_URL;
  //const apiKey = process.env.API_KEY;
  const apiKey = "jWr2BOM4mkaug5jawQt3rNiYADhuxLZ9hoksSLhAFzOnAzFufbDDwA==";
  const apiUrl = "https://gmreguserfa.azurewebsites.net/api/gmreguserF";

  const handleSignUp = async () => {
    // Handle register logic here
    console.log("signup with", username, password, organizationId);
    setMessage("");
    setError("");
    try {
      console.log("msg:", "in try");
      console.log("Sending request to: ", apiUrl);
      console.log("key: ", apiKey);
      const response = await axios.post(
        apiUrl,
        {
          username,
          password,
          organizationId,
        },
        {
          headers: {
            "x-functions-key": apiKey,
            "Content-Type": "application/json",
          },
          //timeout: 3000, // Set a timeout of 3 seconds
        }
      );
      console.log("Response received:", response);
      console.log("resp msg:", response.status);
      if (response.status === 201) {
        setMessage("user register successfully!");
        //navigation.navigate("home");
      }
    } catch (error) {
      console.log("Got error1:", error);
      if (axios.isAxiosError(error)) {
        // TypeScript now knows that `error` is an AxiosError
        console.log("is err resp?:", error.response);
        if (error.response) {
          console.log("err resp:", error.response);
          setError(`Error: ${error.response.status} - ${error.response.data}`);
        } else {
          setError("Failed to sign in.");
        }
      } else {
        // Handle unexpected errors
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/gel-logo.png")}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />

          <View style={[styles.input, styles.passwordContainer]}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Organization ID"
            value={organizationId}
            onChangeText={setOrganizationId}
          />

          <Button title="Sign Up 8" onPress={handleSignUp} />
          {message ? (
            <Text style={styles.successMessage}>{message}</Text>
          ) : null}
          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
        </ThemedView>
      </ParallaxScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 8,
  },
  reactLogo: {
    // logo szie and position
    height: 50,
    width: 350,
    bottom: 50,
    left: 5,
    position: "absolute",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    flex: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  successMessage: {
    color: "green",
    marginTop: 12,
    textAlign: "center",
  },
  errorMessage: {
    color: "red",
    marginTop: 12,
    textAlign: "center",
  },
  signUpLink: {
    color: "blue",
    marginTop: 20,
    textAlign: "center",
  },
});

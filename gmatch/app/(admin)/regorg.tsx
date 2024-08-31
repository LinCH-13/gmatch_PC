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

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import { Link, Redirect } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";

export default function regorg() {
  console.log("---in login 1---");
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "about">>();

  const [organizationId, setOrganizationId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  //const navigation = useNavigation();
  //const apiUrl = process.env.API_URL;
  //const apiKey = process.env.API_KEY;
  const apiKey = "AUjY99bVlqqFDmio_UicA8M9fIWSupGeJs4_bBwyOCgeAzFu1Z4HQQ==";
  const apiUrl = "https://gmreguserfa.azurewebsites.net/api/gmsigninchkF";

  const handleLogin = async () => {
    // Handle login logic here
    console.log("Login with", organizationId);
    setMessage("");
    setError("");
    try {
      console.log("msg:", "in try");
      console.log("Sending request to: ", apiUrl);
      console.log("key: ", apiKey);
      const response = await axios.post(
        apiUrl,
        {
          organizationId,
        },
        {
          headers: {
            "x-functions-key": apiKey,
            "Content-Type": "application/json",
          },
          //timeout: 3000, // Set a timeout of 10 seconds
        }
      );
      console.log("Response received:", response);
      console.log("resp msg:", response.status);
      if (response.status === 200) {
        setMessage("register ORG successful 1 !");
        console.log("---in login 9: redirect to tabs---");
      }
    } catch (error) {
      console.error("Got Err:", error);
      if (axios.isAxiosError(error)) {
        // TypeScript now knows that `error` is an AxiosError
        if (error.response) {
          console.error("Err Resp sts:", error.response.status);
          console.error("Err Resp data:", error.response.data);
          setError(`Error: ${error.response.status} - ${error.response.data}`);
        } else {
          setError("Failed to register ORG.");
        }
      } else {
        // Handle unexpected errors
        setError("An unexpected error occurred.");
      }
    }
  };

  console.log("---in register ORG 2---");

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
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome to GMatch Register ORG! </ThemedText>
          <HelloWave />
        </ThemedView>

        <ThemedView style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            placeholder="Organization ID"
            value={organizationId}
            onChangeText={setOrganizationId}
          />

          <Button title="Register ORG" onPress={handleLogin} />
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

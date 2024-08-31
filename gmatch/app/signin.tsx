import axios from "axios";
import React, { useState, useRef } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./navigation/types";

export default function Login() {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "about">>();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [organizationId, setOrganizationId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [usernameBorderColor, setUsernameBorderColor] = useState("gray");
  const [passwordBorderColor, setPasswordBorderColor] = useState("gray");
  const [organizationBorderColor, setOrganizationBorderColor] =
    useState("gray");

  const usernameInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const organizationInputRef = useRef<TextInput>(null);

  const apiKey = "AUjY99bVlqqFDmio_UicA8M9fIWSupGeJs4_bBwyOCgeAzFu1Z4HQQ==";
  const apiUrl = "https://gmreguserfa.azurewebsites.net/api/gmsigninchkF";

  const handleLogin = async () => {
    // Reset border colors
    setUsernameBorderColor("gray");
    setPasswordBorderColor("gray");
    setOrganizationBorderColor("gray");

    // Input validation
    if (!username.trim()) {
      setError("Username 入力してください。");
      focusAndHighlight(setUsernameBorderColor, usernameInputRef);
      return;
    }
    if (!password.trim()) {
      setError("Password 入力してください。");
      focusAndHighlight(setPasswordBorderColor, passwordInputRef);
      return;
    }
    if (!organizationId.trim()) {
      setError("Organization ID 入力してください。");
      focusAndHighlight(setOrganizationBorderColor, organizationInputRef);
      return;
    }

    // Proceed with login if validation passes
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
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
        }
      );
      if (response.status === 201) {
        setMessage("Login successful 1 !");
        navigation.navigate("about");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(`Error: ${error.response.status} - ${error.response.data}`);
        } else {
          setError("Failed to sign in.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const focusAndHighlight = (
    setBorderColor: React.Dispatch<React.SetStateAction<string>>,
    ref: React.RefObject<TextInput>
  ) => {
    setBorderColor("red");
    ref.current?.focus();
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
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome to GMatch login! </ThemedText>
          <HelloWave />
        </ThemedView>

        <ThemedView style={styles.loginContainer}>
          <TextInput
            style={[styles.input, { borderColor: usernameBorderColor }]}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            ref={usernameInputRef}
          />
          <View
            style={[
              styles.input,
              styles.passwordContainer,
              { borderColor: passwordBorderColor },
            ]}
          >
            <TextInput
              style={{ flex: 1 }}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              ref={passwordInputRef}
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
            style={[styles.input, { borderColor: organizationBorderColor }]}
            placeholder="Organization ID"
            value={organizationId}
            onChangeText={setOrganizationId}
            ref={organizationInputRef}
          />

          <Button
            title="ロイン"
            onPress={handleLogin}
            disabled={isSubmitting}
          />
          {message ? (
            <Text style={styles.successMessage}>{message}</Text>
          ) : null}
          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

          <Link href="/signup" style={styles.signUpLink}>
            アカウント作成
          </Link>
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

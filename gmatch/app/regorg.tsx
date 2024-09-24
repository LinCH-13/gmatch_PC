import axios from "axios";
import { Text } from "react-native";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ensure you've installed @expo/vector-icons

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import { Link, Redirect } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./navigation/types";

export default function regorg() {
  console.log("---regorg 1---");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "about">>();

  const [organizationId, setOrganizationId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddr, setCompanyAddr] = useState("");
  const [companyTel, setCompanyTel] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyContact, setCompanyContact] = useState("");

  const [organizationIdBorderColor, setOrganizationIdBorderColor] =
    useState("gray");
  const [companyNameBorderColor, setCompanyNameBorderColor] = useState("gray");
  const [companyAddrBorderColor, setCompanyAddrBorderColor] = useState("gray");
  const [companyTelBorderColor, setCompanyTelBorderColor] = useState("gray");
  const [companyEmailBorderColor, setCompanyEmailBorderColor] =
    useState("gray");
  const [companyContactBorderColor, setCompanyContactBorderColor] =
    useState("gray");

  const organizationIdInputRef = useRef<TextInput>(null);
  const companyNameInputRef = useRef<TextInput>(null);
  const companyAddrInputRef = useRef<TextInput>(null);
  const companyTelInputRef = useRef<TextInput>(null);
  const companyEmailInputRef = useRef<TextInput>(null);
  const companyContactInputRef = useRef<TextInput>(null);

  const [loading, setLoading] = useState(false); // State to manage loading

  const apiKey = "jWr2BOM4mkaug5jawQt3rNiYADhuxLZ9hoksSLhAFzOnAzFufbDDwA==";
  const apiUrl =
    "https://gmreguserfa.azurewebsites.net/api/func-createAzureRes";

  const handleRegOrg = async () => {
    console.log("---regorg 2---");
    // Reset all border colors to default at the start of validation
    setOrganizationIdBorderColor("gray");
    setCompanyNameBorderColor("gray");
    setCompanyAddrBorderColor("gray");
    setCompanyTelBorderColor("gray");
    setCompanyEmailBorderColor("gray");
    setCompanyContactBorderColor("gray");

    let isValid = true;

    if (!organizationId.trim()) {
      setError("会社ID入力してください。");
      focusAndHighlight(setOrganizationIdBorderColor, organizationIdInputRef);
      isValid = false;
    }

    if (!isValid) {
      return;
    }
    if (!companyName.trim()) {
      setError("会社名入力してください。");
      focusAndHighlight(setCompanyNameBorderColor, companyNameInputRef);
      return;
    }
    if (!companyAddr.trim()) {
      setError("住所入力してください。");
      focusAndHighlight(setCompanyAddrBorderColor, companyAddrInputRef);
      return;
    }
    if (!companyTel.trim()) {
      setError("電話番号入力してください。");
      focusAndHighlight(setCompanyTelBorderColor, companyTelInputRef);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(companyEmail.trim())) {
      setError("有効なEメールアドレスを入力してください。");
      focusAndHighlight(setCompanyEmailBorderColor, companyEmailInputRef);
      return;
    }
    if (!companyEmail.trim()) {
      setError("Eメールアドレス入力してください。");
      focusAndHighlight(setCompanyEmailBorderColor, companyEmailInputRef);
      return;
    }
    if (!companyContact.trim()) {
      setError("連絡先入力してください。");
      focusAndHighlight(setCompanyContactBorderColor, companyContactInputRef);
      return;
    }

    setLoading(true); // Disable button
    setMessage("");
    setError("");
    try {
      const response = await axios.post(
        apiUrl,
        {
          organizationId,
          companyName,
          companyAddr,
          companyTel,
          companyEmail,
          companyContact,
        },
        {
          headers: {
            "x-functions-key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setError("");
        setMessage("会社登録が成功しました！");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            setError("認証エラー: APIキーが無効か期限切れの可能性があります。");
          } else {
            setError(
              `エラー: ${error.response.status} - ${error.response.data}`
            );
          }
        } else {
          setError(
            "会社登録に失敗しました。ネットワーク接続を確認してください。"
          );
        }
      } else {
        setError("予期せぬエラーが発生しました。");
      }
      console.error("Registration error:", error);
    } finally {
      setLoading(false); // Re-enable button
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
          <ThemedText type="title">会社登録 </ThemedText>
        </ThemedView>
        <ThemedView style={styles.loginContainer}>
          <TextInput
            style={[styles.input, { borderColor: organizationIdBorderColor }]}
            placeholder="会社ID"
            value={organizationId}
            onChangeText={setOrganizationId}
            editable={!loading} // Disable input when loading
          />
          <TextInput
            style={[styles.input, { borderColor: companyNameBorderColor }]}
            placeholder="会社名"
            value={companyName}
            onChangeText={setCompanyName}
            editable={!loading} // Disable input when loading
          />
          <TextInput
            style={[styles.input, { borderColor: companyAddrBorderColor }]}
            placeholder="住所"
            value={companyAddr}
            onChangeText={setCompanyAddr}
            editable={!loading} // Disable input when loading
          />
          <TextInput
            style={[styles.input, { borderColor: companyTelBorderColor }]}
            placeholder="電話番号"
            value={companyTel}
            onChangeText={setCompanyTel}
            editable={!loading} // Disable input when loading
          />
          <TextInput
            style={[styles.input, { borderColor: companyEmailBorderColor }]}
            placeholder="Eメールアドレス"
            value={companyEmail}
            onChangeText={setCompanyEmail}
            editable={!loading} // Disable input when loading
          />
          <TextInput
            style={[styles.input, { borderColor: companyContactBorderColor }]}
            placeholder="連絡先"
            value={companyContact}
            onChangeText={setCompanyContact}
            editable={!loading} // Disable input when loading
          />
          <Button
            title={loading ? "処理中..." : "登録"} // Display loading text
            onPress={handleRegOrg}
            disabled={loading} // Disable button when loading
          />
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
    textAlign: "center",
    gap: 5,
    padding: 8,
  },
  reactLogo: {
    // logo size and position
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
});

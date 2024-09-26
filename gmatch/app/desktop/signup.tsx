// necessary package
/*
npm install @react-navigation/native @react-navigation/stack
npm install @types/react @types/react-native
npm install react-native-screens react-native-safe-area-context

*/

// call API
import axios from "axios";
import { Text } from "react-native";
import React, { useState, useRef } from "react";
import { ThemedText } from "@/components/ThemedText"; // 自定义组件，应用主题文本
import { t } from 'i18next'; // i18n.t("") 简化 成 t("")

import {
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  useColorScheme
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ensure you've installed @expo/vector-icons

// function key
//import "dotenv/config";
// Now you can use apiUrl and apiKey in your application
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import Footer from './Footer';

export default function signup() {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "home">>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState(""); // 存储密码
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false); // 控制密码是否可见
  const [organizationId, setOrganizationId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  //const navigation = useNavigation();
  //const apiUrl = process.env.API_URL;
  //const apiKey = process.env.API_KEY;
  const apiKey = "jWr2BOM4mkaug5jawQt3rNiYADhuxLZ9hoksSLhAFzOnAzFufbDDwA==";
  const apiUrl = "https://gmreguserfa.azurewebsites.net/api/gmreguserF";


  const [usernameBorderColor, setUsernameBorderColor] = useState("gray");
  const [passwordBorderColor, setPasswordBorderColor] = useState("gray");
  const [password2BorderColor, setPassword2BorderColor] = useState("gray");
  const [organizationBorderColor, setOrganizationBorderColor] = useState("gray");

  const usernameInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const password2InputRef = useRef<TextInput>(null);
  const organizationInputRef = useRef<TextInput>(null);

  const focusAndHighlight = (
    setBorderColor: React.Dispatch<React.SetStateAction<string>>,
    ref: React.RefObject<TextInput>
  ) => {
    setBorderColor("red");
    ref.current?.focus();
  };


  const handleSignUp = async () => {

    // 重置边框颜色 不重置 红框会一直显示
    setUsernameBorderColor("gray");
    setPasswordBorderColor("gray");
    setPassword2BorderColor("gray");
    setOrganizationBorderColor("gray");

    // 输入验证
    if (!username.trim()) {
      setError(t('Username 入力してください'));
      focusAndHighlight(setUsernameBorderColor, usernameInputRef);
      console.log('翻译',t('Username 入力してください'));
      return;
    }
    if (!password.trim()) {
      setError(t("Password 入力してください"));
      focusAndHighlight(setPasswordBorderColor, passwordInputRef);
      return;
    }
    if (!password2.trim()) {
      setError(t("Password Check入力してください"));
      focusAndHighlight(setPassword2BorderColor, password2InputRef);
      return;
    }
    if (!organizationId.trim()) {
      setError(t("Organization ID 入力してください"));
      focusAndHighlight(setOrganizationBorderColor, organizationInputRef);
      return;
    }
    if (password != password2) {
      setError(t("パスワードが一致しません"));
      focusAndHighlight(setPasswordBorderColor, passwordInputRef);
      focusAndHighlight(setPassword2BorderColor, password2InputRef);
      return;
    }


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
          //timeout: 3000, // 设置请求超时时间为 3 秒
        }
      );
      console.log("Response received:", response);
      console.log("resp msg:", response.status);
      if (response.status === 201) {
        setMessage("ユーザー登録が完了しました！");
        //navigation.navigate("home");
      }
    } catch (error) {
      console.log("エラーが発生しました (signup):", error);
      if (axios.isAxiosError(error)) {
        // TypeScript 现在知道 `Error` 是 AxiosError 类型
        console.log("エラー応答ですか？:", error.response);
        if (error.response) {

          // 获取错误消息，并翻译     
          const translatedErrorMsg = t(error.response.data);

          console.log("エラー応答:", error.response);
          
          //setError(`Error: ${error.response.status} - ${error.response.data}`);
          setError(`Error: ${error.response.status} - ${translatedErrorMsg}`);
        } else {
          setError("サインインに失敗しました");
        }
      } else {
        // Handle unexpected errors
        setError("予期しないエラーが発生しました");
      }
    }
  };

  const colorScheme = useColorScheme(); // 获取当前的颜色模式 提供暗黑模式切换判断

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#AEDDB5FF", dark: "#1F802CFF" }}
        headerImage={
          <View style={styles.imageContainer}>
            <Image
              source={require("@/assets/images/gel-logo-img.png")}
              style={styles.reactLogoImg}
            />
            <Image
              source={require("@/assets/images/gel-logo-text.png")}
              style={styles.reactLogoText}
            />
          </View>
        }
      >

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title"> {t("Gmatch アカウント作成")} </ThemedText>
        </ThemedView>

        <ThemedView style={styles.loginContainer}>

          <View style={[styles.row]}>
            <ThemedText type="title" style={styles.label}>{t('ユーザ名')}</ThemedText>
            <TextInput
              style={[styles.input,
              {
                borderColor: usernameBorderColor,
                color: colorScheme === 'dark' ? 'white' : 'black' // 动态设置文字颜色
              }]}
              placeholder="Username"
              autoComplete="off"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          {/* -------------------------------------------------- */}
          <View style={[styles.row]}>
            <ThemedText type="title" style={styles.label}>{t('パスワード')}</ThemedText>
            <View style={[styles.input, styles.passwordContainer,
            { borderColor: passwordBorderColor },]}>
              <TextInput
                style={[
                  {
                    flex: 1,
                    color: colorScheme === 'dark' ? 'white' : 'black' // 动态设置文字颜色
                  }]}
                placeholder="Password"
                autoComplete="off"
                secureTextEntry={!showPassword}
                value={password}

                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color={colorScheme === 'dark' ? 'white' : 'black'}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* -------------------------------------------------- */}
          <View style={[styles.row]}>
            <ThemedText type="title" style={styles.label}>{t('パスワード確認')}</ThemedText>
            <View style={[
              styles.input,
              styles.passwordContainer,
              { borderColor: password2BorderColor },]}>
              <TextInput
                style={[
                  {
                    flex: 1,
                    color: colorScheme === 'dark' ? 'white' : 'black' // 动态设置文字颜色
                  }]}
                placeholder="Password Check"
                secureTextEntry={!showPassword2}
                value={password2}
                onChangeText={setPassword2}
              />
              <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)}>
                <Ionicons
                  name={showPassword2 ? "eye" : "eye-off"}
                  size={24}
                  color={colorScheme === 'dark' ? 'white' : 'black'}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* -------------------------------------------------- */}
          <View style={[styles.row]}>
            <ThemedText type="title" style={styles.label}>{t("組織ID")}</ThemedText>
            <TextInput
              style={[styles.input,
              {
                borderColor: organizationBorderColor,
                color: colorScheme === 'dark' ? 'white' : 'black' // 动态设置文字颜色
              }]}
              placeholder="Organization ID"
              value={organizationId}
              onChangeText={setOrganizationId}
            />
          </View>
          {/* -------------------------------------------------- */}
          <Button title={t("サインイン")} onPress={handleSignUp} />
          {message ? (
            <Text style={styles.successMessage}>{message}</Text>
          ) : null}
          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
        </ThemedView>
      </ParallaxScrollView>
      <Footer />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // 纵向居中
    alignItems: 'center', // 横向居中

  },
  row: {
    flexDirection: 'row', // 让文字和输入框在一行
    alignItems: 'center', // 垂直居中对齐
    justifyContent: 'center', // 纵向居中
    marginBottom: 10,
  },
  label: {
    textAlign: "right",
    width: 120, // 固定宽度，确保文字部分不占太多空间
    fontSize: 17,
    height: 50,
    marginRight: 10, // 留一点间距给输入框
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
  imageContainer: {
    alignItems: "center", // 垂直居中
    justifyContent: 'center', // 纵向居中
    flexDirection: "row",
  },
  reactLogoImg: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
  reactLogoText: {
    height: 40,
    width: 450,
    flex: 1, // 输入框占满剩下的宽度
    resizeMode: "contain",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    flex: 1, // 输入框占满剩下的宽度
    height: 40,
    borderWidth: 1,//边框的粗度
    paddingHorizontal: 10,
    width: 250,
    borderColor: "gray", //边框的颜色
    marginBottom: 15,
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

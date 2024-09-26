import axios from "axios";
import React, { useState, useRef } from "react";
import { t } from 'i18next'; // 采用 t("") 进行翻译

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
  useColorScheme
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import Footer from './Footer';

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
  const [organizationBorderColor, setOrganizationBorderColor] = useState("gray");

  const usernameInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const organizationInputRef = useRef<TextInput>(null);

  const apiKey = "AUjY99bVlqqFDmio_UicA8M9fIWSupGeJs4_bBwyOCgeAzFu1Z4HQQ==";
  const apiUrl = "https://gmreguserfa.azurewebsites.net/api/gmsigninchkF";

  const handleLogin = async () => {
    // 重置输入框边框颜色
    setUsernameBorderColor("gray");
    setPasswordBorderColor("gray");
    setOrganizationBorderColor("gray");

    // 输入验证
    if (!username.trim()) {
      setError(t("Username 入力してください"));
      focusAndHighlight(setUsernameBorderColor, usernameInputRef);
      return;
    }
    if (!password.trim()) {
      setError(t("Password 入力してください"));
      focusAndHighlight(setPasswordBorderColor, passwordInputRef);
      return;
    }
    if (!organizationId.trim()) {
      setError(t("Organization ID 入力してください"));
      focusAndHighlight(setOrganizationBorderColor, organizationInputRef);
      return;
    }

    // 输入验证通过后，进行登录
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
        setMessage("ログイン成功！(signin)");
        navigation.navigate("about");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(`Error: ${error.response.status} - ${error.response.data}`);
        } else {
          setError("ログインに失敗しました");
        }
      } else {
        setError("予期しないエラーが発生しました");
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

  const colorScheme = useColorScheme(); // 获取当前的颜色模式

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
<ParallaxScrollView
        headerBackgroundColor={{ light: "#DCFFE1FF", dark: "#3ab54a" }}
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
          <ThemedText type="title">{t("ようこそGMatchの管理画面へ")}</ThemedText>
          <ThemedText type="title"></ThemedText>
          <HelloWave />
        </ThemedView>

        {/* -------------------------------------------------- */}
        <ThemedView style={styles.loginContainer}>
          <View style={styles.row}>
            <Text style={[styles.label,
            {
              color: colorScheme === 'dark' ? 'white' : 'black' // 动态设置文字颜色
            }]}
            >{t("ユーザ名")}</Text>
            <TextInput
              style={[styles.input,
              {
                borderColor: usernameBorderColor,
                color: colorScheme === 'dark' ? 'white' : 'black' // 动态设置文字颜色
              }]}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              ref={usernameInputRef}
            />
          </View>
          {/* -------------------------------------------------- */}
          <View style={[styles.row]}>
            <Text style={[styles.label,
            {
              color: colorScheme === 'dark' ? 'white' : 'black' // 动态设置文字颜色
            }]} >{t('パスワード')}</Text>
            <View
              style={[
                styles.input,
                styles.passwordContainer,
                { borderColor: passwordBorderColor },
              ]}
            >
              <TextInput
                style={[{
                  flex: 1,
                  color: colorScheme === 'dark' ? 'white' : 'black' // 动态设置文字颜色
                }]}
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
                  color={colorScheme === 'dark' ? 'white' : 'black'}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* -------------------------------------------------- */}
          <View style={[styles.row]}>
            <Text style={[styles.label,
            {
              color: colorScheme === 'dark' ? 'white' : 'black' // 动态设置文字颜色
            }]} >組織ID</Text>
            <TextInput
              style={[styles.input,
              {
                borderColor: organizationBorderColor,
                color: colorScheme === 'dark' ? 'white' : 'black' // 动态设置文字颜色
              }]}
              placeholder="Organization ID"
              value={organizationId}
              onChangeText={setOrganizationId}
              ref={organizationInputRef}
            />
          </View>
          {/* -------------------------------------------------- */}
          <Button
            title={t("ログイン")}
            onPress={handleLogin}
            disabled={isSubmitting}
          />
          {message ? (
            <Text style={styles.successMessage}>{message}</Text>
          ) : null}
          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

          <Link href="./signup" style={styles.signUpLink}>
            {t('アカウント作成')}
          </Link>
          <Link href="/" style={styles.signUpLink}>
          {t('パスワードを忘れた方')} (未实装)
          </Link>
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
    textAlign:"right",
    width: 120, // 固定宽度，确保文字部分不占太多空间
    fontSize: 17,
    height: 40,
    marginRight: 10, // 留一点间距给输入框
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 5,
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
    paddingHorizontal: 20, // 确保内容左右留白
    flex: 1,
    justifyContent: "center",
    padding: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",//边框的颜色
    borderWidth: 1,//边框的粗度
    marginBottom: 15,
    paddingHorizontal: 10,
    flex: 1, // 输入框占满剩下的宽度
    width: 250,
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
    textDecorationLine: "underline", // 添加下划线
  },

});

import * as React from "react";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
// Navigation
import { Link, Redirect } from "expo-router";

interface componentNameProps {}

const Index = (props: componentNameProps) => {

  // 使用 User Agent 检测设备类型，重定向PC端或移动端
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad|ipod/.test(userAgent);
    setRedirectPath(isMobile ? "/signin" : "/desktop/signin");
  }, []);

  if (redirectPath) {
    return <Redirect href={redirectPath as any} />; //避免href报错，强制转换为 any
  }

  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 48,
  },
});

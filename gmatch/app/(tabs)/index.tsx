// app/home.tsx
import { Image } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export default function Home() {
  console.log("---in home 1---");
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#3ab54a", dark: "#5B7E60FF" }}
      headerImage={
        <Image
          source={require("@/assets/images/gel-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <View>
          <ThemedText style={styles.orangeText} type="title">
            Gマッチへようこそ!
          </ThemedText>
        </View>
      </ThemedView>

      <ThemedView>
        <View>
          <Text style={styles.signUpLink}>
            <Link href="../../position_upload">案件情報アップロード</Link>
          </Text>
        </View>
        <View>
          <Text>-----------------------------------------------</Text>
        </View>
        <View>
          <Text style={styles.signUpLink}>
            <Link href="../../resume_upload">技術者情報アップロード</Link>
          </Text>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    color: "red",
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
  signUpLinkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  signUpLink: {
    color: "blue",
    textAlign: "center",
  },
  orangeText: {
    color: "orange", // Set the color to orange
  },
});

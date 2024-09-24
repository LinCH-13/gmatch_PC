import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView"; // Assuming you have this component
import { Ionicons } from "@expo/vector-icons"; // Ensure you've installed @expo/vector-icons

interface Result {
  flag: string;
  filename1: string;
  matchedposition1: string;
  filename2: string;
  matchedposition2: string;
  filename3: string;
  matchedposition3: string;
}

export default function ResultList() {
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState("");

  const apiKey = "jWr2BOM4mkaug5jawQt3rNiYADhuxLZ9hoksSLhAFzOnAzFufbDDwA=="; // Replace with your actual API key
  const apiUrl = "https://gmreguserfa.azurewebsites.net/api/func_get_result"; // Replace with your actual API URL
  const orgid_user = "orgid_username"; // Replace with your actual orgid_user value

  useEffect(() => {
    const getresult = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "x-functions-key": apiKey,
            "Content-Type": "application/json",
          },
          params: {
            orgid_username: orgid_user,
          },
          timeout: 10000, // 10 seconds
        });
        setResults(response.data);
      } catch (error) {
        console.error("Error getting result:", error);
        setError("Failed to get result.");
      }
    };

    getresult();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {results.length > 0 ? (
          results.map((result, index) => (
            <View key={index} style={styles.resumeCard}>
              <Text style={styles.resumeText}>案件/技術者：{result.flag}</Text>
              <Text style={styles.resumeText}>
                マッチング＃１ファイル：{result.filename1}
              </Text>
              <Text style={styles.resumeText}>
                マッチング＃１概要：{result.matchedposition1}
              </Text>
              <Text style={styles.resumeText}>
                マッチング＃２ファイル：{result.filename2}
              </Text>
              <Text style={styles.resumeText}>
                マッチング＃２概要：{result.matchedposition2}
              </Text>
              <Text style={styles.resumeText}>
                マッチング＃３ファイル：{result.filename3}
              </Text>
              <Text style={styles.resumeText}>
                マッチング＃３概要：{result.matchedposition3}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noResumesText}>
            {error ? error : "マッチング結果がありません。"}
          </Text>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContainer: {
    paddingVertical: 16,
  },
  resumeCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    elevation: 2,
  },
  resumeText: {
    fontSize: 16,
    marginBottom: 8,
  },
  noResumesText: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
  },
});

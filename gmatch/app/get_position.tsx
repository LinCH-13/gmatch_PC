import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView"; // Assuming you have this component
import { Ionicons } from "@expo/vector-icons"; // Ensure you've installed @expo/vector-icons

interface Result {
  OS: string;
  descr: string;
  en_level: string;
  industry: string;
  ja_level: string;
  location: string;
  other: string;
  price: string;
  remote: string;
  required_skill1: string;
  required_skill2: string;
  required_skill3: string;
}

export default function ResultList() {
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState("");

  const apiKey = "jWr2BOM4mkaug5jawQt3rNiYADhuxLZ9hoksSLhAFzOnAzFufbDDwA=="; // Replace with your actual API key
  const apiUrl = "https://gmreguserfa.azurewebsites.net/api/func_get_position"; // Replace with your actual API URL
  const orgid_user = "orgid_user"; // Replace with your actual orgid_user value

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
              <Text style={styles.resumeText}>案件概要：{result.descr}</Text>
              <Text style={styles.resumeText}>業務概要：{result.industry}</Text>
              <Text style={styles.resumeText}>
                作業場所 ：{result.location}
              </Text>
              <Text style={styles.resumeText}>単価：{result.price}</Text>
              <Text style={styles.resumeText}>
                日本語レベル：{result.ja_level}
              </Text>
              <Text style={styles.resumeText}>リモート：{result.remote}</Text>
              <Text style={styles.resumeText}>
                スキル１：{result.required_skill1}
              </Text>
              <Text style={styles.resumeText}>
                スキル２：{result.required_skill2}
              </Text>
              <Text style={styles.resumeText}>
                スキル３：{result.required_skill3}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noResumesText}>
            {error ? error : "案件情報がありません。"}
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

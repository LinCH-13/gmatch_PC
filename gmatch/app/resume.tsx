import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView"; // Assuming you have this component
import { Ionicons } from "@expo/vector-icons"; // Ensure you've installed @expo/vector-icons

interface Resume {
  firstName: string;
  lastName: string;
  station: string;
  experienceYear: string;
  integrationTest: string;
  basicDesign: string;
  detailDesign: string;
  coding: string;
  jaLevel: string;
  enLevel: string;
}

export default function ResumeList() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [error, setError] = useState("");

  const apiKey = "jWr2BOM4mkaug5jawQt3rNiYADhuxLZ9hoksSLhAFzOnAzFufbDDwA=="; // Replace with your actual API key
  const apiUrl = "https://gmreguserfa.azurewebsites.net/api/func_get_resume"; // Replace with your actual API URL
  const orgid_user = "orgid_username"; // Replace with your actual orgid_user value

  useEffect(() => {
    const fetchResumes = async () => {
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
        setResumes(response.data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
        setError("Failed to load resumes1.");
      }
    };

    fetchResumes();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {resumes.length > 0 ? (
          resumes.map((resume, index) => (
            <View key={index} style={styles.resumeCard}>
              <Text style={styles.resumeText}>
                名前：{resume.lastName} {resume.firstName}
              </Text>
              <Text style={styles.resumeText}>最近駅：{resume.station}</Text>
              <Text style={styles.resumeText}>
                経験年数：{resume.experienceYear}
              </Text>
              <Text style={styles.resumeText}>
                スキル：{resume.integrationTest}
              </Text>
              <Text style={styles.resumeText}>
                工程：{resume.basicDesign} + {resume.detailDesign} +{" "}
                {resume.coding}
              </Text>
              <Text style={styles.resumeText}>
                日本語レベル：{resume.jaLevel}
              </Text>
              <Text style={styles.resumeText}>
                英語レベル：{resume.enLevel}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noResumesText}>
            {error ? error : "No resumes available."}
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

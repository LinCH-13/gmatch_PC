import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./navigation/types";
//import * as DocumentPicker from "expo-document-picker";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export default function FileUpload() {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "about">>();

  const [fileUri, setFileUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiKey = "jWr2BOM4mkaug5jawQt3rNiYADhuxLZ9hoksSLhAFzOnAzFufbDDwA==";
  const apiUrl =
    "https://gmreguserfa.azurewebsites.net/api/func_upload_position";
  //const apiUrl = "https://yourapiendpoint.com/upload"; // Replace with your API endpoint

  const handleFilePick = async () => {
    try {
      if (Platform.OS === "web") {
        // Web-specific file picking
        const input = document.createElement("input");
        input.type = "file";
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            setFileUri(URL.createObjectURL(file));
            setFileName(file.name);
            setFileType(file.type || "application/octet-stream");
            setError(null);
          }
        };
        input.click();
      } else {
        // Mobile platforms
        const result = await DocumentPicker.getDocumentAsync({
          type: "*/*", // Allows all file types
        });

        if (result.canceled) {
          setError("File selection was canceled.");
          return;
        }

        if (result.assets && result.assets.length > 0) {
          const file = result.assets[0];
          setFileUri(file.uri);
          setFileName(file.name);
          setFileType(file.mimeType || "application/octet-stream");
          setError(null);
        } else {
          setError("No file was selected. Please try again.");
        }
      }
    } catch (err) {
      console.error("Error picking document:", err);
      setError("An error occurred while selecting the file. Please try again.");
    }
  };

  const handleUpload = async () => {
    if (!fileUri || !fileName || !fileType) {
      setError("Please select a file to upload.");
      return;
    }

    setMessage(null);
    setError(null);
    setIsSubmitting(true);

    try {
      let fileContent;

      if (Platform.OS === "web") {
        // Web-specific file handling
        const response = await fetch(fileUri);
        const blob = await response.blob();
        fileContent = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      } else {
        // Mobile platforms
        fileContent = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      }

      const response = await axios.post(
        apiUrl,
        {
          fileName: fileName,
          fileContent: fileContent,
          contentType: fileType,
        },
        {
          headers: {
            "x-functions-key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response body:", response.data);

      if (response.status === 200) {
        setMessage("File uploaded successfully!");
        setFileUri(null);
        setFileName(null);
        setFileType(null);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload file. " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearSelection = () => {
    setFileUri(null);
    setFileName(null);
    setFileType(null);
    setError(null);
    setMessage(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Upload File</Text>
      </View>

      <View style={styles.uploadContainer}>
        <TouchableOpacity onPress={handleFilePick} style={styles.filePicker}>
          <Text style={styles.filePickerText}>Select File</Text>
        </TouchableOpacity>
        {fileName && (
          <View style={styles.fileInfo}>
            <Text>Selected File: {fileName}</Text>
            <TouchableOpacity
              onPress={clearSelection}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        <Button
          title="Upload"
          onPress={handleUpload}
          disabled={isSubmitting || !fileUri}
        />
        {isSubmitting && <ActivityIndicator size="large" color="#0000ff" />}
        {message && <Text style={styles.successMessage}>{message}</Text>}
        {error && <Text style={styles.errorMessage}>{error}</Text>}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  uploadContainer: {
    flex: 1,
    justifyContent: "center",
  },
  filePicker: {
    backgroundColor: "#A1CEDC",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  filePickerText: {
    color: "#fff",
  },
  fileInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: "#ff6b6b",
    padding: 5,
    borderRadius: 5,
  },
  clearButtonText: {
    color: "#fff",
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

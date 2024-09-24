import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, RefreshControl } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

interface Resume {
  firstName: string;
  lastName: string;
  region: string;
  station: string;
  basicDesign: string;
  coding: string;
  detailDesign: string;
  enLevel: string;
  experienceYear: string;
  integrationTest: string;
  jaLevel: string;
  languageSkill1: string;
  languageSkill2: string;
  languageSkill3: string;
  projectManagement: string;
  remoteWork: string;
}

const ResumePage = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [filteredResumes, setFilteredResumes] = useState<Resume[]>([]);
  const [error, setError] = useState<string>("");
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [filterJapaneseLevel, setFilterJapaneseLevel] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const apiKey = "1Bn-c7hBFE6a1j_8mWzkXLPDEif86sgxvUpCnJkwMZvwAzFuKhfpVg==";
  const apiUrl = "https://gmreguserfa.azurewebsites.net/api/func_get_resume";
  const orgid_user = "orgid_user";

  const fetchResumes = useCallback(async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "x-functions-key": apiKey,
          "Content-Type": "application/json",
        },
        params: {
          orgid_username: orgid_user,
        },
        timeout: 10000,
      });
      console.log('API Response:', response.data);
      setResumes(response.data);
      setFilteredResumes(response.data);
      setError("");
    } catch (error) {
      console.error("Error getting resumes:", error);
      setError("履歴書情報の取得に失敗しました。");
    }
  }, []);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchResumes();
    setRefreshing(false);
  }, [fetchResumes]);

  const applyFilter = () => {
    const filtered = resumes.filter(resume => 
      (resume.firstName.toLowerCase().includes(filterKeyword.toLowerCase()) ||
       resume.lastName.toLowerCase().includes(filterKeyword.toLowerCase()) ||
       resume.languageSkill1.toLowerCase().includes(filterKeyword.toLowerCase()) ||
       resume.languageSkill2.toLowerCase().includes(filterKeyword.toLowerCase()) ||
       resume.languageSkill3.toLowerCase().includes(filterKeyword.toLowerCase())) &&
      (filterJapaneseLevel === "" || resume.jaLevel === filterJapaneseLevel)
    );
    setFilteredResumes(filtered);
    setFilterModalVisible(false);
  };

  const resetFilter = () => {
    setFilterKeyword("");
    setFilterJapaneseLevel("");
    setFilteredResumes(resumes);
    setFilterModalVisible(false);
  };

  if (error) {
    return (
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.errorText}>{error}</Text>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.smallButton} onPress={() => setFilterModalVisible(true)}>
          <Text style={styles.buttonText}>フィルター</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredResumes.length > 0 ? (
          filteredResumes.map((resume, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.title}>{`${resume.lastName} ${resume.firstName}`}</Text>
              <Text>地域: {resume.region}</Text>
              <Text>最寄り駅: {resume.station}</Text>
              <Text>経験年数: {resume.experienceYear}年</Text>
              <Text>日本語レベル: {resume.jaLevel}</Text>
              <Text>英語レベル: {resume.enLevel}</Text>
              <Text>リモートワーク: {resume.remoteWork}</Text>
              <Text>スキル: {[resume.languageSkill1, resume.languageSkill2, resume.languageSkill3].filter(Boolean).join(', ')}</Text>
              <Text>基本設計: {resume.basicDesign}</Text>
              <Text>詳細設計: {resume.detailDesign}</Text>
              <Text>コーディング: {resume.coding}</Text>
              <Text>結合テスト: {resume.integrationTest}</Text>
              <Text>プロジェクト管理: {resume.projectManagement}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noResumesText}>履歴書情報がありません。</Text>
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            onChangeText={setFilterKeyword}
            value={filterKeyword}
            placeholder="キーワード検索"
          />
          <Picker
            selectedValue={filterJapaneseLevel}
            onValueChange={(itemValue) => setFilterJapaneseLevel(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="日本語レベルを選択" value="" />
            <Picker.Item label="N1" value="N1" />
            <Picker.Item label="N2" value="N2" />
            <Picker.Item label="N3" value="N3" />
            <Picker.Item label="N4" value="N4" />
            <Picker.Item label="N5" value="N5" />
          </Picker>
          <TouchableOpacity style={styles.button} onPress={applyFilter}>
            <Text style={styles.buttonText}>フィルターを適用</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={resetFilter}>
            <Text style={styles.buttonText}>リセット</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  item: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  smallButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
  noResumesText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
  picker: {
    height: 50,
    width: '80%',
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
});

export default ResumePage;

import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

interface Result {
  OS: string;
  descr: string;
  en_level: string;
  industry: string;
  ja_level: string;
  location: string;
  price: string;
  remote: string;
  skill: string;
}

const PositionPage = () => {
  const router = useRouter();
  const [results, setResults] = useState<Result[]>([]);
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);
  const [error, setError] = useState<string>("");
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [filterJaLevel, setFilterJaLevel] = useState("");
  const [filterRemote, setFilterRemote] = useState("");
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  const apiKey = "jWr2BOM4mkaug5jawQt3rNiYADhuxLZ9hoksSLhAFzOnAzFufbDDwA==";
  const apiUrl = "https://gmreguserfa.azurewebsites.net/api/func_get_position";
  const orgid_user = "orgid_user";

  const fetchPositions = useCallback(async () => {
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
      console.log('API Response:', response.data);
      setResults(response.data);
      setFilteredResults(response.data);
      setError("");
    } catch (error) {
      console.error("Error getting positions:", error);
      setError("案件情報の取得に失敗しました。");
    }
  }, []);

  useEffect(() => {
    fetchPositions();
  }, [fetchPositions]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPositions();
    setRefreshing(false);
  }, [fetchPositions]);

  const applyFilter = () => {
    const filtered = results.filter(job => 
      (job.descr.toLowerCase().includes(filterKeyword.toLowerCase()) ||
       job.skill.toLowerCase().includes(filterKeyword.toLowerCase())) &&
      (filterIndustry === "" || job.industry === filterIndustry) &&
      (filterJaLevel === "" || job.ja_level === filterJaLevel) &&
      (filterRemote === "" || job.remote === filterRemote) &&
      (filterMinPrice === "" || parseInt(job.price) >= parseInt(filterMinPrice)) &&
      (filterMaxPrice === "" || parseInt(job.price) <= parseInt(filterMaxPrice))
    );
    setFilteredResults(filtered);
    setFilterModalVisible(false);
  };

  const resetFilter = () => {
    setFilterKeyword("");
    setFilterIndustry("");
    setFilterJaLevel("");
    setFilterRemote("");
    setFilterMinPrice("");
    setFilterMaxPrice("");
    setFilteredResults(results);
    setFilterModalVisible(false);
  };

  const toggleJobDetails = (index: number) => {
    setExpandedJobId(expandedJobId === index ? null : index);
  };

  const renderJobDetails = (job: Result) => {
    return (
      <View style={styles.expandedDetails}>
        <Text>OS: {job.OS}</Text>
        <Text>英語レベル: {job.en_level}</Text>
        <Text>スキル: {job.skill}</Text>
        {/* 他の詳細情報を追加 */}
      </View>
    );
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
        {filteredResults.length > 0 ? (
          filteredResults.map((job, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.title}>{job.descr}</Text>
              <Text>業務概要: {job.industry}</Text>
              <Text>作業場所: {job.location}</Text>
              <Text>単価: {job.price}</Text>
              <Text>日本語レベル: {job.ja_level}</Text>
              <Text>リモート: {job.remote}</Text>
              <TouchableOpacity 
                style={styles.smallButton} 
                onPress={() => router.push({
                  pathname: "/jobdetail",
                  params: { job: JSON.stringify(job) }
                })}
              >
                <Text style={styles.buttonText}>詳細</Text>
              </TouchableOpacity>
              {expandedJobId === index && renderJobDetails(job)}
            </View>
          ))
        ) : (
          <Text style={styles.noJobsText}>案件情報がありません。</Text>
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
            selectedValue={filterIndustry}
            onValueChange={(itemValue) => setFilterIndustry(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="業種を選択" value="" />
            <Picker.Item label="IT" value="IT" />
            <Picker.Item label="製造業" value="製造業" />
            <Picker.Item label="サービス業" value="サービス業" />
          </Picker>
          <Picker
            selectedValue={filterJaLevel}
            onValueChange={(itemValue) => setFilterJaLevel(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="日本語レベルを選択" value="" />
            <Picker.Item label="N1" value="N1" />
            <Picker.Item label="N2" value="N2" />
            <Picker.Item label="N3" value="N3" />
          </Picker>
          <Picker
            selectedValue={filterRemote}
            onValueChange={(itemValue) => setFilterRemote(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="リモートワークを選択" value="" />
            <Picker.Item label="可" value="可" />
            <Picker.Item label="不可" value="不可" />
          </Picker>
          <View style={styles.priceInputContainer}>
            <TextInput
              style={styles.priceInput}
              onChangeText={setFilterMinPrice}
              value={filterMinPrice}
              placeholder="最小単価"
              keyboardType="numeric"
            />
            <Text style={styles.priceSeparator}>～</Text>
            <TextInput
              style={styles.priceInput}
              onChangeText={setFilterMaxPrice}
              value={filterMaxPrice}
              placeholder="最大単価"
              keyboardType="numeric"
            />
          </View>
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
  noJobsText: {
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
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  priceInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '35%',
  },
  priceSeparator: {
    marginHorizontal: 10,
  },
  expandedDetails: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
});

export default PositionPage;
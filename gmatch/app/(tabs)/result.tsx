import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, RefreshControl } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

interface Result {
  PartitionKey: string;
  RowKey: string;
  flag: string;
  filename1: string;
  matchedposition1: string;
  filename2: string;
  matchedposition2: string;
  filename3: string;
  matchedposition3: string;
}

const ResultPage = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);
  const [error, setError] = useState<string>("");
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [filterFlag, setFilterFlag] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const apiKey = "DtEH-3_SR44HXsbEO875r6WrGsPZvl3P7lb2Idh1ioy1AzFuEDnvkA==";
  const apiUrl = "https://gmreguserfa.azurewebsites.net/api/func_get_result";
  const orgid_user = "orgid_user";

  const fetchResults = useCallback(async () => {
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
      setResults(response.data);
      setFilteredResults(response.data);
      setError("");
    } catch (error) {
      console.error("Error getting results:", error);
      setError("結果情報の取得に失敗しました。");
    }
  }, []);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchResults();
    setRefreshing(false);
  }, [fetchResults]);

  const applyFilter = () => {
    const filtered = results.filter(result => 
      (result.matchedposition1.toLowerCase().includes(filterKeyword.toLowerCase()) ||
       result.matchedposition2.toLowerCase().includes(filterKeyword.toLowerCase()) ||
       result.matchedposition3.toLowerCase().includes(filterKeyword.toLowerCase())) &&
      (filterFlag === "" || result.flag === filterFlag)
    );
    setFilteredResults(filtered);
    setFilterModalVisible(false);
  };

  const resetFilter = () => {
    setFilterKeyword("");
    setFilterFlag("");
    setFilteredResults(results);
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
        {filteredResults.length > 0 ? (
          filteredResults.map((result, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.title}>結果 {result.RowKey}</Text>
              <Text>フラグ: {result.flag}</Text>
              <Text>マッチした職位1: {result.matchedposition1}</Text>
              <Text>ファイル名1: {result.filename1}</Text>
              <Text>マッチした職位2: {result.matchedposition2}</Text>
              <Text>ファイル名2: {result.filename2}</Text>
              <Text>マッチした職位3: {result.matchedposition3}</Text>
              <Text>ファイル名3: {result.filename3}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noResultsText}>結果情報がありません。</Text>
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
            selectedValue={filterFlag}
            onValueChange={(itemValue) => setFilterFlag(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="フラグを選択" value="" />
            <Picker.Item label="フラグ1" value="flag1" />
            <Picker.Item label="フラグ2" value="flag2" />
            <Picker.Item label="フラグ3" value="flag3" />
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
  noResultsText: {
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
  salaryInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  salaryInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '35%',
  },
  salarySeparator: {
    marginHorizontal: 10,
  },
});

export default ResultPage;
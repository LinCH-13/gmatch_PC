import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

interface JobData {
  descr: string;
  industry: string;
  location: string;
  price: string;
  ja_level: string;
  en_level: string;
  remote: string;
  OS: string;
  skill: string;
  // 他の必要なプロパティがあれば追加してください
}

export default function JobDetail() {
  const { job } = useLocalSearchParams();
  const jobData: JobData | null = job ? JSON.parse(job as string) : null;

  if (!jobData) {
    return <Text>Job data not found</Text>;
  }

  const renderDetailItem = (label: string, value: string) => (
    <View style={styles.detailItem}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{jobData.descr}</Text>
      {renderDetailItem('業務概要', jobData.industry)}
      {renderDetailItem('作業場所', jobData.location)}
      {renderDetailItem('単価', jobData.price)}
      {renderDetailItem('日本語レベル', jobData.ja_level)}
      {renderDetailItem('英語レベル', jobData.en_level)}
      {renderDetailItem('リモート', jobData.remote)}
      {renderDetailItem('OS', jobData.OS)}
      {renderDetailItem('スキル', jobData.skill)}
      {/* 他の項目があれば、ここに追加 */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    width: 120,  // ラベルの幅を固定
  },
  value: {
    flex: 1,
  },
});

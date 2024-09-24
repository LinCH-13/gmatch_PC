import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>Copyright © 2024.GEL研究所株式会社 All rights reserved.</Text>
      {/* <Image
        source={require("@/assets/images/gel-logo-GreenText.png")}
        style={styles.reactLogo}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    height: 60,
    padding: 10,
    backgroundColor: '#808080FF',
    alignItems: 'center',
    justifyContent: 'center', // 垂直居中
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  text: {
    fontSize: 12,
    color: '#000000FF',
  },
  reactLogo: {
    width: 200, // 根据需要设置宽度
    height: 50, // 根据需要设置高度
    marginTop: 5, // 添加一些间距
  },
});

export default Footer;

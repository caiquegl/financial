import React from 'react';
import { View,  Text, StyleSheet } from 'react-native';

const Logo = () => {

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.rectangle]} />
        <View style={[styles.rectangle]} />
        <View style={[styles.rectangle]} />
      </View>
      <Text style={styles.subText}>Financial <Text style={styles.bold}>Duo</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  rectangle: {
    width: 20,
    height: 50,
    backgroundColor: '#2D6A4F',
    marginRight: 10,
    transform: [{ rotate: '35deg' }],
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  subText: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Logo;

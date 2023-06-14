import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../util/colors';
import { Feather } from '@expo/vector-icons'; 

const Avatar = () => {


  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
      <Feather name="user" size={35} color={colors.textPrimary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: colors.secondary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Avatar;

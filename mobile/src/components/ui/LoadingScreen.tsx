import React from 'react';
import { View, StyleSheet } from 'react-native';
import Loader from './Loader';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Loader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

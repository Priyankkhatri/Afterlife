import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function QuickUploadButton() {
  const nav = useNavigation();
  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // navigate to Upload screen if available
          // @ts-ignore
          nav.navigate?.('Upload');
        }}
      >
        <Text style={styles.text}>Quick Upload</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'absolute', right: 18, bottom: 28 },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  text: { color: '#fff', fontWeight: '700' },
});

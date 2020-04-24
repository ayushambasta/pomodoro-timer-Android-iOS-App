import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Index from './utils/index';

const timerData = {"mins":  25,
"secs": 0,
"brMins": 5,
"brSecs": 0,}
export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    // </View>
    <Index {...timerData} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

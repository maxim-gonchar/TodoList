import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import {useMMKVString} from 'react-native-mmkv';
import HomeScreen from './src/screens/HomeScreen';

function App(): React.JSX.Element {
  const [token] = useMMKVString('token');
  return (
    <SafeAreaView style={styles.constainer}>
      {!token ? <LoginScreen /> : <HomeScreen />}
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
});

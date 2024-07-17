import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {loginRequest} from '../api/loginRequest';
import {registerRequest} from '../api/registerRequest';

const LoginScreen: FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [creds, setCreds] = useState<{username: string; password: string}>({
    username: '',
    password: '',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.inputTitle}>User name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setCreds(prev => ({...prev, username: text}))}
      />
      <Text style={styles.inputTitle}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setCreds(prev => ({...prev, password: text}))}
      />
      <Pressable
        style={styles.loginButton}
        onPress={() => {
          const request = isLogin ? loginRequest : registerRequest;
          request(creds);
        }}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign up'}</Text>
      </Pressable>
      <Pressable hitSlop={10} onPress={() => setIsLogin(prev => !prev)}>
        <Text style={styles.signText}>{isLogin ? 'Sign up' : 'Login'}</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    width: '100%',
    height: Dimensions.get('window').height * 0.06,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    marginBottom: 16,
    color: 'black',
    paddingHorizontal: 8,
    fontSize: 16,
  },
  inputTitle: {
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  loginButton: {
    width: '100%',
    height: Dimensions.get('window').height * 0.06,
    borderRadius: 6,
    backgroundColor: 'white',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  signText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
});

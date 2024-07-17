import { ToastAndroid } from 'react-native';
import {SERVER_REQUEST} from './Api';
import {loginRequest} from './loginRequest';

export const registerRequest = async body => {
  try {
    const response = await SERVER_REQUEST(body, '/register', 'POST');
    if (response.message === 'User has been registered') {
      await loginRequest(body);
    }else if (response.message) {
      ToastAndroid.showWithGravityAndOffset(
        response.message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  } catch (e) {
    ToastAndroid.showWithGravityAndOffset(
        e.message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
  }
};

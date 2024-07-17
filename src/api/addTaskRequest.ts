import {ToastAndroid} from 'react-native';
import {SERVER_REQUEST} from './Api';

export const addTaskRequest = async (body, callback) => {
  try {
    const response = await SERVER_REQUEST(body, '/task', 'POST');
    await callback()
    ToastAndroid.showWithGravityAndOffset(
        response.message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
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

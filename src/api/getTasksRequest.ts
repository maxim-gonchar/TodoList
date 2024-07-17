import { ToastAndroid } from 'react-native';
import {SERVER_REQUEST} from './Api';

export const getTasksRequest = async () => {
  try {
    const response = await SERVER_REQUEST({}, '/task', 'GET');
return response
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

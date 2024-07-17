import {ToastAndroid} from 'react-native';
import {SERVER_REQUEST} from './Api';

export const deleteTaskRequest = async (id, callback ) => {
  try {
    const response = await SERVER_REQUEST({}, `/task/${id}`, 'DELETE');
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

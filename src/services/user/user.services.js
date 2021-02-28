import AsyncStorage from '@react-native-community/async-storage';
import {API_URL} from '../../config/config';

export const getUserProfileDataService = async (userData) => {
  let token = await AsyncStorage.getItem('token');
  let authId = await AsyncStorage.getItem('authId');

  try {
    const response = await fetch(API_URL + '/users/getUserProfile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({authId: authId}),
    });
    const responseJson = await response.json();
    // console.log('response object:', responseJson);
    return responseJson;
  } catch (error) {
    console.log('Request failed, Please try again!');
    return error;
  }
};

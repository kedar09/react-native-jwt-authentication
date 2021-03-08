import AsyncStorage from '@react-native-community/async-storage';
import {API_URL} from '../../config/config';

export const getUserProfileDataService = async () => {
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
    console.log(error);
    console.log('Request failed, Please try again!');
    return {message: 'Request failed, Please try again!'};
  }
};

export const updateUserProfileDataService = async (values) => {
  let token = await AsyncStorage.getItem('token');
  let authId = await AsyncStorage.getItem('authId');

  try {
    const response = await fetch(API_URL + '/users/updateUserProfile', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authId: authId,
        phoneNumber: +values.phoneNumber,
        displayName: values.displayName,
      }),
    });
    const responseJson = await response.json();
    // console.log('response object:', responseJson);
    return responseJson;
  } catch (error) {
    console.log(error);
    console.log('Request failed, Please try again!');
    return {message: 'Request failed, Please try again!'};
  }
};

export const updateUserPasswordDataService = async (values) => {
  let token = await AsyncStorage.getItem('token');
  let authId = await AsyncStorage.getItem('authId');

  try {
    const response = await fetch(API_URL + '/users/updateUserPassword', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authId: authId,
        password: values.password,
      }),
    });
    const responseJson = await response.json();
    // console.log('response object:', responseJson);
    return responseJson;
  } catch (error) {
    console.log(error);
    console.log('Request failed, Please try again!');
    return {message: 'Request failed, Please try again!'};
  }
};

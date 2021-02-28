import {Alert} from 'react-native';
import {API_URL} from '../../config/config';

export const loginUserService = async (userData) => {
  try {
    const response = await fetch(API_URL + '/auth/loginUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const responseJson = await response.json();
    // console.log('response object:', responseJson);
    return responseJson;
  } catch (error) {
    console.log('Request failed, Please try again!');
    return error;
  }
};
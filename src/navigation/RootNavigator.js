/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../containers/Login/LoginScreen';
import RegisterScreen from '../containers/Register/RegisterScreen';
import HomeScreen from '../containers/Welcome-Home/HomeScreen';
import ChangePasswordScreen from '../containers/Change-Password/ChangePasswordScreen';
import EditProfileScreen from '../containers/Edit-Profile/EditProfileScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {ActivityIndicator, View} from 'react-native';
import {UserContext} from '../store/contexts/user.context';
import {useContext} from 'react';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  const {userState, dispatchUser} = useContext(UserContext);

  const getUserData = async () => {
    try {
      const tokenData = await AsyncStorage.getItem('token');
      const authId = await AsyncStorage.getItem('authId');
      await dispatchUser({
        type: 'LOGGED_IN_SUCCESSFUL',
        value: {
          isLoading: false,
          isAuthenticated: true,
          displayName: '',
          email: '',
          phoneNumber: '',
          authId: authId,
          token: tokenData,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (userState.isLoading) {
    return (
      <View
        style={{
          marginTop: 300,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color="#0C090D" size="large" />
      </View>
    );
  }

  console.log(userState);
  return (
    <>
      <Stack.Navigator>
        {userState.isAuthenticated === false ? (
          <>
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{title: 'Login', headerShown: false}}
            />
            <Stack.Screen
              name="register"
              component={RegisterScreen}
              options={{title: 'Registration', headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="welcome-home"
              component={HomeScreen}
              options={{title: 'Home', headerShown: false}}
            />
            <Stack.Screen
              name="change-password"
              component={ChangePasswordScreen}
              options={{title: 'Change Password', headerShown: false}}
            />
            <Stack.Screen
              name="edit-profile"
              component={EditProfileScreen}
              options={{title: 'Edit Profile', headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../containers/Login/LoginScreen';
import RegisterScreen from '../containers/Register/RegisterScreen';
import HomeScreen from '../containers/Welcome-Home/HomeScreen';
import ChangePasswordScreen from '../containers/Change-Password/ChangePasswordScreen';
import EditProfileScreen from '../containers/Edit-Profile/EditProfileScreen';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen
          name="welcome-home"
          component={HomeScreen}
          options={{title: 'Home', headerShown: false}}
        />
        <Stack.Screen
          name="change-password"
          component={ChangePasswordScreen}
          options={{title: 'Change Password'}}
        />
        <Stack.Screen
          name="edit-profile"
          component={EditProfileScreen}
          options={{title: 'Edit Profile'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

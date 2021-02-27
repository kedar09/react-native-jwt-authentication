import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../containers/Login/LoginScreen';
import RegistrationScreen from '../containers/Registration/RegistrationScreen';
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
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="register"
          component={RegistrationScreen}
          options={{title: 'Registration'}}
        />
        <Stack.Screen
          name="welcome-home"
          component={HomeScreen}
          options={{title: 'Home'}}
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

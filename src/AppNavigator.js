import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from "./Components/Pages/Login/LoginPage";
import RegistrationPage from "./Components/Pages/Registration/RegistrationPage";
import HomePage from "./Components/Pages/Home/HomePage";
import ChangePasswordPage from "./Components/Pages/ChangePassword/ChangePasswordPage";
import EditProfilePage from "./Components/Pages/EditProfile/EditProfilePage";

const Stack = createStackNavigator();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="login"
                    component={LoginPage}
                    options={{title: 'Login'}}
                />
                <Stack.Screen
                    name="register"
                    component={RegistrationPage}
                    options={{title: 'Registration'}}
                />
                <Stack.Screen
                    name="welcome-home"
                    component={HomePage}
                    options={{title: 'Home'}}
                />
                <Stack.Screen
                    name="change-password"
                    component={ChangePasswordPage}
                    options={{title: 'Change Password'}}
                />
                <Stack.Screen
                    name="edit-profile"
                    component={EditProfilePage}
                    options={{title: 'Edit Profile'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

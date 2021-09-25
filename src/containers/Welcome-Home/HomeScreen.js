/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react';
import {View, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {Card, Divider, Text} from 'react-native-paper';
import styles from './home-screen.css';
import MyButton from '../../components/MyButton/MyButton';
import {getUserProfileDataService} from '../../services/user/user.services';
import AppHeader from '../../components/AppHeader/AppHeader';
import {useIsFocused} from '@react-navigation/native';

import Toast from 'react-native-toast-message';
import {UserContext} from '../../store/contexts/user.context';

const HomeScreen = (props) => {
  const {userState, dispatchUser} = useContext(UserContext);
  const isFocused = useIsFocused();
  const getUserProfileData = async () => {
    try {
      getUserProfileDataService()
        .then(async (responseData) => {
          console.log('userData' + responseData);
          if (responseData.length > 0) {
            await dispatchUser({
              type: 'LOGGED_IN_SUCCESSFUL',
              value: {
                isLoading: false,
                isAuthenticated: true,
                displayName: responseData[0].displayName,
                email: responseData[0].email,
                phoneNumber: responseData[0].phoneNumber,
                authId: responseData.authId,
                token: responseData.token,
              },
            });
          } else if (responseData.error) {
            Toast.show({
              type: 'error',
              position: 'bottom',
              text1: responseData.error,
              visibilityTime: 3000,
              autoHide: true,
            });
          } else {
            Toast.show({
              type: 'error',
              position: 'bottom',
              text1: responseData.message,
              visibilityTime: 3000,
              autoHide: true,
            });
            console.log('error');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getUserProfileData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('authId');
      await dispatchUser({
        type: 'LOGGED_IN_SUCCESSFUL',
        value: {
          isLoading: false,
          isAuthenticated: false,
          displayName: '',
          email: '',
          phoneNumber: '',
          authId: '',
          token: null,
        },
      });

      // props.navigation.navigate('login');
    } catch (error) {
      // Error saving data
    }
  };

  return (
    <View style={styles.viewHomeScreen}>
      <AppHeader
        headerTitle={userState.displayName}
        leftIconMenu={false}
        rightIconMenu={false}
      />

      <ScrollView>
        <Card>
          <Card.Title
            titleStyle={styles.cardTitleStyleHomeScreen}
            title="User Information"
          />
          <Divider />
          <Card.Content>
            <View style={{marginVertical: 10}}>
              <Text style={styles.textOne}>
                Name:-
                <Text>{userState.displayName}</Text>
              </Text>
              <Text style={styles.textOne}>
                Email:-
                <Text>{userState.email}</Text>
              </Text>
              <Text style={styles.textOne}>
                Phone Number:-
                <Text>{userState.phoneNumber}</Text>
              </Text>
            </View>
            <MyButton
              style={styles.buttonHomeScreen}
              color="#00A7E1"
              onPress={() =>
                props.navigation.navigate('edit-profile', {
                  displayName: userState.displayName,
                })
              }
              buttonTitle="Edit Profile"
            />
            <MyButton
              style={styles.buttonHomeScreen}
              color="#00A7E1"
              onPress={() =>
                props.navigation.navigate('change-password', {
                  displayName: userState.displayName,
                })
              }
              buttonTitle="Change Password"
            />
          </Card.Content>
        </Card>
        <MyButton
          style={styles.buttonHomeScreen}
          onPress={() => logOut()}
          labelStyle={{color: '#E01A4F'}}
          color="#0C090D"
          mode="contained"
          buttonTitle="Log Out"
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

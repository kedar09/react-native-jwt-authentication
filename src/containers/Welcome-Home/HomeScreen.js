/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {Card, Divider, Text} from 'react-native-paper';
import styles from './home-screen.css';
import MyButton from '../../components/MyButton/MyButton';
import {getUserProfileDataService} from '../../services/user/user.services';
import AppHeader from '../../components/AppHeader/AppHeader';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = (props) => {
  const [state, setState] = useState({userData: ''});
  const isFocused = useIsFocused();
  const getUserProfileData = async () => {
    try {
      getUserProfileDataService()
        .then((responseData) => {
          console.log('userData' + responseData);
          if (responseData.length > 0) {
            setState({...state, userData: responseData[0]});
          } else {
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
    getUserProfileData();
  }, [isFocused]);

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('authId');
      props.navigation.navigate('login');
    } catch (error) {
      // Error saving data
    }
  };

  return (
    <View style={styles.viewHomeScreen}>
      <AppHeader
        headerTitle="Home"
        leftIconMenu={false}
        rightIconMenu={false}
      />

      <ScrollView>
        <Card>
          <Card.Title title="User Information" />
          <Divider />
          <Card.Content>
            <Text>Name: {state.userData.displayName}</Text>
            <Text>Email: {state.userData.email}</Text>
            <Text>Phone Number: {state.userData.phoneNumber}</Text>
            <MyButton
              style={styles.buttonHomeScreen}
              color="#00A7E1"
              onPress={() => props.navigation.navigate('edit-profile')}
              buttonTitle="Edit Profile"
            />
            <MyButton
              style={styles.buttonHomeScreen}
              color="#00A7E1"
              onPress={() => props.navigation.navigate('change-password')}
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

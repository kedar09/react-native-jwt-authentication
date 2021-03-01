/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {Card, Title, Divider} from 'react-native-paper';

import * as yup from 'yup';
import {Formik} from 'formik';
import styles from './edit-profile-screen.css';
import {getUserProfileDataService} from '../../services/user/user.services';
import {updateUserProfileDataService} from '../../services/user/user.services';
import MyButton from '../../components/MyButton/MyButton';
import AppHeader from '../../components/AppHeader/AppHeader';
import MyTextInput from '../../components/MyTextInput/MyTextInput';

const EditProfileScreen = (props) => {
  const [state, setState] = useState({
    userData: '',
    phoneNumber: '',
    displayName: '',
  });

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
  }, []);

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('authId');
      props.navigation.navigate('login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.viewEditProfileScreen}>
      <AppHeader
        headerTitle="Edit Profile"
        leftIconMenu={false}
        rightIconMenu={false}
      />
      <ScrollView>
        <Card>
          <Card.Title title="User Profile" />
          <Divider />
          <Card.Content>
            <Title>Email: {state.userData.email}</Title>
            <Formik
              enableReinitialize={true}
              initialValues={state}
              onSubmit={async (values, {resetForm}) => {
                updateUserProfileDataService(values)
                  .then((responseData) => {
                    if (responseData.message) {
                      Alert.alert(responseData.message);
                      // console.log(responseJson)
                      resetForm({});

                      props.navigation.navigate('welcome-home');
                    } else {
                      console.log('error');
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }}
              validationSchema={yup.object().shape({
                displayName: yup.string(),
                // .required(),
                phoneNumber: yup.number(),
                // .required(),
              })}>
              {({
                handleChange,
                handleBlur,
                touched,
                errors,
                handleSubmit,
                values,
              }) => (
                <View>
                  <View>
                    <MyTextInput
                      label="Name"
                      onChangeText={handleChange('displayName')}
                      onBlur={handleBlur('displayName')}
                      mode="outlined"
                      value={values.displayName}
                      error={
                        touched.displayName && errors.displayName ? true : false
                      }
                      errorName={errors.displayName}
                    />
                  </View>

                  <View>
                    <MyTextInput
                      label="Mobile Number"
                      keyboardType="numeric"
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      mode="outlined"
                      value={values.phoneNumber}
                      error={
                        touched.phoneNumber && errors.phoneNumber ? true : false
                      }
                      errorName={errors.phoneNumber}
                    />
                  </View>

                  <MyButton
                    onPress={handleSubmit}
                    color="#3333ff"
                    mode="contained"
                    buttonTitle="Save Profile"
                  />
                  <MyButton
                    style={{marginTop: 10}}
                    color="#3333ff"
                    onPress={() => props.navigation.navigate('welcome-home')}
                    buttonTitle="Return to home"
                  />
                </View>
              )}
            </Formik>
          </Card.Content>
        </Card>
        <MyButton
          style={{marginTop: 20}}
          onPress={() => logOut()}
          mode="contained"
          buttonTitle="Log Out"
        />
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

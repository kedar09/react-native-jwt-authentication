/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, ScrollView, LogBox, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Card, Title, Divider} from 'react-native-paper';

import * as yup from 'yup';
import {Formik} from 'formik';
import styles from './change-password-screen.css';
import {
  getUserProfileDataService,
  updateUserPasswordDataService,
} from '../../services/user/user.services';
import MyButton from '../../components/MyButton/MyButton';
import MyTextInput from '../../components/MyTextInput/MyTextInput';
import AppHeader from '../../components/AppHeader/AppHeader';
import Toast from 'react-native-toast-message';

const ChangePasswordScreen = (props) => {
  const [state, setState] = useState({
    userData: '',
    password: '',
    confirmPassword: '',
  });

  const getUserProfileData = async () => {
    try {
      getUserProfileDataService()
        .then((responseData) => {
          if (responseData.length > 0) {
            setState({
              ...state,
              email: responseData[0].email,
              phoneNumber: responseData[0].phoneNumber.toString(),
              displayName: responseData[0].displayName,
            });
            console.log(responseData[0].displayName);
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
    <View style={styles.viewChangePasswordScreen}>
      <AppHeader
        headerTitle={props.route.params.displayName}
        leftIconMenu={false}
        rightIconMenu={false}
      />
      <ScrollView>
        <Card>
          <Card.Title
            titleStyle={styles.cardTitleStyleChangePasswordScreen}
            title="Set New Password"
          />
          <Divider />
          <Card.Content>
            <Title>Name: {props.route.params.displayName}</Title>
            <Formik
              enableReinitialize={true}
              initialValues={state}
              onSubmit={async (values, {resetForm}) => {
                updateUserPasswordDataService(values)
                  .then((responseData) => {
                    if (responseData.message) {
                      Toast.show({
                        type: 'success',
                        position: 'bottom',
                        text1: responseData.message,
                        visibilityTime: 3000,
                        autoHide: true,
                      });
                      resetForm({});
                      props.navigation.navigate('welcome-home');
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
              }}
              validationSchema={yup.object().shape({
                password: yup.string().required(),
                confirmPassword: yup.string().required(),
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
                      label="Password"
                      secureTextEntry={true}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      mode="outlined"
                      value={values.password}
                      error={touched.password && errors.password ? true : false}
                      errorName={errors.password}
                    />
                  </View>

                  <View>
                    <MyTextInput
                      label="Confirm Password"
                      secureTextEntry={true}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      mode="outlined"
                      value={values.confirmPassword}
                      error={
                        (touched.confirmPassword && errors.confirmPassword) ||
                        values.confirmPassword !== values.password
                          ? true
                          : false
                      }
                      errorName={
                        values.confirmPassword !== values.password
                          ? 'Password not matched'
                          : errors.confirmPassword
                      }
                    />
                  </View>

                  <MyButton
                    onPress={handleSubmit}
                    // labelStyle={{color: '#E01A4F'}}
                    color="#0C090D"
                    // mode="contained"
                    buttonTitle="Save Password"
                  />
                  <MyButton
                    style={{marginTop: 10}}
                    color="#E01A4F"
                    onPress={() => props.navigation.navigate('welcome-home')}
                    buttonTitle="Cancel"
                  />
                </View>
              )}
            </Formik>
          </Card.Content>
        </Card>
        <MyButton
          style={{marginTop: 20, marginHorizontal: 10}}
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

export default ChangePasswordScreen;

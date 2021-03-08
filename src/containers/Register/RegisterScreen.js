/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react';
import {View, Alert, ScrollView} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Card} from 'react-native-paper';
import styles from './register-screen.css';
import MyButton from '../../components/MyButton/MyButton';
import AppHeader from '../../components/AppHeader/AppHeader';
import MyTextInput from '../../components/MyTextInput/MyTextInput';
import {registerUserService} from '../../services/authentication/authentication.services';
import {useFocusEffect} from '@react-navigation/native';

import Toast from 'react-native-toast-message';

const RegisterScreen = (props) => {
  const [state, setState] = useState({
    email: '',
    displayName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });
  useFocusEffect(
    useCallback(() => {
      setState({
        ...state,
        email: '',
        displayName: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
      });
    }, []),
  );

  return (
    <View style={styles.viewRegisterScreen}>
      <AppHeader
        headerTitle="Register"
        leftIconMenu={false}
        rightIconMenu={false}
      />
      <ScrollView>
        <Card>
          <Card.Title
            titleStyle={styles.cardTitleStyleRegisterScreen}
            title="Sign Up"
          />
          <Card.Content>
            <Formik
              enableReinitialize={true}
              initialValues={{
                email: '',
                password: '',
                confirmPassword: '',
                phoneNumber: '',
                displayName: '',
              }}
              onSubmit={(values, {resetForm}) => {
                let userData = {
                  email: values.email,
                  password: values.password,
                  displayName: values.displayName,
                  phoneNumber: values.phoneNumber,
                };
                registerUserService(userData)
                  .then((responseData) => {
                    if (responseData.token) {
                      Toast.show({
                        type: 'success',
                        position: 'bottom',
                        text1: responseData.message,
                        visibilityTime: 3000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 40,
                      });
                      // Alert.alert(responseData.message);
                      // console.log(responseJson)
                      resetForm({});
                      AsyncStorage.setItem('token', responseData.token);
                      AsyncStorage.setItem(
                        'authId',
                        responseData.authId.toString(),
                      );
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
                email: yup.string().required(),
                password: yup.string().required(),
                confirmPassword: yup.string().required(),
                phoneNumber: yup.number().required(),
                // displayName: yup
                //     .string()
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
                      label="Email"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      mode="outlined"
                      error={touched.email && errors.email ? true : false}
                      errorName={errors.email}
                    />
                  </View>

                  <View>
                    <MyTextInput
                      label="Name"
                      onChangeText={handleChange('displayName')}
                      onBlur={handleBlur('displayName')}
                      value={values.displayName}
                      mode="outlined"
                      error={
                        touched.displayName && errors.displayName ? true : false
                      }
                      errorName={errors.displayName}
                    />
                  </View>

                  <View>
                    <MyTextInput
                      label="Mobile Number"
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      mode="outlined"
                      value={values.phoneNumber}
                      error={
                        touched.phoneNumber && errors.phoneNumber ? true : false
                      }
                      keyboardType={'numeric'}
                      errorName={errors.phoneNumber}
                    />
                  </View>

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
                    labelStyle={{color: '#E01A4F'}}
                    color="#0C090D"
                    mode="contained"
                    buttonTitle="Sing Up"
                  />
                  <MyButton
                    style={{marginTop: 10}}
                    color="#00A7E1"
                    onPress={() => props.navigation.navigate('login')}
                    buttonTitle="Have an account? Log in"
                  />
                </View>
              )}
            </Formik>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

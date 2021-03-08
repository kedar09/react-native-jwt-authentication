/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import {View, Alert, ScrollView, Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import * as yup from 'yup';
import {Formik} from 'formik';
import {Card} from 'react-native-paper';
import styles from './login-screen.css';
import {loginUserService} from '../../services/authentication/authentication.services';
import AppHeader from '../../components/AppHeader/AppHeader';
import MyTextInput from '../../components/MyTextInput/MyTextInput';
import MyButton from '../../components/MyButton/MyButton';
import {useIsFocused} from '@react-navigation/native';

import Toast from 'react-native-toast-message';

const LoginScreen = (props) => {
  const isFocused = useIsFocused;
  const [state, setState] = useState({email: '', password: ''});
  // useFocusEffect(
  //   useCallback(() => {
  //     setState({...state, email: '', password: ''});
  //   }, []),
  // );

  useEffect(() => {
    AsyncStorage.getItem('token').then((userToken) => {
      if (userToken) {
        props.navigation.navigate('welcome-home');
      }
    });
  }, []);

  useEffect(() => {
    setState({...state, email: '', password: ''});
  }, [isFocused]);

  return (
    <View style={styles.viewLoginScreen}>
      <AppHeader
        headerTitle="KEDAR09"
        leftIconMenu={false}
        rightIconMenu={true}
      />
      <ScrollView>
        <Card>
          <Card.Title
            titleStyle={styles.cardTitleStyleLoginScreen}
            title="Sign In"
          />

          <Card.Content>
            <Formik
              enableReinitialize={true}
              initialValues={state}
              onSubmit={(values, {resetForm}) => {
                let userData = {
                  email: values.email,
                  password: values.password,
                };
                loginUserService(userData)
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

                  <MyButton
                    labelStyle={{color: '#E01A4F'}}
                    color="#0C090D"
                    onPress={handleSubmit}
                    mode="contained"
                    buttonTitle="Log In"
                  />

                  <MyButton
                    style={styles.createNewAccountButtonLoginScreen}
                    color="#00A7E1"
                    onPress={() => props.navigation.navigate('register')}
                    buttonTitle="Create New Account"
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

export default LoginScreen;

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext} from 'react';
import {View, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import * as yup from 'yup';
import {Formik} from 'formik';
import {Card} from 'react-native-paper';
import styles from './login-screen.css';
import {loginUserService} from '../../services/authentication/authentication.services';
import AppHeader from '../../components/AppHeader/AppHeader';
import MyTextInput from '../../components/MyTextInput/MyTextInput';
import MyButton from '../../components/MyButton/MyButton';

import Toast from 'react-native-toast-message';
import {UserContext} from '../../store/contexts/user.context';

const LoginScreen = (props) => {
  const {userState, dispatchUser} = useContext(UserContext);

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
              initialValues={{email: '', password: ''}}
              onSubmit={(values, {resetForm}) => {
                let userData = {
                  email: values.email,
                  password: values.password,
                };
                loginUserService(userData)
                  .then(async (responseData) => {
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
                      await AsyncStorage.setItem('token', responseData.token);
                      await AsyncStorage.setItem(
                        'authId',
                        responseData.authId.toString(),
                      );
                      await dispatchUser({
                        type: 'LOGGED_IN_SUCCESSFUL',
                        value: {
                          isLoading: false,
                          isAuthenticated: true,
                          displayName: '',
                          email: '',
                          phoneNumber: '',
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
                    labelStyle={styles.logInButtonStyle}
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

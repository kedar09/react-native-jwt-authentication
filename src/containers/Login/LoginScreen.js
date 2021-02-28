import React from 'react';
import {View, Alert, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import * as yup from 'yup';
import {Formik} from 'formik';
import {Card} from 'react-native-paper';
import styles from './login-screen.css';
import {loginUserService} from '../../services/authentication/authentication.services';
import AppHeader from '../../components/AppHeader/AppHeader';
import MyTextInput from '../../components/MyTextInput/MyTextInput';
import MyButton from '../../components/MyButton/MyButton';

const LoginScreen = (props) => {
  return (
    <View style={styles.viewLoginScreen}>
      <AppHeader
        headerTitle="Login"
        leftIconMenu={false}
        rightIconMenu={false}
      />
      <ScrollView>
        <Card>
          <Card.Title title="Login Form" />
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
                  .then((responseData) => {
                    if (responseData.token) {
                      Alert.alert(responseData.message);
                      // console.log(responseJson)
                      resetForm({});
                      AsyncStorage.setItem('token', responseData.token);
                      AsyncStorage.setItem(
                        'authId',
                        responseData.authId.toString(),
                      );
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
                    onPress={handleSubmit}
                    color="#3333ff"
                    mode="contained"
                    buttonTitle="Login"
                  />

                  <MyButton
                    style={styles.createNewAccountButtonLoginScreen}
                    color="#3333ff"
                    onPress={() => props.navigation.navigate('register')}
                    buttonTitle="Create A New Account"
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

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react';
import {View, ScrollView} from 'react-native';
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
import Toast from 'react-native-toast-message';
import {UserContext} from '../../store/contexts/user.context';

const EditProfileScreen = (props) => {
  const {userState, dispatchUser} = useContext(UserContext);
  const [state, setState] = useState({
    email: '',
    phoneNumber: 0,
    displayName: '',
  });

  const getUserProfileData = async () => {
    try {
      getUserProfileDataService()
        .then((responseData) => {
          if (responseData.length > 0) {
            setState({
              ...state,
              email: responseData[0].email,
              phoneNumber: responseData[0].phoneNumber,
              displayName: responseData[0].displayName,
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
    } catch (error) {
      console.log('something went wrong', error);
    }
  };

  return (
    <View style={styles.viewEditProfileScreen}>
      <AppHeader
        headerTitle={props.route.params.displayName}
        leftIconMenu={false}
        rightIconMenu={false}
      />
      <ScrollView>
        <Card>
          <Card.Title
            titleStyle={styles.cardTitleStyleEditScreen}
            title="User Profile"
          />
          <Divider />
          <Card.Content>
            <Title style={{marginVertical: 10}}>Email: {state.email}</Title>
            <Formik
              enableReinitialize={true}
              initialValues={state}
              onSubmit={(values, {resetForm}) => {
                updateUserProfileDataService(values)
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
                      value={values.phoneNumber.toString()}
                      error={
                        touched.phoneNumber && errors.phoneNumber ? true : false
                      }
                      keyboardType="numeric"
                      errorName={errors.phoneNumber}
                    />
                  </View>

                  <MyButton
                    onPress={handleSubmit}
                    // labelStyle={{color: '#E01A4F'}}
                    color="#0C090D"
                    // mode="contained"
                    buttonTitle="Save Profile"
                  />
                  <MyButton
                    style={styles.cancelUpdateButtonStyle}
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
          style={styles.logOutButtonStyle}
          onPress={() => logOut()}
          labelStyle={styles.logOutLabelStyle}
          color="#0C090D"
          mode="contained"
          buttonTitle="Log Out"
        />
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

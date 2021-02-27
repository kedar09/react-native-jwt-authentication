import React, {Component} from 'react';
import {View, Alert, ScrollView, AsyncStorage, LogBox} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import {HelperText, TextInput, Button, Card} from 'react-native-paper';

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      displayName: '',
      isLoggingIn: false,
    };
  }

  componentDidMount() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'stretch',
          padding: 20,
        }}>
        <ScrollView>
          <Card>
            <Card.Title title="Registration Form" />
            <Card.Content>
              <Formik
                enableReinitialize={true}
                initialValues={this.state}
                onSubmit={(values, {resetForm}) => {
                  let userData = {
                    email: values.email,
                    password: values.password,
                    displayName: values.displayName,
                    phoneNumber: values.phoneNumber,
                  };
                  fetch(`http://172.17.0.1:3001/auth/registerUser`, {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                  })
                    .then((response) => response.json())
                    .then((responseJson) => {
                      console.log(responseJson);
                      Alert.alert(responseJson.message);
                      resetForm({});
                      AsyncStorage.setItem('token', responseJson.token);
                      AsyncStorage.setItem(
                        'authId',
                        responseJson.authId.toString(),
                      );
                      this.props.navigation.navigate('welcome-home');
                      this.componentDidMount();
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
                      <TextInput
                        label="Email"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        mode="outlined"
                        error={touched.email && errors.email ? true : false}
                      />
                      <HelperText
                        type="error"
                        visible={touched.email && errors.email ? true : false}>
                        {errors.email}
                      </HelperText>
                    </View>

                    <View>
                      <TextInput
                        label="Name"
                        onChangeText={handleChange('displayName')}
                        onBlur={handleBlur('displayName')}
                        value={values.displayName}
                        mode="outlined"
                        error={
                          touched.displayName && errors.displayName
                            ? true
                            : false
                        }
                      />
                      <HelperText
                        type="error"
                        visible={
                          touched.displayName && errors.displayName
                            ? true
                            : false
                        }>
                        {errors.displayName}
                      </HelperText>
                    </View>

                    <View>
                      <TextInput
                        label="Mobile Number"
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        mode="outlined"
                        value={values.phoneNumber}
                        error={
                          touched.phoneNumber && errors.phoneNumber
                            ? true
                            : false
                        }
                        keyboardType={'numeric'}
                      />
                      <HelperText
                        type="error"
                        visible={
                          touched.phoneNumber && errors.phoneNumber
                            ? true
                            : false
                        }>
                        {errors.phoneNumber}
                      </HelperText>
                    </View>

                    <View>
                      <TextInput
                        label="Password"
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        mode="outlined"
                        value={values.password}
                        error={
                          touched.password && errors.password ? true : false
                        }
                      />
                      <HelperText
                        type="error"
                        visible={
                          touched.password && errors.password ? true : false
                        }>
                        {errors.password}
                      </HelperText>
                    </View>

                    <View>
                      <TextInput
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
                      />
                      <HelperText
                        type="error"
                        visible={
                          (touched.confirmPassword && errors.confirmPassword) ||
                          values.confirmPassword !== values.password
                            ? true
                            : false
                        }>
                        {values.confirmPassword !== values.password
                          ? 'Password not matched'
                          : errors.confirmPassword}
                      </HelperText>
                    </View>

                    <Button
                      onPress={handleSubmit}
                      color="#3333ff"
                      mode="contained">
                      Register
                    </Button>
                    <Button
                      style={{marginTop: 10}}
                      color="#3333ff"
                      onPress={() => this.props.navigation.navigate('login')}>
                      Go to login
                    </Button>
                  </View>
                )}
              </Formik>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

export default RegistrationScreen;

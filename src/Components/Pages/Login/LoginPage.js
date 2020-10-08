import React, {Component} from 'react';
import {View, Alert, ScrollView, LogBox} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import * as yup from 'yup';
import {Formik} from 'formik';
import {HelperText, TextInput, Button, Card} from 'react-native-paper';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount() {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }

    displayData = async () => {
        try {
            let user = await AsyncStorage.getItem('token');
            alert(user);
        } catch (error) {
            alert(error)
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'stretch',
                padding: 20,
            }}>
                <ScrollView>
                    <Card>
                        <Card.Title
                            title="Registration Form"/>
                        <Card.Content>
                            <Formik
                                enableReinitialize={true}
                                initialValues={this.state}
                                onSubmit={(values, {resetForm}) => {
                                    let userData = {
                                        email: values.email,
                                        password: values.password,
                                    };
                                    fetch(`http://172.17.0.1:3001/auth/loginUser`, {
                                        method: 'POST',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(userData),
                                    }).then((response) => response.json())
                                        .then((responseJson) => {
                                            Alert.alert(responseJson.message);
                                            // console.log(responseJson)
                                            resetForm({});
                                            AsyncStorage.setItem('token', responseJson.token);
                                            AsyncStorage.setItem('authId', responseJson.authId.toString());
                                            this.props.navigation.navigate('welcome-home');
                                            this.componentDidMount();
                                        }).catch((error) => {
                                        console.error(error);
                                    });

                                }}
                                validationSchema={yup.object().shape({
                                    email: yup
                                        .string()
                                        .required(),
                                    password: yup
                                        .string()
                                        .required(),
                                })}
                            >
                                {({handleChange, handleBlur, touched, errors, handleSubmit, values}) => (
                                    <View>
                                        <View>
                                            <TextInput
                                                label="Email"
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                                mode='outlined'
                                                error={touched.email && errors.email ? true : false}
                                            />
                                            <HelperText type="error"
                                                        visible={touched.email && errors.email ? true : false}>
                                                {errors.email}
                                            </HelperText>
                                        </View>

                                        <View>
                                            <TextInput
                                                label="Password"
                                                secureTextEntry={true}
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                mode='outlined'
                                                value={values.password}
                                                error={touched.password && errors.password ? true : false}
                                            />
                                            <HelperText type="error"
                                                        visible={touched.password && errors.password ? true : false}>
                                                {errors.password}
                                            </HelperText>
                                        </View>

                                        <Button onPress={handleSubmit} color='#3333ff' mode="contained">Login</Button>

                                        <Button
                                            style={{marginTop: 10}} color='#3333ff'
                                            onPress={() =>
                                                this.props.navigation.navigate('register')
                                            }
                                        >Create A New Account</Button>

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

export default LoginPage;

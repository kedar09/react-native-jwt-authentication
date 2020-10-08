import React, {Component} from 'react';
import {View, ScrollView, LogBox, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
    Button,
    Card, Title, Divider, Text, TextInput, HelperText
} from 'react-native-paper';

import * as yup from 'yup';
import {Formik} from 'formik';

class EditProfilePage extends Component {

    constructor(props) {
        super(props);
        // let userData = this.props.navigation.state.params.userData;
        this.state = {
            userData: '',
            phoneNumber: '',
            displayName: '',
        };
    }

    async componentDidMount() {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        try {
            let token = await AsyncStorage.getItem('token');
            let authId = await AsyncStorage.getItem('authId');
            authId = parseInt(authId);
            console.log(authId);
            return fetch('http://172.17.0.1:3001/users/getUserProfile', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({authId: authId}),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    this.setState({
                        userData: responseJson[0],
                        phoneNumber: responseJson[0].phoneNumber.toString(),
                        displayName: responseJson[0].displayName,
                    }, function () {
                        // In this block you can do something with new state.
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.log(error)
        }
    }

    logOut = async () => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('authId');
            this.props.navigation.navigate('login');
        } catch (error) {
            // Error saving data
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
                            title="User Profile"/>
                        <Divider/>
                        <Card.Content>
                            <Title>Email: {this.state.userData.email}</Title>
                            <Formik
                                enableReinitialize={true}
                                initialValues={this.state}
                                onSubmit={async (values, {resetForm}) => {
                                    try {
                                        let token = await AsyncStorage.getItem('token');
                                        let authId = await AsyncStorage.getItem('authId');
                                        authId = parseInt(authId);
                                        console.log(authId);
                                        return fetch('http://172.17.0.1:3001/users/updateUserProfile', {
                                            method: 'PUT',
                                            headers: {
                                                Accept: 'application/json',
                                                'Authorization': `Bearer ${token}`,
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                authId: authId,
                                                phoneNumber: parseInt(values.phoneNumber),
                                                displayName: values.displayName
                                            }),
                                        })
                                            .then((response) => response.json())
                                            .then((responseJson) => {
                                                Alert.alert(responseJson.message);
                                                // console.log(responseJson)
                                                resetForm({});
                                                this.props.navigation.navigate('welcome-home');
                                                this.componentDidMount();
                                            }).catch((error) => {
                                                console.error(error);
                                            });
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }}
                                validationSchema={yup.object().shape({
                                    displayName: yup
                                        .string(),
                                    // .required(),
                                    phoneNumber: yup
                                        .number()
                                    // .required(),
                                })}
                            >
                                {({handleChange, handleBlur, touched, errors, handleSubmit, values}) => (
                                    <View>
                                        <View>
                                            <TextInput
                                                label="Name"
                                                onChangeText={handleChange('displayName')}
                                                onBlur={handleBlur('displayName')}
                                                mode='outlined'
                                                value={values.displayName}
                                                error={touched.displayName && errors.displayName ? true : false}
                                            />
                                            <HelperText type="error"
                                                        visible={touched.displayName && errors.displayName ? true : false}>
                                                {errors.displayName}
                                            </HelperText>
                                        </View>

                                        <View>
                                            <TextInput
                                                label="Mobile Number"
                                                keyboardType='numeric'
                                                onChangeText={handleChange('phoneNumber')}
                                                onBlur={handleBlur('phoneNumber')}
                                                mode='outlined'
                                                value={values.phoneNumber}
                                                error={touched.phoneNumber && errors.phoneNumber ? true : false}
                                            />
                                            <HelperText type="error"
                                                        visible={touched.phoneNumber && errors.phoneNumber ? true : false}>
                                                {errors.phoneNumber}
                                            </HelperText>
                                        </View>

                                        <Button onPress={handleSubmit} color='#3333ff' mode="contained">Save
                                            Profile</Button>
                                        <Button
                                            style={{marginTop: 10}} color='#3333ff'
                                            onPress={() =>
                                                this.props.navigation.navigate('welcome-home')
                                            }
                                        >Return to home</Button>


                                    </View>
                                )}
                            </Formik>
                        </Card.Content>
                    </Card>
                    <Button style={{marginTop: 20}} onPress={() => this.logOut()} mode="contained">Log Out</Button>

                </ScrollView>
            </View>
        );
    }
}

export default EditProfilePage;

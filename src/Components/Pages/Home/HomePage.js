import React, {Component} from 'react';
import {View, ScrollView, LogBox} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
    Button,
    Card, Divider, Text
} from 'react-native-paper';

class HomePage extends Component {

    constructor(props) {
        super(props);
        // let userData = this.props.navigation.state.params.userData;
        this.state = {
            userData: ''
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
                        userData: responseJson[0]
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
                            title="User Information"/>
                        <Divider/>
                        <Card.Content>
                            <Text>Name: {this.state.userData.displayName}</Text>
                            <Text>Email: {this.state.userData.email}</Text>
                            <Text>Phone Number: {this.state.userData.phoneNumber}</Text>
                            <Button style={{marginTop: 20}} onPress={() =>
                                this.props.navigation.navigate('edit-profile')
                            }>Edit Profile</Button>
                            <Button style={{marginTop: 20}} onPress={() =>
                                this.props.navigation.navigate('change-password')
                            }>Change Password</Button>
                        </Card.Content>
                    </Card>
                    <Button style={{marginTop: 20}} onPress={() => this.logOut()} mode="contained">Log Out</Button>

                </ScrollView>
            </View>
        );
    }
}

export default HomePage;

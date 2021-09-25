/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {RootNavigator} from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';

import {NavigationContainer} from '@react-navigation/native';
import ContextProvider from './src/store/contexts';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <ContextProvider>
          <RootNavigator />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </ContextProvider>
      </NavigationContainer>
    </>
  );
};

export default App;

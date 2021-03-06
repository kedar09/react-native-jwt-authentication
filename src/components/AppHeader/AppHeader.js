import React from 'react';
import {Linking} from 'react-native';
import {Appbar} from 'react-native-paper';
import styles from './app-header.css';

const AppHeader = (props) => {
  return (
    <>
      <Appbar.Header style={styles.appHeader}>
        {props.leftIconMenu ? <Appbar.BackAction /> : null}
        <Appbar.Content
          titleStyle={styles.appHeaderContent}
          title={props.headerTitle}
          subtitle={props.headerSubTitle}
        />
        {props.searchHeaderMenu ? <Appbar.Action icon="magnify" /> : null}
        {props.rightIconMenu ? (
          <Appbar.Action
            icon={require('../../assets/assets/github-api.png')}
            size={30}
            onPress={() => {
              Linking.openURL('https://github.com/kedar09');
            }}
          />
        ) : null}
      </Appbar.Header>
    </>
  );
};

export default AppHeader;

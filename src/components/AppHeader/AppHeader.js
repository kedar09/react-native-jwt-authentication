import React from 'react';
import {Appbar} from 'react-native-paper';

const AppHeader = (props) => {
  return (
    <>
      <Appbar.Header style={{backgroundColor: '#0C090D'}}>
        {props.leftIconMenu ? <Appbar.BackAction /> : null}
        <Appbar.Content
          titleStyle={{fontFamily: 'PermanentMarker-Regular', fontSize: 24}}
          title={props.headerTitle}
          subtitle={props.headerSubTitle}
        />
        {props.searchHeaderMenu ? <Appbar.Action icon="magnify" /> : null}
        {props.rightIconMenu ? <Appbar.Action icon="dots-vertical" /> : null}
      </Appbar.Header>
    </>
  );
};

export default AppHeader;

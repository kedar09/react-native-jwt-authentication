import React from 'react';
import {Appbar} from 'react-native-paper';

const AppHeader = (props) => {
  return (
    <>
      <Appbar.Header>
        {props.leftIconMenu ? <Appbar.BackAction /> : null}
        <Appbar.Content
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

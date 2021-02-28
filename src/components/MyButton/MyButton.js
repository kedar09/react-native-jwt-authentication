import React from 'react';
import {Button} from 'react-native-paper';

const MyButton = (props) => {
  return (
    <>
      <Button
        style={props.style}
        onPress={props.onPress}
        color={props.color}
        mode={props.mode}>
        {props.buttonTitle}
      </Button>
    </>
  );
};

export default MyButton;

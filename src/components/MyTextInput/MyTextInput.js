import React from 'react';
import {HelperText, TextInput} from 'react-native-paper';

const MyTextInput = (props) => {
  return (
    <>
      <TextInput
        label={props.label}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        value={props.values}
        mode={props.mode}
        error={props.error}
      />
      <HelperText type="error" visible={props.error}>
        {props.errorName}
      </HelperText>
    </>
  );
};

export default MyTextInput;

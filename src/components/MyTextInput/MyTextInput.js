import React from 'react';
import {HelperText, TextInput} from 'react-native-paper';

const MyTextInput = (props) => {
  return (
    <>
      <TextInput
        secureTextEntry={props.secureTextEntry}
        label={props.label}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        value={props.value}
        keyboardType={props.keyboardType}
        mode={props.mode}
        selectionColor="green"
        error={props.error}
        // style={{borderColor: '#0C090D'}}
        theme={{colors: {text: '#28262C', primary: '#6184D8'}}}
      />
      <HelperText type="error" visible={props.error}>
        {props.errorName}
      </HelperText>
    </>
  );
};

export default MyTextInput;

import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const TextFieldCustom = ({name,handleChange,placeholder}) => {
  return (
    <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'center',marginBottom:10}}>
        <Ionicons name={name} size={30} color="black" style={{marginRight:10,marginTop:8}}/>
        <TextInput
            style={{width:200,borderBottomWidth:1,borderBottomColor:'grey',padding:5}}
            placeholder={placeholder}
            keyboardAppearance='light'
            
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      marginBottom:10
    },
});

export default TextFieldCustom;

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const SelectionHeader = () => {
    const navigation = useNavigation()
  return (
      <>
    <View style={styles.conatiner}>
        <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}>
            <FontAwesome name='arrow-left' size={25} color='white' style={{marginLeft:20}}/>
        </TouchableOpacity>
      <View style={{marginLeft:20,width:200,height:40,justifyContent:'center'}}>
            <Text style={{color:'white',fontSize:25,fontWeight:'bold'}}>Select Chat</Text>
            <Text style={{color:'white',fontSize:15,fontWeight:'bold'}}> chats</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-around',width:100,marginRight:10,alignItems:'center'}}>
            <TouchableOpacity>
                <FontAwesome name='search' size={25} color='white'/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo name='dots-three-vertical' size={25} color='white'/>
            </TouchableOpacity>

        </View>
    </View>
    <View style={{width:'100%',height:.5,backgroundColor:'#727171'}}></View>

    </>
  );
};

export default SelectionHeader;

const styles = StyleSheet.create({
    conatiner:{
        width:'100%',
        height:75,
        backgroundColor:'#282727',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
});

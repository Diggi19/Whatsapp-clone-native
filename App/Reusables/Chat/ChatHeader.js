import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const ChatHeader = ({name}) => {
    const navigation = useNavigation()
  return (
    <>
    <View style={styles.conatiner}>
        <TouchableOpacity style={{marginLeft:10}} onPress={()=>navigation.navigate('HomeScreen')}>
            <FontAwesome name='arrow-left' size={25} color='white' />
        </TouchableOpacity>
        <TouchableOpacity style={{width:200,height:40,flexDirection:'row',alignItems:'center'}}>
          <Image source={require('../../../assets/profile.png')} style={{width:40,height:40,borderRadius:50,borderWidth:1,borderColor:'white',marginLeft:10,marginRight:15}}/>
            <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{name}</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row',justifyContent:'space-around',width:120,marginRight:10,alignItems:'center'}}>
            <TouchableOpacity style={{marginLeft:5,marginRight:10}}>
                <FontAwesome name='video-camera' size={23} color='white'/>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:5,marginRight:5}}>
                <FontAwesome name='phone' size={23} color='white'/>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:5,marginRight:5}}>
                <Entypo name='dots-three-vertical' size={23} color='white'/>
            </TouchableOpacity>


        </View>
    </View>
    <View style={{width:'100%',height:.5,backgroundColor:'#727171'}}></View>
    </>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
    conatiner:{
        width:'100%',
        height:65,
        backgroundColor:'#282727',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
});

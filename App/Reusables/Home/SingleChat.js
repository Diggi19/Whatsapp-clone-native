import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const SingleChat = ({displayName:name,email:user}) => {
    const navigation = useNavigation()
    // const last = messages.length - 1
  return (
      <>
    <View style={styles.conatiner}>
        <TouchableOpacity>
            <Image source={require('../../../assets/profile.png')} style={{width:50,height:50,borderRadius:50,borderWidth:1,borderColor:'white',marginLeft:10,marginRight:15}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{width:250}} onPress={()=>navigation.navigate('ChatScreen',{name,user})}>
            <Text style={{fontWeight:'bold',fontSize:17,color:'white'}}>{name}</Text>
            {/* <Text style={{color:'#b2aeae',marginTop:3}}>{messages[last].message}</Text> */}
        </TouchableOpacity>
        <View style={{alignItems:'center'}}>
            <Text style={{color:'white'}}>12:26</Text>
            <Text style={{color:'white',borderRadius:50,backgroundColor:'green',paddingLeft:5,paddingRight:5,marginTop:7}}>3</Text>
        </View>
    </View>
    <View style={{width:'100%',height:.5,backgroundColor:'#727171'}}></View>

      </>
  );
};

export default SingleChat;

const styles = StyleSheet.create({
    conatiner:{
        width:'100%',
        height:70,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor:'rgb(51,49,49)'
    },
});

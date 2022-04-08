import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const SingleContact = ({name,image,imageAvailable,emails}) => {
    // console.log(emails[0].email)
    const navigation = useNavigation()
  return (
      <>
    <View style={styles.conatiner}>
        <TouchableOpacity>
            <Image source={{uri:imageAvailable?image.uri:'https://media.istockphoto.com/vectors/male-user-icon-vector-id517998264?k=20&m=517998264&s=612x612&w=0&h=pdEwtkJlZsIoYBVeO2Bo4jJN6lxOuifgjaH8uMIaHTU='}} style={{width:50,height:50,borderRadius:50,borderWidth:1,borderColor:'white',marginLeft:10,marginRight:-15}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('ChatScreen',{name,user:emails[0].email})} style={{width:250,height:40}}>
            <Text style={{fontWeight:'bold',fontSize:17,color:'white'}}>{name}</Text>
            <Text style={{color:'white'}}>Fight fight</Text>
        </TouchableOpacity>
        
    </View>
    <View style={{width:'100%',height:.5,backgroundColor:'#727171'}}></View>

      </>
  );
};

export default SingleContact;

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

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../../Firebase';

const SingleSelect = ({displayName:name,email:user,imageUrl}) => {
    const navigation = useNavigation()
    const [selectedUser,setselectedUser] = React.useState('')
    const currentUser = auth.currentUser.email

    const handleOnChecked = async(ischechked,user,name)=>{
        if (ischechked) {
            console.log(user,name)
            const collectionRef = collection(db,'rooms',user,'messages')
            const add = addDoc(collectionRef,{
                text:imageUrl,
                type:'image',
                timeStamp:Date().toString(),
                email:currentUser
            })
            navigation.navigate('ChatScreen',{name,user})
        }
    }
    // const last = messages.length - 1
  return (
      <>
    <View style={styles.conatiner}>
        <TouchableOpacity>
            <Image source={require('../../../assets/profile.png')} style={{width:50,height:50,borderRadius:50,borderWidth:1,borderColor:'white',marginLeft:10,marginRight:15}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{width:250}} >
            <Text style={{fontWeight:'bold',fontSize:17,color:'white'}}>{name}</Text>
            {/* <Text style={{color:'#b2aeae',marginTop:3}}>{messages[last].message}</Text> */}
        </TouchableOpacity>
        <View style={{alignItems:'center'}}>
            <BouncyCheckbox
                size={25}
                fillColor="#28af7c"
                iconStyle={{ borderColor: "#28af7c" }}
                onPress={(ischedked)=>handleOnChecked(ischedked,user,name)}
            />
        </View>
    </View>
    <View style={{width:'100%',height:.5,backgroundColor:'#727171'}}></View>

      </>
  );
};


export default SingleSelect;

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

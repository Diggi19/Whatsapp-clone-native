import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { auth } from '../../../Firebase';



const Message = ({text,email,type,timeStamp}) => {
    const currentuser = auth.currentUser.email
    // const type = 'message'
    console.log(timeStamp)
    if (type ==='message') {
        return (
          <View style={email === currentuser?styles.conatiner2:styles.conatiner1}>
              <Text style={{color:'white',fontSize:15,marginLeft:5}}>{text}</Text>
              <Text style={{color:'white',alignSelf:'flex-end',marginTop:5}}>{timeStamp.slice(16,21)}</Text>
          </View>
        );
        
    }
    if (type==='image') {
        console.log('supp')
        return(
            <View style={email === currentuser?styles.imageSignedUser:styles.imageOtherUser}>
                <Image source={{uri:text}} style={{width:'95%',height:'95%'}}/>
            </View>
        )
    }
};

export default Message;

const styles = StyleSheet.create({
    conatiner1:
    {
        width:120,
        padding:5,
        backgroundColor:'grey',
        borderRadius:10,
        marginLeft:10,
        marginTop:10,
        marginBottom:10
    },
    conatiner2:{
        width:120,
        padding:5,
        backgroundColor:'#28af7c',
        borderRadius:10,
        marginTop:10,
        marginBottom:10,
        alignSelf:'flex-end',
        marginRight:10
    },
    imageOtherUser:{
        width:200,
        height:200,
        backgroundColor:'grey',
        borderRadius:7,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        marginBottom:10,
        marginLeft:10
    },
    imageSignedUser:{
        width:200,
        height:200,
        backgroundColor:'#28af7c',
        borderRadius:7,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'flex-end',
        marginTop:10,
        marginBottom:10,
        marginRight:10
    }
});

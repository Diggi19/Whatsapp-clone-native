import { View, Text, StyleSheet, Image, Button, TouchableOp, TouchableOpacityacity, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { Formik } from 'formik';
import TextFieldCustom from '../Reusables/TextFieldCustom';
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { auth, db } from '../../Firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';


const validationSchema = yup.object().shape({
    email:yup.string().email().required('enter valid email'),
    password:yup.string().min(8,'required atleast 8 characters').required('enter a unique password'),
})


const LoginScreen = () => {
    const navigation = useNavigation()

    const handleLogin = async(email,password)=>{
        const login = await signInWithEmailAndPassword(auth,email,password)
        console.log(login)
    }

    
  return (
    <View style={styles.conatiner}>
        <StatusBar hidden/>
        <View style={{width:'100%',height:360,backgroundColor:'black',justifyContent:'center',alignItems:'center'}}>
            <View style={{width:200,height:200,position:'absolute',zIndex:1000}}>
                <LottieView source={require('../../assets/93251-message-send.json')} autoPlay loop style={{width:'100%',height:'100%'}} />
                <Text style={{color:'white',textAlign:'center',fontSize:13,marginTop:-50}}>Texting has never been easier..</Text>
            </View>
            <Image source={require('../../assets/background.jpg')} style={{width:"100%",height:"100%"}} resizeMode='cover'/>

        </View>
        <View style={{width:'100%',height:235,justifyContent:'center'}}>
            <Formik
                initialValues={{email:'',password:''}}
                onSubmit={(values)=>handleLogin(values.email,values.password)}
                validationSchema={validationSchema}
                validateOnMount
            >
                {({handleBlur,handleChange,handleSubmit,values,errors})=>(
                    <View style={{width:'100%',height:200,marginTop:0,alignItems:'center'}}>
                            <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'center',marginBottom:10}}>
                                <Ionicons name='mail' size={30} color="black" style={{marginRight:10,marginTop:8}}/>
                                <TextInput
                                    style={{width:200,borderBottomWidth:1,borderBottomColor:'grey',padding:5}}
                                    placeholder='Email'
                                    placeholderTextColor={'grey'}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                            </View>
                            <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'center',marginBottom:10}}>
                                <Ionicons name='key' size={30} color="black" style={{marginRight:10,marginTop:8}}/>
                                <TextInput
                                    style={{width:200,borderBottomWidth:1,borderBottomColor:'grey',padding:5}}
                                    placeholder='Password'
                                        placeholderTextColor={'grey'}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry
                                />
                            </View>


                        
                        <TouchableOpacity onPress={handleSubmit} style={{width:160,height:40,borderRadius:50,marginTop:10,backgroundColor:'black',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white',fontWeight:'bold',fontSize:17}}>Login</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize:15,fontWeight:'500',color:'grey',marginTop:10}}>New User?<Text onPress={()=>navigation.navigate('Signin')} style={{fontSize:15,fontWeight:'500',color:'green'}}>Sign Up</Text></Text>
                    </View>
                )}
            </Formik>

        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner:{
        flex:1
  },
});


export default LoginScreen;

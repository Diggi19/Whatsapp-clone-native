import { StyleSheet, Text, View,Image,TouchableOpacity,Button, TextInput } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {addDoc, collection, doc, getDoc, setDoc} from 'firebase/firestore'
import {auth, db, storage} from '../../Firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRoute } from '@react-navigation/native';

const AddProfile = () => {
    // routes
    const {email,password,phone} = useRoute().params

    

    // permissions
    const[cameraPermission,setcameraPermission] = React.useState(null)
    const[galleryPermission,setgalleryPermission] = React.useState(null)

    // device data
    const[profilePicture,setprofilePicture] = React.useState(null)
    const[username,setusername]= React.useState(null)

    const[UploadablePic,setUploadablePic] = React.useState(null)

    const getCameraPermsiion = async()=>{
        const result = await Camera.getCameraPermissionsAsync()
        console.log(result.granted)
    }
    const accessCamera = async()=>{
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })
        if(result.cancelled) return console.log('selection canceled')
        console.log(result.uri) 
        setprofilePicture(result.uri)
    }

    // gallery setup
    const getGalleryPermission = async()=>{
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync()
        console.log(result.granted)
        if(!result.granted) return setgalleryPermission(false)
        setgalleryPermission(result.granted)
    }

    const accessGallery = async()=>{
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3],
            quality:.5,
            
        }) 
        if (result.cancelled) return console.log('selection was canceled')
        if (!result.cancelled && galleryPermission) {
            setprofilePicture(result.uri)
            console.log(result.uri)
        }else{
            alert('there was an error importing the picture ')
        }
        
    }
    const uploadImage = async(email,password,phone,username,profile)=>{
        // console.log(profile)
        const storageRef = ref(storage,'image.jpg')
        // image to bytes
        const image = await fetch(profile)
        const bytes = await image.blob()

        const uploadTask = uploadBytesResumable(storageRef,bytes)
        uploadTask
            .on(
                'state_changed',
                (snapshot)=>console.log('uploaded image'),
                (err)=>console.log(err),
                 async()=>{
                    const doanloadUrl  =  await getDownloadURL(uploadTask.snapshot.ref)
                    
                    // creating user
                    const result = await createUserWithEmailAndPassword(auth,email,password)
                    if (!result.user) return console.log('user not created')
                    console.log(result.user,'😊')

                    // sending to db
                    const collectionRef = collection(db,'users')
                    const docRef = doc(collectionRef,phone)
                    const create = setDoc(docRef,{
                        userEmail:result.user.email,
                        PhoneNumber:phone,
                        username:username,
                        image:doanloadUrl
                    })
                }
            )
            
    }
    
    // login and create user profile
    const createUser = async(email,password,phone,username,imageurl)=>{
        const result = await createUserWithEmailAndPassword(auth,email,password)
        if (!result.user) return console.log('user not created')
        console.log(result.user,'😊')

        // sending to db
       const collectionRef = collection(db,'users')
       const docRef = doc(collectionRef,phone)
       const create = setDoc(docRef,{
           userEmail:result.user.email,
           PhoneNumber:phone,
           username:username,
           image:imageurl
       })
    
    }


    React.useEffect(()=>{
        // getCameraPermsiion()
        getGalleryPermission()
        console.log(email,password,phone)
        
    },[])
    return (
    <View style={styles.conatiner}>
        
        <View style={{width:'100%',height:350,justifyContent:'center',alignItems:'center',backgroundColor:'#e8e5e7'}}>
            <Text style={{fontSize:20,fontWeight:'bold',marginBottom:15}}>Setting profile picture</Text>
            <Image source={{uri:profilePicture?profilePicture:'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}} style={{width:160,height:160,borderRadius:80}}/>
            <View style={{alignItems:'center',width:'60%',height:30,marginTop:10,flexDirection:'row',justifyContent:'center'}}>
                <Ionicons name='person' style={{marginRight:10,marginLeft:9}} size={20} color="black"/>
                <TextInput
                    style={{width:100}}
                    placeholder='Enter your name'
                    value={username}
                    onChange={(e)=>setusername(e.nativeEvent.text)}
                    
                />
            </View>
            <View style={{width:'40%',height:.5,backgroundColor:'black'}}></View>
        </View>
        <View style={{width:'100%',height:220,marginTop:25,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
            <View style={{width:'100%',height:100,backgroundColor:'white',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>accessCamera()} style={{marginRight:20,borderRadius:50,width:60,height:60,backgroundColor:'black',alignItems:'center',justifyContent:'center'}}>
                <Ionicons name='camera' size={30} color='white'/>
            </TouchableOpacity>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Or</Text>
            <TouchableOpacity onPress={()=>accessGallery()} style={{marginLeft:20,borderRadius:50,width:60,height:60,backgroundColor:'black',alignItems:'center',justifyContent:'center'}}>
                <Ionicons name='image' size={30} color='white'/>
            </TouchableOpacity>

            </View>
            <Text style={{marginBottom:10,color:'grey'}}>Click a Picture or Select from Gallery</Text>
            <View >
                <TouchableOpacity onPress={()=>{
                    uploadImage(email,password,phone,username,profilePicture)
                }} style={{width:120,height:40,backgroundColor:'black',marginTop:25,borderRadius:60,justifyContent:'center',alignItems:'center'}}>
                    {profilePicture?<Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>Done</Text>:<Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>Skip</Text>}
                </TouchableOpacity>
                
            </View>
        </View>
 
    </View>
  );
};

export default AddProfile;

const styles = StyleSheet.create({
    conatiner:{

    },
});

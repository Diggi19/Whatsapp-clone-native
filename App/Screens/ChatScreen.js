import { Image, ImageBackground, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ChatHeader from '../Reusables/Chat/ChatHeader';
import { FontAwesome, Entypo,Ionicons } from '@expo/vector-icons'; 
import EmojiBoard from 'react-native-emoji-board'
import Message from '../Reusables/Contact/Message';
import { useRoute } from '@react-navigation/native';
import { addDoc, collection, doc, onSnapshot, orderBy, serverTimestamp, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../Firebase';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const ChatScreen = () => {
    const currentUser = auth.currentUser.email //current user
    
    const {show,setshow}=React.useState(true)
    const routes = useRoute().params
    const{user,name,contact,messages} = routes
    
    const[typedMEssage,settypedMessage] = React.useState('')
    
    
    // rooms
    const [chatMessages,setchatMessages] = React.useState([])



    const sendMessage = async(sendmessage)=>{
        if (sendmessage.length >=1) {
            const subCollectionRef = collection(db,'rooms',user,'messages')
            const sendMessage = await addDoc(subCollectionRef,{
                text:sendmessage,
                email:currentUser,
                timeStamp:Date().toString(),
                type:'message'
            })
            // const update = updateDoc(user,{lastMessage:chatMessages[chatMessages.length - 1].text})
            settypedMessage('')
            
        }else{
            console.log('please type')
        }
    }

    const sendImage = async()=>{
        // open gallery and select image

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })
        if(result.cancelled) return console.log('selection canceled')
        console.log(result.uri) 

        const imageUrl = result.uri // image url
        const storageRef = ref(storage,'image.jpg')
        // image to bytes
        const image = await fetch(imageUrl)
        const bytes = await image.blob()

        const uploadTask = uploadBytesResumable(storageRef,bytes)
        uploadTask
            .on(
                'state_changed',
                (snapshot)=>console.log('uploaded image'),
                (err)=>console.log(err),
                 async()=>{
                    const downloadURL  =  await getDownloadURL(uploadTask.snapshot.ref)
                    // send image type message
                    const subCollectionRef = collection(db,'rooms',user,'messages')
                    const sendMessage = await addDoc(subCollectionRef,{
                    text:downloadURL,
                    email:currentUser,
                    timeStamp:Date().toString(),
                    type:'image'
            })
                    
                }
            )        
    }


    const handleRoom = async()=>{
        const collectionRef = collection(db,'rooms')
        onSnapshot(collectionRef,(snapshot)=>{
            /* getting all data */
            const roomData = snapshot.docs.map((room)=>room.data())
            // console.log('🤣',roomData)
            
            /* checking if selected room exists */
            const isRoomPresent = roomData.filter((room)=>room.displayName === name)
            
            /* handleing yes & no cases*/
            if (isRoomPresent.length >=1) {

                /* if room exists*/
                const subCollectionRef = collection(db,'rooms',user,'messages')
                onSnapshot(subCollectionRef,(messagesnapshot)=>{
                    setchatMessages(messagesnapshot.docs.map((message)=>message.data()))
                })
                
            }else{
                /* if room dosen't exists*/
                // console.log('room DN exists')
                const docRef = doc(collectionRef,user)
                const newRoom =  setDoc(docRef,{
                    displayName:name,
                    email : user,
                    lastMessage:'',
                    photoURL:'d',
                    participantsArray:[
                        user,
                        currentUser
                        

                    ]
                })

            }
        })
          
    }



    React.useEffect(()=>{
        handleRoom()
    },[])
  return (
    <View style={styles.conatiner}>
        {/* header */}
        <ChatHeader name={name}/>
        {/* main body */}
        <View style={{width:'100%',height:510,backgroundColor:'grey'}}>
            <Image source={require('../../assets/background.jpg')} style={{width:'100%',height:'100%',opacity:.8}}/>
            <View style={{width:'100%',height:'100%',zIndex:1000,position:'absolute'}}>
                <ScrollView>
                    {chatMessages.map((message,index)=><Message key={index} {...message}/>)}
                </ScrollView>
            </View>
        </View>
        {/* typingsection */}
        <View style={{width:'95%',alignSelf:'center',height:55,flexDirection:'row',alignItems:'center',position:'absolute',bottom:5,borderRadius:50}}>
            <View style={{width:310,height:47,borderRadius:50,flexDirection:'row',alignItems:'center',justifyContent:'space-around',backgroundColor:'black'}}>
            {/* emoji keypad */}
            <FontAwesome name='smile-o' size={30} color="grey"/>
            {/* input */}
            <TextInput
                style={{width:200,color:'white'}}
                placeholder='message'
                placeholderTextColor='grey'
                value={typedMEssage}
                onChange={(e)=>settypedMessage(e.nativeEvent.text)}
                
                
            />
            {/* media option */}
            <TouchableOpacity onPress={()=>sendImage()}>
                <FontAwesome name='camera' size={30} color="grey"/>
            </TouchableOpacity>
            </View>

            {/* voice */}
            <TouchableOpacity onPress={()=>sendMessage(typedMEssage)} style={{marginLeft:2,width:35,height:35,justifyContent:'center',alignItems:'center',borderRadius:50,backgroundColor:'#28af7c'}}>
                <Ionicons  name='send-sharp' size={25} color="white"/>
            </TouchableOpacity>

        </View>
        
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
    conatiner:{
        flex:1,
        // marginTop:Platform.OS === 'android'?StatusBar.currentHeight:0,
        backgroundColor:'#161616'


    }
});

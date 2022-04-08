import { TouchableOpacity, StyleSheet, Text, View, Modal } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons'; 
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../Firebase';
import LottieView from 'lottie-react-native';

const HeadToggle = () => {
    const[ActiveBtn,setActiveBtn] = React.useState('chats')
    const navigation = useNavigation()
    const[Loading,setLoading] = React.useState(false)

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
        setLoading(true)
        const imageUrl = result.uri 
        const storageRef = ref(storage,'image.jpg')
        // image to bytes
        const image = await fetch(imageUrl)
        const bytes = await image.blob()

        const uploadTask =  uploadBytesResumable(storageRef,bytes)
        uploadTask
            .on(
                'state_changed',
                (snapshot)=>console.log('uploaded image'),
                (err)=>console.log(err),
                 async()=>{
                    const downloadURL  =  await getDownloadURL(uploadTask.snapshot.ref)
                    // send image type message
                    setLoading(false)
                    navigation.navigate('SelectScreen',{imageUrl:downloadURL}) 

                    
                }
            )        

    }


    React.useEffect(()=>{
        getCameraPermsiion()
    },[])

  return (
    <View style={styles.conatiner}>
        <TouchableOpacity style={{width:30,alignItems:'center',justifyContent:'center'}} onPress={()=>accessCamera()} >
            <FontAwesome name='camera' size={25} color="grey"/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>setActiveBtn('chats')} style={{width:70,alignItems:'center',borderBottomWidth:2,borderBottomColor:ActiveBtn === 'chats'?'#28af7c':'#333131',justifyContent:'center'}}>
            <Text style={{color:ActiveBtn === 'chats'?'white':'grey',fontSize:20,fontWeight:'bold'}}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setActiveBtn('status')} style={{width:70,alignItems:'center',borderBottomWidth:2,borderBottomColor:ActiveBtn === 'status'?'#28af7c':'#333131',justifyContent:'center'}}>
            <Text style={{color:ActiveBtn === 'status'?'white':'grey',fontSize:20,fontWeight:'bold'}}>Status</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setActiveBtn('calls')} style={{width:70,alignItems:'center',borderBottomWidth:2,borderBottomColor:ActiveBtn === 'calls'?'#28af7c':'#333131',justifyContent:'center'}}>
            <Text style={{color:ActiveBtn === 'calls'?'white':'grey',fontSize:20,fontWeight:'bold'}}>Calls</Text>
        </TouchableOpacity>
        <Modal
            visible={Loading}
            transparent={true}
        >
            <View style={{flex:1,backgroundColor:'black',opacity:0.7}}>
                <LottieView source={require('../../../assets/78259-loading.json')} autoPlay loop />
            </View>
        </Modal>
    </View>
  );
};

export default HeadToggle;

const styles = StyleSheet.create({
    conatiner:{
        width:'100%',
        height:45,
        backgroundColor:'#333131',
        flexDirection:'row',
        justifyContent:'space-around',
        

    },
});

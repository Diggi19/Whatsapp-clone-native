import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';

import image from '../../assets/profile.png'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../Firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

const Test = () => {
    const[imageurl,setimageurl]=React.useState(null)

    const getdata = async()=>{
      const collectionRef = collection(db,'users')
      const collectiondata = await getDocs(collectionRef)
      const data = collectiondata.docs.map(doc=>doc.data())
      console.log(data)
      setimageurl(data)
    }
          
    React.useEffect(()=>{
      getdata()
    },[])

  return (

    
    <View style={styles.container}>
        <TouchableOpacity  style={{width:100,height:100,alignSelf:'center',backgroundColor:'grey'}}>
            <Text>Cehkk</Text>
        </TouchableOpacity>
        <View style={{width:100,height:100}}>
          <Image source={{uri:imageurl[0].image}} style={{width:100,height:100}}/>
        <Text>{imageurl[0].username}</Text>        
        </View>
        
    </View>
  );
};


const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
});

export default Test;

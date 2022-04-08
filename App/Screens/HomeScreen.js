import { Modal, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import HomeHeader from '../Reusables/Home/HomeHeader';
import HeadToggle from '../Reusables/Home/HeadToggle';
import SingleChat from '../Reusables/Home/SingleChat';
import { MaterialIcons } from '@expo/vector-icons'; 
import SingleContact from '../Reusables/Contact/SingleContact';
import ContactList from '../Components/ContactList';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
import SelectionList from '../Components/SelectionList';

const data = [
  {
    id:1,
    name:'eren yeager',
    user:'eren@gmail.com',
    contact:4444444444,
    messages:[
      {
        id:1,
        message:'hello people',
        user:'eren@gmail.com'
      },
      {
        id:2,
        message:'its only one people',
        user:'zeke@gmail.com'
      },
      {
        id:3,
        message:'whatever',
        user:'eren@gmail.com'
      },

    ]
  },
  {
    id:2,
    name:'zeke yeager',
    user:'zeke@gmail.com',
    contact:4244444444,
    messages:[
      {
        id:1,
        message:'hello ',
        user:'zeke@gmail.com'
      }
    ]
  },
  {
    id:2,
    name:'zeke yeager',
    user:'zeke@gmail.com',
    contact:4244444444,
    messages:[
      {
        id:1,
        message:'hello ',
        user:'zeke@gmail.com'
      }
    ]
  },
  {
    id:2,
    name:'zeke yeager',
    user:'zeke@gmail.com',
    contact:4244444444,
    messages:[
      {
        id:1,
        message:'hello ',
        user:'zeke@gmail.com'
      }
    ]
  },
  {
    id:2,
    name:'zeke yeager',
    user:'zeke@gmail.com',
    contact:4244444444,
    messages:[
      {
        id:1,
        message:'hello ',
        user:'zeke@gmail.com'
      }
    ]
  },
  {
    id:2,
    name:'zeke yeager',
    user:'zeke@gmail.com',
    contact:4244444444,
    messages:[
      {
        id:1,
        message:'hello ',
        user:'zeke@gmail.com'
      }
    ]
  },
  {
    id:2,
    name:'zeke yeager',
    user:'zeke@gmail.com',
    contact:4244444444,
    messages:[
      {
        id:1,
        message:'hello ',
        user:'zeke@gmail.com'
      }
    ]
  },
  {
    id:2,
    name:'zeke yeager',
    user:'zeke@gmail.com',
    contact:4244444444,
    messages:[
      {
        id:1,
        message:'hello ',
        user:'zeke@gmail.com'
      }
    ]
  }

]





const HomeScreen = () => {
  const currentUser = auth.currentUser.email

  const[showModal,setshowModal] = React.useState(false)
  const[roomData,setroomData] = React.useState([])
  const newData = data.filter((data)=>data.messages.length >=1)

  const getdataRealtime = async()=>{
    const collectionRef = collection(db,'rooms')
    onSnapshot(collectionRef,(snapshot)=>{
      const data = snapshot.docs.map((room)=>room.data())
      // console.log('🤣',data)
      const filterdata = data.filter((room)=>room.participantsArray.includes(currentUser) && room.lastMessage !=='')
      // console.log(filterdata,'😉')
      setroomData(filterdata)
    })
  }


  // const getdata = async()=>{
  //   const collectionRef = collection(db,'rooms')
  //   const collectionData = await getDocs(collectionRef)
  //   const final = collectionData.docs.map((room)=>room.data())
  //   const filterdata = final.filter((room)=>room.participantsArray.includes('zeke@gmail.com') && room.lastMessage !=='')
  //   console.log(final)
  //   console.log(filterdata,'😀')
  //   setroomData(filterdata)
    
  // }



  React.useEffect(()=>{
    // getdata()
    getdataRealtime()
  },[])
  return (
    <View style={styles.conatiner}>
      <HomeHeader/>
      <HeadToggle/>
      
      <View style={{width:'100%',height:.5,backgroundColor:'#727171'}}></View>
      <View style={{width:'100%',height:490}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {roomData.map((user,index)=><SingleChat key={index} {...user}/>)}
        </ScrollView>
        
      </View>
      <TouchableOpacity onPress={()=>setshowModal(true)} style={{position:'absolute',bottom:30,right:20,width:50,height:50,justifyContent:'center',alignItems:'center',backgroundColor:'#28af7c',borderRadius:50}}>
        <MaterialIcons name="message" size={30} color="white" />
      </TouchableOpacity>

      {/*  contacts  */}
      <Modal
        visible={showModal}
        animationType='slide'
      >
        <ContactList setshowModal={setshowModal}/>
      </Modal>

      {/* selection */}
      {/* <Modal
        visible={true}
        animationType='slide'
      >
        <SelectionList/>
      </Modal> */}

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  conatiner:{
    // marginTop:Platform.OS === 'android'?StatusBar.currentHeight:0,
    flex:1,
    backgroundColor:'#333131',

  },
});

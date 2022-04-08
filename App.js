import React from 'react'
import { View, Text, StyleSheet, Platform, StatusBar,LogBox } from 'react-native'
import {onAuthStateChanged} from 'firebase/auth'
import { auth} from './Firebase'
import AuthScreen from './App/Screens/AuthScreen'
import AddProfile from './App/Screens/AddProfile'
import Test from './App/Screens/Test'
import AuthNavigation from './App/navigation/AuthNavigation'
import HomeScreen from './App/Screens/HomeScreen'
import ChatScreen from './App/Screens/ChatScreen'
import AppNavigation from './App/navigation/AppNavigation'


LogBox.ignoreLogs([
  'setting a timer',
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"
])
const App = () => {
  const [currentUser,setcurrentUser] = React.useState(null)
  
  
  
  React.useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      if (user) {
        setcurrentUser(user)
      }else{
        setcurrentUser(null)
      }
    })

    return () => unsubscribe
  },[])
  return (
    <View style={styles.conatiner}>
      {!!currentUser?<AppNavigation/>:<AuthNavigation/>}
      {/* <AuthScreen/>       */}
      {/* <AddProfile/> */}
      {/* <Test/> */}
      {/* <AuthNavigation/> */}
      {/* <HomeScreen/> */}
      {/* <ChatScreen/> */}
      {/* <AppNavigation/> */}
    </View>
  )
}

const styles = StyleSheet.create({
  conatiner:{
    flex:1,
    // marginTop:Platform.OS === 'android' ? StatusBar.currentHeight:0,
    backgroundColor:'#333131',

  },
});

export default App

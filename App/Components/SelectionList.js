import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SelectionHeader from '../Reusables/selection/SelectionHeader';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
import SingleSelect from '../Reusables/selection/SingleSelect';
import { useRoute } from '@react-navigation/native';

const SelectionList = ({setshowModal}) => {
    const currentUser = auth.currentUser.email
    const [selectedData,setselectedData] = React.useState([])
    
    const routes = useRoute().params
    const {imageUrl} = routes
    


    const getdataRealtime = async()=>{
        const collectionRef = collection(db,'rooms')
        onSnapshot(collectionRef,(snapshot)=>{
          const data = snapshot.docs.map((room)=>room.data())
          // console.log('🤣',data)
          const filterdata = data.filter((room)=>room.participantsArray.includes(currentUser) && room.lastMessage !=='')
          console.log(filterdata,'😉')
          setselectedData(filterdata)
        })
      }


      React.useEffect(()=>{
          getdataRealtime()
      },[])
  return (
    <View style={styles.conatiner}>
      <SelectionHeader />
      <View style={{width:'100%',height:537}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {selectedData.length > 1 && selectedData.map((selected,index)=><SingleSelect {...selected} imageUrl={imageUrl} key={index} />)}
            {/* <SingleSelect displayName="eren" email="diggy@gmail.com"/> */}
        </ScrollView>
        </View>
    </View>
  );
};

export default SelectionList;

const styles = StyleSheet.create({
  conatiner:{
    flex:1,
    backgroundColor:'#333131',
  },
});

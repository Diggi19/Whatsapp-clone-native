import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Contactheader from '../Reusables/Contact/Contactheader';
import SingleContact from '../Reusables/Contact/SingleContact';
import * as Contacts from 'expo-contacts';

const ContactList = ({setshowModal}) => {
  const [contacts,setcontacts] = React.useState([])
  const contactPermsiion = async()=>{
    const permission = await Contacts.requestPermissionsAsync()

    if (!permission.granted) return alert('your app has denied contact permission')

    const contacts = await Contacts.getContactsAsync()
    console.log(contacts)
    setcontacts(contacts.data)

  }

  React.useEffect(()=>{
    contactPermsiion()
  },[])


  return (
    <View style={styles.conatiner}>
      <Contactheader contacts={contacts} setshowModal={setshowModal}/>
      <View style={{width:'100%',height:537}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {contacts.length > 1 && contacts.map((contact,index)=><SingleContact {...contact} key={index} />)}
          
        </ScrollView>
        </View>
    </View>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  conatiner:{
    flex:1,
    backgroundColor:'#333131',
  },
});

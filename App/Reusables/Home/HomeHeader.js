import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';
import React from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons'; 

const HomeHeader = () => {
  return (
    <View style={styles.container}>
        <View style={{marginLeft:10,width:100,height:40,alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../../../assets/sendlogo.png')} style={{width:70,height:30}} resizeMode='contain'/>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-around',width:100,marginRight:10,alignItems:'center'}}>
            <TouchableOpacity>
                <FontAwesome name='search' size={25} color='white'/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo name='dots-three-vertical' size={25} color='white'/>
            </TouchableOpacity>

        </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
    container:{     
        width:'100%',
        height:75,
        backgroundColor:'#333131',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'

    }
});

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import ChatScreen from '../Screens/ChatScreen';
import SelectionList from '../Components/SelectionList';




const AppNavigation = () => {
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}}/>
                <Stack.Screen name='ChatScreen' component={ChatScreen} options={{headerShown:false}}/>
                <Stack.Screen name='SelectScreen' component={SelectionList} options={{headerShown:false}}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;

const styles = StyleSheet.create({});

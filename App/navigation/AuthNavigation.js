import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../Screens/AuthScreen';
import AddProfile from '../Screens/AddProfile';
import LoginScreen from '../Screens/LoginScreen';




const AuthNavigation = () => {
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name='Signin' component={AuthScreen} options={{headerShown:false}}/>
                <Stack.Screen name='Addprofile' component={AddProfile} options={{headerShown:false}}/>
                <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown:false}}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigation;

const styles = StyleSheet.create({});

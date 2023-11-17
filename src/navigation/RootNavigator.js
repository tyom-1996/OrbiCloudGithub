import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthContext} from "../components/AuthContext/context";
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from "react-native-splash-screen";


import LoginScreen from '../components/screens/AuthScreens/Login.js';
import RegisterScreen from '../components/screens/AuthScreens/Registration';



// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();




const RootNavigator = () => {
    // AsyncStorage.clear()




    return (
            <NavigationContainer>
                <>
                    <Stack.Navigator
                        initialRouteName='LoginScreen'
                        screenOptions={{
                            headerShown: false,
                            animationEnabled: true,
                            detachPreviousScreen: true,
                            presentation: 'transparentModal'
                        }}
                    >
                        <Stack.Screen
                            name="LoginScreen"
                            component={LoginScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                        />
                        <Stack.Screen
                            name="RegisterScreen"
                            component={RegisterScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                        />

                    </Stack.Navigator>

                </>



            </NavigationContainer>


    );
};

export default RootNavigator;

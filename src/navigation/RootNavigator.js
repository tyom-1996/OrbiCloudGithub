import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthContext} from "../components/AuthContext/context";
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from "react-native-splash-screen";


import Login from '../components/screens/AuthScreens/Login';
import Register from '../components/screens/AuthScreens/Registration';
import Profile from '../components/screens/Profile';



// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



const RootNavigator = (props) => {
    // AsyncStorage.clear()
    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);

    const initialLoginState = {
        isLoading: true,
        userToken: null,
    };

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
        signIn: async (foundUser, callback) => {
            setIsLoading(true);
            const userToken = String(foundUser.token);

            // setUserToken(userToken);

            try {
                await AsyncStorage.setItem('userToken', userToken);
            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'LOGIN',  token: userToken});
            setIsLoading(false);
            callback();
        },
        signOut: async (callback) => {
            try {
                await AsyncStorage.removeItem('userToken');
                setIsLoading(false);

            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'LOGOUT'});
            callback();
        },
        signUp: () => {
            // setIsLoading(false);
        }
    }), []);



    // Проверка при входе в приложение.
    React.useEffect(() => {


        setTimeout(async () => {
            // await AsyncStorage.removeItem('userToken', userToken);
            let userToken;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                setIsLoading(false);
                SplashScreen.hide();
            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
        }, 2000);
    }, []);



    return (
        <AuthContext.Provider value={authContext}>
        <NavigationContainer>
            <>
                {loginState.userToken !== null ?
                    (

                        <Stack.Navigator
                            initialRouteName='Profile'
                            screenOptions={{
                                headerShown: false,
                                animationEnabled: true,
                                detachPreviousScreen: true,
                                presentation: 'transparentModal'
                            }}
                        >

                            <Stack.Screen
                                name="Profile"
                                component={Profile}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                            />


                        </Stack.Navigator>
                    )
                    :
                    (
                        <Stack.Navigator
                            initialRouteName='Login'
                            screenOptions={{
                                headerShown: false,
                                animationEnabled: true,
                                detachPreviousScreen: true,
                                presentation: 'transparentModal'
                            }}
                        >
                            <Stack.Screen
                                name="Login"
                                component={Login}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                            />
                            <Stack.Screen
                                name="Register"
                                component={Register}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                            />


                        </Stack.Navigator>
                    )
                }

            </>



        </NavigationContainer>
        </AuthContext.Provider>



    );
};

export default RootNavigator;

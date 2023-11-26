import * as React from 'react';
import {useRef, useState, useEffect, } from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import {AuthContext} from "../AuthContext/context";
import { useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';
import LogoutIcon from '../../assets/svg/Logout'



import {
    Text,
    Alert,
    Button,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    Platform,
    Dimensions,
    Linking
} from 'react-native';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import {Link} from "@react-navigation/native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Profile (props) {

    const [token, setToken] = useState(null);

    const getToken = async () => {
        let token = await AsyncStorage.getItem('userToken');
        setToken(token)
    }
    useEffect(  () => {
         // AsyncStorage.clear()
        getToken();
    }, []);

    const context = useContext(AuthContext);

    const  logout = async () => {

         let token = await AsyncStorage.getItem('userToken');

        let myHeaders = new Headers();

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

            fetch(`https://orbicloud.com/auth?api_access=100&api_access_key=${token}`, requestOptions)
                .then(response => response.json())
                .then(async result => {
                    console.log(result,'logout')
                    if (result?.success === true) {
                        context.signOut(() => {
                            props.navigation.navigate('Login')
                            
                        }).then(r => console.log("logOut"));

                    }
                })
                .catch(error => console.log('error', error));
    }



    const WebviewComponent =  () => {
        const injectedJavaScript = `
      $.ajax({
        type: ‘GET’,
        url: 'https://orbicloud.com/?app_access_val = 121'
        success: function(ex) { 
            alert(ex); 
          }
        });
       });`




        return (

            <WebView
                style={{
                    height: windowHeight,
                    width: windowWidth,
                    marginTop: 25
                    // flex: 1,
                }}
                useWebKit={true}
                source={{ uri: `https://orbicloud.com/?api_access_key=${token}`}}
                androidHardwareAccelerationDisabled={true}
                allowFileAccess={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                // injectedJavaScript={injectedJavaScript}
                onNavigationStateChange={(webViewState)=>{
                    // console.log(payment_url, 'payment_url');

                }}
            />

        )


    }


    return (
        <SafeAreaView style={[styles.container]}>
            <TouchableOpacity style={styles.logout_btn} onPress={() => logout()}>
                <LogoutIcon/>
            </TouchableOpacity>
            <WebviewComponent/>

        </SafeAreaView>
    );
}

export default Profile;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0c0d21',
        width: "100%",
        height:  '100%',
        position: 'relative',
        paddingHorizontal: 20,
        paddingTop: 30,

    },

    logout_btn: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 9999,
    }



});

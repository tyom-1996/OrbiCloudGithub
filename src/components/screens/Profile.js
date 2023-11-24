import * as React from 'react';
import {useRef, useState, useEffect, } from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';



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


    return (
        <SafeAreaView style={[styles.container]}>
          <Text>helooo</Text>
            <WebView
                style={{
                    height: '100%',
                    width: '100%',
                    flex: 1,
                }}
                useWebKit={true}
                source={{ uri: 'https://swiperjs.com/demos'}}
                androidHardwareAccelerationDisabled={true}
                allowFileAccess={true}
                onNavigationStateChange={(webViewState)=>{
                    // console.log(payment_url, 'payment_url');
                    console.log(webViewState.url, 'WebView onNavigationStateChange')
                    console.log(webViewState.url.indexOf('https://yoomoney.ru/checkout/payments/v2/success?orderId'), 'WebView succss')

                    if(webViewState.url.indexOf('https://farm-meat.site/shop/orders/payment/view/') !== -1)
                    {
                        console.log('cancel')

                    } else if (webViewState.url.indexOf('https://yoomoney.ru/checkout/payments/v2/success?orderId') !== -1) {
                        console.log('sucess');
                    }


                }}
                javaScriptEnabled = {true}
                // domStorageEnabled = {true}
            />
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



});

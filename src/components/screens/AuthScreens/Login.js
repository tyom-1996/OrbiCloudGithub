import * as React from 'react';
import {useRef, useState, useEffect, } from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';



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
function Login (props) {

    // AsyncStorage.clear()

    const [auth_key, setAuthKey] = useState('');
    const [auth_key_error, setAuthKeyError] = useState(false);
    const [auth_key_error_text, setAuthKeyErrorText] = useState('');
    const [show_pin_code_popup, setShowPinCodePopup] = useState(false);

    const [pin_code, setPinCode] = useState('');
    const [pin_code_error, setPinCodeError] = useState(false);
    const [pin_code_error_text, setPinCodeErrorText] = useState('');

    const context = useContext(AuthContext);

    const login = async () => {

        console.log(auth_key, 'key')
        // console.log(auth_key, 'key')
        if (auth_key.length == 0) {
            setAuthKeyError(true)
            setAuthKeyErrorText('login_empty')
        } else {
            setAuthKeyError(false)
            setAuthKeyErrorText('')
            let myHeaders = new Headers();

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`https://orbicloud.com/auth?api_access=100&auth_key=${auth_key}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result?.success,'result')
                    if (result?.success === true) {
                        console.log('ghhhhhhd')

                        let foundUser = {
                            token: result?.token_auth,
                        }

                        context.signIn(foundUser, () => {
                            props.navigation.navigate('Profile')

                        }).then(r => console.log("success"));
                    }
                })
                .catch(error => console.log('error', error));
        }
    }



    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.logo}>
                <Image style={styles.logo_child_img} source={require('../../../assets/images/logo.png')}/>
            </View>
            <ScrollView style={styles.login_main_wrapper}>

                <Text style={styles.login_title}>
                    Log in to your OrbiCloud account to purchase OrbiBox and participate in the Coaching Program
                </Text>
                <View style={styles.login_input_title_buttons_support_link_main_wrapper}>
                    <View style={styles.login_input_title_wrapper}>
                        <Text style={styles.login_input_title}>
                            Enter the authorization key to log into your account
                        </Text>
                        <TextInput
                            style={[styles.login_input_field]}
                            onChangeText={(val) => setAuthKey(val)}
                            value={auth_key}
                            name='auth_key'
                            placeholder='auth:*****'
                            placeholderTextColor='#ffffff80'
                        />
                        {auth_key_error &&
                            <Text style={styles.error_text}>{auth_key_error_text}</Text>
                        }
                    </View>
                    <View style={styles.login_registration_buttons_wrapper}>
                        <LinearGradient
                            colors={['#e7459a', '#6e62aa', '#66c8d8']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.login_button_linearGradient}
                        >
                            <TouchableOpacity style={styles.login_button} onPress={() => login()}>
                                <Text style={styles.login_button_text}>
                                    Authorization
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>

                        <Link to={'/Register'} style={styles.registration_button}>
                            {/*<Text style={styles.registration_button_text}></Text>*/}
                            Create Account
                        </Link>

                    </View>
                    <View style={styles.login_support_manager_link_info_wrapper}>
                        <Text style={styles.login_support_manager_link_info}>
                            Contact{' '}
                            <Text style={styles.login_support_manager_link} onPress={() => Linking.openURL('https://t.me/OrbiCloudSupport')}>
                                OrbiCloud Support Manager
                            </Text>{' '}
                            for recovery in case of loss. Pin Code required.
                        </Text>
                    </View>

                </View>
                <View style={styles.login_info_wrapper}>
                    <Text style={styles.login_info1}>'The future enters into us, in order to transform itself in us, long before it happens.' </Text>
                    <Text style={styles.login_info2}>— Rainer Maria Rilke </Text>
                </View>

            </ScrollView>

            {show_pin_code_popup &&
                <View style={styles.show_pin_code_popup}>
                <View style={styles.show_pin_code_popup_wrapper}>
                    <View style={styles.logo}>
                        <Image style={styles.logo_child_img} source={require('../../../assets/images/logo.png')}/>
                    </View>
                    <ScrollView style={styles.show_pin_code_popup_main_part}>
                        <View style={styles.show_pin_code_popup_main_part_logo_auth_info_wrapper}>
                            <View style={styles.show_pin_code_popup_main_part_logo}>
                                <Image style={styles.logo_child_img2} source={require('../../../assets/images/logo_ico.png')}/>
                            </View>
                            <Text style={styles.show_pin_code_popup_main_part_info_title}>Save the Authorization Key in a Safe Place:</Text>
                            <Text style={styles.show_pin_code_popup_main_part_info}>{auth_key}</Text>
                        </View>
                        <Text style={styles.show_pin_code_popup_main_part_warning_info}>
                            !Do not provide the authorization key to third parties, as this is the only way to authorize and access the income boxes!
                        </Text>
                        {pin_code_error &&
                        <Text style={styles.code_text_error}>{pin_code_error_text}</Text>
                        }
                        <TextInput
                            style={[styles.register_input_field, {marginBottom: 20}]}
                            onChangeText={(val) => setPinCode(val)}
                            value={pin_code}
                            name='financial_mentor'
                            placeholder='Security Pin Code for Authorization Key Recovery'
                            placeholderTextColor='#ffffff80'
                        />

                        <LinearGradient
                            colors={['#e7459a', '#6e62aa', '#66c8d8']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.set_pin_code_button_linearGradient}>
                            <TouchableOpacity style={styles.login_button} onPress={() => sendPin()}>
                                <Text style={styles.login_button_text}>
                                    Set PIN code
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>

                        <Text style={styles.show_pin_code_popup_main_part_info2}>Use Authorization Key to access OrbiBox</Text>

                    </ScrollView>
                </View>
            </View>
            }
        </SafeAreaView>
    );
}

export default Login;


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

    login_main_wrapper: {
        flex: 1,
        width: '100%',
        paddingTop: 20,
    },
    logo: {
        width: 165,
        height: 36,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 70,

    },
    logo_child_img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    login_title: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 25,
        color: '#ffffff',
        marginBottom: 60,
    },
    login_input_title_buttons_support_link_main_wrapper: {
        width: '100%',
        marginBottom: 60,
    },
    login_input_title_wrapper: {
        width: '100%',
        marginBottom: 25,
    },
    login_input_title: {
        fontSize: 14,
        marginBottom: 15,
        color: '#ffffff',
        opacity: 0.5,
        fontWeight: '600',
    },
    login_input_field: {
        width: '100%',
        height: 48,
        backgroundColor: 'rgba(255,255,255,.08)',
        borderRadius: 2,
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
        paddingTop: 11,
        paddingBottom: 13,
        paddingHorizontal: 16,
    },
    login_registration_buttons_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    login_button_linearGradient: {
        width: 140,
        height: 45,
        borderRadius: 11,
        marginRight: 20,
    },
    login_button: {
        width: 140,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },

    login_button_text: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ffffff',
    },
    registration_button: {
        width: 150,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ffffff',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
        paddingTop: 12,
    },
    registration_button_text: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    login_support_manager_link_info_wrapper: {
        width: '100%',
    },
    login_support_manager_link_info: {
        color: 'rgb(141, 140, 140)',
        fontSize: 12,
        fontWeight: '500',
    },
    login_support_manager_link: {
        color: '#6a82ff',
        fontSize: 12,
        fontWeight: '500',
    },
    login_info_wrapper: {
        width: '100%',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    login_info1: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 2
    },
    login_info2: {
        color: 'rgb(141, 140, 140)',
        fontSize: 12,
        fontWeight: '500',
    },

    error_text: {
        color: 'red',
        fontSize: 14,
        fontWeight: '400',
        width: '100%',
        textAlign: 'center',
        marginTop: 10,

    },

    show_pin_code_popup: {
        backgroundColor:  'rgba(157, 148, 148, 0.49)',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 999,
        zIndex: 999999,
        width: '100%',
        height: '100%',
        position: 'absolute',
        // left: 0,
        // bottom: 0,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    show_pin_code_popup_wrapper: {
        backgroundColor: '#0c0d21',
        width: '100%',
        height: '100%',
        paddingTop: 30,

    },
    show_pin_code_popup_main_part_logo_auth_info_wrapper: {
        backgroundColor: 'rgba(255, 255, 255, 0.088)',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        width: '100%',
        marginBottom: 20,
    },

    show_pin_code_popup_main_part: {
        width: '100%',
        flex: 1,
        paddingHorizontal: 15,

    },
    logo_child_img2: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    show_pin_code_popup_main_part_logo: {
        width: '100%',
        marginBottom: 20,
    },
    show_pin_code_popup_main_part_info_title: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
        textAlign: 'center'
    },
    show_pin_code_popup_main_part_info:{
        fontSize: 16,
        fontWeight: '500',
        color: '#ad6cff',
    },

    show_pin_code_popup_main_part_warning_info: {
        fontSize: 21,
        fontWeight: '600',
        color: '#ffffff',
        marginTop: 12,
        marginBottom: 20,
        textAlign: 'center',
    },
    set_pin_code_button_linearGradient: {
        width: 160,
        height: 45,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 40,
    },
    show_pin_code_popup_main_part_info2: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center',
    }


});

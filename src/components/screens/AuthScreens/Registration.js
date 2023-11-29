import * as React from 'react';
import {useRef, useState, useEffect, } from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-clipboard/clipboard';



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

function Register (props) {

    const [auth_key, setAuthKey] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [financial_mentor, setFinancialMentor] = useState('');
    const [login_error, setLoginError] = useState(false);
    const [login_error_text, setLoginErrorText] = useState('');
    const [password_error, setPasswordError] = useState(false);
    const [password_error_text, setPasswordErrorText] = useState('');

    const [email_error, setEmailError] = useState(false);
    const [email_error_text, setEmailErrorText] = useState('');

    const [show_pin_code_popup, setShowPinCodePopup] = useState(false);

    const [pin_code, setPinCode] = useState('');
    const [pin_code_error, setPinCodeError] = useState(false);
    const [pin_code_error_text, setPinCodeErrorText] = useState('');
    const [token, setToken] = useState('');

    const context = useContext(AuthContext);


    const register = () => {

        var myHeaders = new Headers();

        if (email.length == 0 || phone.length == 0 || password.length == 0 || confirm_password.length == 0 || confirm_password != password) {
                setLoginError(true)
                setLoginErrorText('login_empty')
                if (confirm_password != password) {
                    setLoginError(false)
                    setLoginErrorText('')
                    setPasswordError(true)
                    setPasswordErrorText('The password confirmation does not match!')
                } else {
                    setPasswordError(false)
                    setPasswordErrorText('')
                }
        } else {
            setPasswordError(false)
            setPasswordErrorText('')
            setLoginError(false)
            setLoginErrorText('')

            let formdata = new FormData();
            formdata.append("uMail", email);
            formdata.append("uPhone", phone);
            formdata.append("uPass", password);
            formdata.append("Pass2", confirm_password);
            formdata.append("uRef", financial_mentor);
            formdata.append("api_access", "100");

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://orbicloud.com/create", requestOptions)
                .then(response => response.json())
                .then(result =>
                    {
                        console.log(result, 'register')
                        if (result?.status === false) {
                             if (result?.error_msg == 'Mail used') {
                                    setEmailError(true)
                                    setEmailErrorText('The email already exists')
                             } else {
                                 setEmailError(false)
                                 setEmailErrorText('')
                             }
                        }
                        if (result?.success === true) {
                            setAuthKey(result['Auth key'])
                            setToken(result?.token_auth)
                            console.log(result?.token_auth, 'result?.token_auth')
                            setShowPinCodePopup(true)
                        }
                    }
                    )
                .catch(error => console.log('error', error));
        }

    }

    const sendPin = () => {

        console.log(auth_key, 'key')
        // console.log(auth_key, 'key')
        if (pin_code.length == 0) {
            setPinCodeError(true)
            setPinCodeErrorText('Set Protection code')
        } else {
            setPinCodeError(false)
            setPasswordErrorText('')

            let myHeaders = new Headers();

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`https://orbicloud.com/pin?set_pin=1&pin_1=${pin_code}&api_access_key=${token}`, requestOptions)
                .then( response => response.json())
                .then(async result =>
                    {
                        console.log(result, 'pin')
                        if (result?.success === true) {
                            let foundUser = {
                                token: token,
                            }

                            context.signIn(foundUser, () => {
                                props.navigation.navigate('Profile')

                            }).then(r => console.log("success"));

                        }


                    }
                )
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
                    Welcome to OrbiCloud
                </Text>
                <Text style={styles.register_title}>Explore the technologies of the future by making money on them. </Text>

                <View style={styles.register_input_wrapper}>
                    <TextInput
                        style={[styles.register_input_field]}
                        onChangeText={(val) => setEmail(val)}
                        value={email}
                        name='email'
                        placeholder='Personal Account e-mail'
                        placeholderTextColor='#ffffff80'
                    />
                    {email_error &&
                        <Text style={styles.login_text_error}>{email_error_text}</Text>
                    }
                </View>
                <View style={styles.register_input_wrapper}>
                    <TextInput
                        style={[styles.register_input_field]}
                        onChangeText={(val) => setPhone(val)}
                        value={phone}
                        name='phone'
                        placeholder='Your Phone number (optional)'
                        placeholderTextColor='#ffffff80'
                        keyboardType={'phone-pad'}
                    />
                </View>
                <View style={styles.register_input_wrapper}>
                    <TextInput
                        style={[styles.register_input_field]}
                        onChangeText={(val) => setPassword(val)}
                        value={password}
                        name='password'
                        placeholder='Create a Password'
                        placeholderTextColor='#ffffff80'
                        secureTextEntry={true}
                    />


                </View>
                <View style={styles.register_input_wrapper}>
                    <TextInput
                        style={[styles.register_input_field]}
                        onChangeText={(val) => setConfirmPassword(val)}
                        value={confirm_password}
                        name='confirm_password'
                        placeholder='Enter Your Password Again'
                        placeholderTextColor='#ffffff80'
                        secureTextEntry={true}
                    />
                    {password_error &&
                        <Text style={styles.login_text_error}>{password_error_text}</Text>
                    }
                </View>
                <View style={styles.register_input_wrapper}>
                    <TextInput
                        style={[styles.register_input_field]}
                        onChangeText={(val) => setFinancialMentor(val)}
                        value={financial_mentor}
                        name='financial_mentor'
                        placeholder='Your Financial Mentor (optional)'
                        placeholderTextColor='#ffffff80'
                    />
                    {login_error &&
                         <Text style={styles.login_text_error}>{login_error_text}</Text>
                    }
                </View>


                <View style={styles.register_button_wrapper}>
                        <LinearGradient
                            colors={['#e7459a', '#6e62aa', '#66c8d8']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.login_button_linearGradient}
                        >
                            <TouchableOpacity style={styles.login_button} onPress={() => register()}>
                                <Text style={styles.login_button_text}>
                                    Create Account
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>


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
                                    <TouchableOpacity onPress={() => Clipboard.setString(auth_key)}>
                                        <Text style={styles.show_pin_code_popup_main_part_info}>{auth_key}</Text>
                                    </TouchableOpacity>
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

export default Register;


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
        marginBottom: 50,
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
        marginBottom: 30,
    },
    register_title: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 15,
        color: '#ffffff',
        marginBottom: 50,
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
    register_input_field: {
        width: '100%',
        height: 48,
        backgroundColor: 'rgba(255,255,255,.08)',
        borderRadius: 2,
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
        paddingTop: 11,
        paddingBottom: 13,
        paddingHorizontal: 14,
        fontWeight: '400',
        fontSize: 13,
    },
    register_input_wrapper: {
        width: '100%',
        marginBottom: 12,
    },

    login_registration_buttons_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    login_button_linearGradient: {
        width: 160,
        height: 45,
        borderRadius: 11,
        marginRight: 20,
    },
    login_button: {
        width: 160,
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
    },
    registration_button_text: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ffffff',
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

    register_button_wrapper: {
        width: '100%',
        marginBottom: 40,
        marginTop: 20,
    },
    login_text_error: {
        color: 'red',
        fontSize: 14,
        fontWeight: '400',
        width: '100%',
        textAlign: 'center',
        marginTop: 10,

    },
    code_text_error: {
        color: 'red',
        fontSize: 14,
        fontWeight: '400',
        width: '100%',
        textAlign: 'center',
        marginBottom: 10,

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

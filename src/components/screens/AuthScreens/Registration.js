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

    const [auth_key, setAuthKey] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [financial_mentor, setFinancialMentor] = useState('');

    const context = useContext(AuthContext);


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
                </View>
                <View style={styles.register_button_wrapper}>
                        <LinearGradient
                            colors={['#e7459a', '#6e62aa', '#66c8d8']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.login_button_linearGradient}
                        >
                            <TouchableOpacity style={styles.login_button}>
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
        paddingHorizontal: 16,
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
});

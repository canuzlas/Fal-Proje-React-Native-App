import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native'
import BackIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Axios from 'axios'
import DeviceInfo from 'react-native-device-info'
import CodeInput from 'react-native-confirmation-code-input';

const styles = StyleSheet.create({
    //verify
    container: { backgroundColor: 'black', width: '100%', height: '100%' },
    backButton: { position: 'absolute', left: 15 },
    headerText: { color: '#ffa31a', fontSize: 20, fontWeight: '600' },
    logoView: { justifyContent: 'center', marginTop: 5 },
    loginLogo: { alignSelf: 'center' },


    profileEditContainer: { backgroundColor: 'black', width: '100%', height: '100%' },
    header: { alignItems: 'center', justifyContent: 'center', padding: 20, flexDirection: 'row' },
    backButton: { position: 'absolute', left: 15, top: 15 },
    headerTitle: { alignSelf: 'center', color: 'white', fontSize: 25, fontWeight: '700' },

    //step one
    stepOneView: { justifyContent: 'center', padding: 20, marginTop: 20 },
    stepOneText: { color: 'white', fontSize: 18, alignSelf: 'center', marginTop: 20 },
    profilePhoto: { alignSelf: 'center', width: 150, height: 150, borderRadius: 75, overflow: 'hidden' },
    stepOneButton: { borderColor: 'white', borderWidth: 1, padding: 5, justifyContent: 'center', alignSelf: 'center', width: '60%', height: 80, backgroundColor: 'black', marginTop: 50 }
})
export default ({ navigation }) => {
    const [user, setUser] = useState({})
    const [stepOne, setStepOne] = useState(true)
    const [stepTwo, setStepTwo] = useState(false)
    useEffect(async () => {
        const User = JSON.parse(await AsyncStorage.getItem('User'))
        setUser(User)
        return () => {
            setUser({})
            setStepOne(true)
            setStepTwo(false)
        }
    }, [])

    const verifyToMail = async () => {
        const result = await Axios.default.post('https://falhub.com/api/verifytomail', { token: await AsyncStorage.getItem('token'), device: await DeviceInfo.getAndroidId(), id: user._id })
        if (result.data.success) {
            await AsyncStorage.setItem('VerifyCode', JSON.stringify(result.data.verifyCode))
            setStepOne(false)
            setStepTwo(true)
        } else {
            ToastAndroid.show("Hata.!", ToastAndroid.LONG)
        }
    }

    const _onFulfill = async (code) => {
        const verifyCode = await AsyncStorage.getItem('VerifyCode')
        if (code == verifyCode) {
            const result = await Axios.default.post('https://falhub.com/api/verifytomail?updateverify=true', { verifyCode: code, token: await AsyncStorage.getItem('token'), device: await DeviceInfo.getAndroidId(), id: user._id })
            if (result.data.success) {
                const User = JSON.parse(await AsyncStorage.getItem('User'))
                User.verify = true
                await AsyncStorage.setItem('User', JSON.stringify(User))
                ToastAndroid.show("Hesabınız Onaylandı.!", ToastAndroid.LONG)
                navigation.navigate('Tab')
            } else {
                ToastAndroid.show("Hata.!", ToastAndroid.LONG)
            }
        } else {
            ToastAndroid.show("Kod Hatalı.!", ToastAndroid.LONG)
        }
    }
    return (
        <View style={styles.profileEditContainer}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}><BackIcon name='chevron-back-outline' size={35} color={'#ffa31a'} /></TouchableOpacity>
                <Text style={styles.headerTitle}>Hesabını Onayla</Text>
            </View>
            {stepOne ?
                <View style={styles.stepOneView}>
                    <Image resizeMode='cover' style={styles.profilePhoto} source={user.photo != 'false' ? { uri: 'https://falhub.com/' + user.photo } : require('../../assets/arascreengif/gif.gif')}></Image>

                    <Text style={styles.stepOneText}>Mailiniz :<Text style={{ fontWeight: 'bold' }}>{user.mail}</Text></Text>
                    <TouchableOpacity onPress={() => verifyToMail()} style={styles.stepOneButton}>
                        <Text style={{ fontSize: 18, color: 'white', alignSelf: 'center' }}>Hesabımı Onayla</Text>
                    </TouchableOpacity>
                </View>
                :
                stepTwo ?
                    <View style={styles.container}>
                        <View style={styles.logoView}>
                            <Image style={styles.loginLogo} source={require('../../assets/logo/FH_LOGO.png')}></Image>
                        </View>
                        <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center', marginTop: 10 }}>Lütfen mail adresinize gelen kodu giriniz.</Text>
                        <CodeInput
                            containerStyle={{ alignSelf: 'center' }}
                            activeColor={'#ffa31a'}
                            className={'border-b'}
                            keyboardType="numeric"
                            space={6}
                            size={50}
                            codeLength={6}
                            inputPosition='left'
                            onFulfill={(code) => _onFulfill(code)}
                        />
                    </View>
                    :
                    null

            }
        </View>
    )
}
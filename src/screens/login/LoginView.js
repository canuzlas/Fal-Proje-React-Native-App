import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, TextInput, Button, Alert, ToastAndroid } from 'react-native';
import { useNetInfo } from "@react-native-community/netinfo";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Axios from 'axios'
import DeviceInfo from 'react-native-device-info'

class LoginView extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         refresh: false,
         userIsConnected: true,
         userNameIsEmpty: false,
         passwordIsEmpty: false,
         securityText: true,
         googleVerifyId: null,
         email: null,
         password: null
      }
   }
   onRefresh = () => {
      this.setState({ refresh: true })
      this.props.netInfo.isConnected ? this.setState({ userIsConnected: true, refresh: false }) : this.setState({ userIsConnected: false, refresh: false })
   }
   login = async () => {
      if (this.props.netInfo.isConnected) {
         if (this.state.email == null) {
            this.setState({ userNameIsEmpty: true })
         }
         if (this.state.password == null) {
            this.setState({ passwordIsEmpty: true })
         }
         if (this.state.email != null && this.state.password != null) {
            const result = await Axios.default.post('https://fal-hub.herokuapp.com/api/login?method=email', { mail: this.state.email, password: this.state.password, token: await AsyncStorage.getItem('token'), device: await DeviceInfo.getAndroidId() })
            console.log(result.data)
            if (result.data.success == "error") {
               return ToastAndroid.show("Hata.!", ToastAndroid.LONG)
            } else {
               if (result.data.success) {
                  ToastAndroid.show("Giriş Başarılı", ToastAndroid.LONG)
                  await AsyncStorage.setItem('User', JSON.stringify(result.data.data[0]))
                  await AsyncStorage.setItem('coffeeCount', JSON.stringify(result.data.coffeeCount))
                  await AsyncStorage.setItem('UserLoggedAt', 'email/phone')
                  this.setState({ sending: false })
                  this.props.navigation.navigate('Tab')
               } else {
                  ToastAndroid.show("Kullanıcı Adı veya Şifre Yanlış", ToastAndroid.LONG)
                  this.setState({ sending: false })
               }
            }
         }
         this.setState({ userIsConnected: true, refresh: false })
      } else {
         this.setState({ userIsConnected: false, refresh: false })
      }
   }
   goToRegisterPage = () => {
      this.props.navigation.navigate('Register')
   }
   goBack = () => {
      this.props.navigation.goBack()
   }
   componentDidMount = async () => {
      await GoogleSignin.configure({
         webClientId: '232744567398-fclqsccnqab64tr6m727l69mpr7cmio8.apps.googleusercontent.com'
      });
      await GoogleSignin.signOut();
      if (this.props.alertInfo == undefined) null
      if (this.props.alertInfo === 'thanLogin') {
         //Alert.alert('Bilgilendirme', 'Profil sayfasına girmek için giriş yap.!', [{ text: 'tamam' }])
         ToastAndroid.show("Profil sayfasına girmek için giriş yap.!", ToastAndroid.LONG)
      } else if (this.props.alertInfo === 'thanKahveFali') {
         //Alert.alert('Bilgilendirme', 'Kahve falı göndermek için giriş yap.!', [{ text: 'tamam' }])
         ToastAndroid.show("Kahve falı için giriş yap.!", ToastAndroid.LONG)
      } else if (this.props.alertInfo === 'thanTarotFali') {
         //Alert.alert('Bilgilendirme', 'Kahve falı göndermek için giriş yap.!', [{ text: 'tamam' }])
         ToastAndroid.show("Tarot falı için giriş yap.!", ToastAndroid.LONG)
      } else {
         return null
      }
   }
   _signIn = async () => {
      try {
         await GoogleSignin.configure({
            webClientId: '232744567398-fclqsccnqab64tr6m727l69mpr7cmio8.apps.googleusercontent.com',
            offlineAccess: true,
         });

         await GoogleSignin.hasPlayServices();
         const userInfo = await GoogleSignin.signIn();
         await this.setState({ googleVerifyId: userInfo.idToken })
         const resultVerifyEmail = await Axios.default.post('https://fal-hub.herokuapp.com/api/checkEmail?forgoogle=true', { verifyCode: this.state.googleVerifyId, secretPass: 'AqWqRq34252234ASADafasd+^dfsdf', mail: userInfo.user.email })
         if (resultVerifyEmail.data.success) {
            // kayıt
            console.log(resultVerifyEmail.data)
            if (this.state.googleVerifyId === resultVerifyEmail.data.verifyCode) {
               const result = await Axios.default.post('https://fal-hub.herokuapp.com/api/register?method=google', { verifyCode: resultVerifyEmail.data.verifyCode, secretPass: 'AqWqRq34252234ASADafasd+^dfsdf', mail: userInfo.user.email, name: userInfo.user.name, password: 'googleSignUp', token: await AsyncStorage.getItem('token'), device: await DeviceInfo.getAndroidId() })

               if (result.data.success) {
                  this.setState({ googleVerifyId: null })
                  ToastAndroid.show("Kayıt Olma Başarılı", ToastAndroid.LONG)
                  await AsyncStorage.setItem('User', JSON.stringify(result.data.data))
                  await AsyncStorage.setItem('UserLoggedAt', 'google')
                  await AsyncStorage.setItem('coffeeCount', JSON.stringify(result.data.coffeeCount))
                  this.props.navigation.navigate('Tab')
               } else {
                  this.setState({ googleVerifyId: null })
                  ToastAndroid.show("Hata", ToastAndroid.LONG)
               }
            } else {
               this.setState({ googleVerifyId: null })
               ToastAndroid.show("Hata", ToastAndroid.LONG)
            }
         } else {
            //login
            const result = await Axios.default.post('https://fal-hub.herokuapp.com/api/login?method=google', { verifyCode: this.state.googleVerifyId,secretPass: 'AqWqRq34252234ASADafasd+^dfsdf', mail: userInfo.user.email, token: await AsyncStorage.getItem('token'), device: await DeviceInfo.getAndroidId() })

            if (this.state.googleVerifyId === resultVerifyEmail.data.verifyCode) {
               if (result.data.success == 'error') {
                  ToastAndroid.show("Hata.!", ToastAndroid.LONG)
               } else {
                  if (result.data.success) {
                     this.setState({ googleVerifyId: null })
                     ToastAndroid.show("Giriş Başarılı", ToastAndroid.LONG)
                     await AsyncStorage.setItem('User', JSON.stringify(result.data.data[0]))
                     await AsyncStorage.setItem('coffeeCount', JSON.stringify(result.data.coffeeCount))
                     await AsyncStorage.setItem('UserLoggedAt', 'google')
                     await AsyncStorage.setItem('coffeeCount', JSON.stringify(result.data.coffeeCount))

                     this.props.navigation.navigate('Tab')
                  } else {
                     this.setState({ googleVerifyId: null })
                     ToastAndroid.show("Hata.!", ToastAndroid.LONG)
                  }
               }
            } else {
               this.setState({ googleVerifyId: null })
               ToastAndroid.show("Hata.!", ToastAndroid.LONG)
            }
         }
      } catch (error) {
         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            ToastAndroid.show(error, ToastAndroid.LONG)
         } else if (error.code === statusCodes.IN_PROGRESS) {
            ToastAndroid.show(error, ToastAndroid.LONG)
         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            ToastAndroid.show(error, ToastAndroid.LONG)
         } else {
            ToastAndroid.show(error, ToastAndroid.LONG)
         }
      }

   }
   render() {
      return (
         (this.state.userIsConnected) ?
            <View style={styles.backgroundColorView}>
               <View style={styles.header}>
                  <TouchableOpacity style={styles.backButton} onPress={this.goBack}><Icon name='chevron-back-outline' size={30} color={'#ffa31a'} /></TouchableOpacity>
                  <Text style={styles.headerText}>Giriş Yap</Text>
               </View>
               <View style={styles.logoView}>
                  <Image style={styles.loginLogo} source={require('../../assets/logo/FH_LOGO.png')}></Image>
               </View>
               {/* Form */}
               <View style={styles.loginForm}>
                  <TextInput onChangeText={(text) => this.setState({ email: text })} placeholderTextColor={this.state.userNameIsEmpty ? 'red' : 'white'} style={styles.textInput} placeholder={this.state.userNameIsEmpty ? '* Bu Alan Boş Bırakılamaz' : 'Email yada Kullanıcı Adı'}></TextInput>
                  <View>
                     <TextInput onChangeText={(text) => this.setState({ password: text })} placeholderTextColor={this.state.userNameIsEmpty ? 'red' : 'white'} secureTextEntry={this.state.securityText} style={styles.textInput} placeholder={this.state.passwordIsEmpty ? '* Bu Alan Boş Bırakılamaz' : 'Şifre'}></TextInput>
                     <TouchableOpacity onPress={() => this.setState({ securityText: !this.state.securityText })} style={{ position: 'absolute', right: 8, marginTop: 17 }}><Icon name={this.state.securityText ? 'eye-off-outline' : 'eye-outline'} size={30} color={'white'} /></TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={this.login} style={styles.button}><Text style={styles.buttonText}>Giriş Yap</Text></TouchableOpacity>
               </View>
               {/* GOOGLE BELASI */}
               <GoogleSigninButton
                  style={{ width: 220, height: 55, alignSelf: 'center', marginTop: 25 }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Light}
                  onPress={this._signIn}
                  disabled={this.state.isSigninInProgress}
               />
               {/* footer */}
               <View style={styles.line}></View>
               <View style={styles.footer}>
                  {/* <View style={styles.line}></View> */}
                  <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                     <Text style={styles.footerText}>Hesabın Yok Mu?</Text>
                     <TouchableOpacity onPress={this.goToRegisterPage}><Text style={styles.resgisterFreeText}>Ücretsiz Kaydol !</Text></TouchableOpacity>
                  </View>
               </View>
            </View>
            :
            <ScrollView contentContainerStyle={styles.ScrollView} refreshControl={<RefreshControl onRefresh={this.onRefresh} refreshing={this.state.refresh}></RefreshControl>}>
               <View style={styles.netConnectedView}>
                  <Image style={styles.netConnectedGif} source={require('../../assets/internetNotConnected/notConnected.gif')}></Image>
                  <Text style={styles.netConnectedText}>İnternet Bağlantınız Bulunamadı...</Text>
                  <TouchableOpacity onPress={this.onRefresh} style={styles.refreshButton}><Icon name='refresh' size={40} color='white' /></TouchableOpacity>
               </View>
            </ScrollView>
      )
   }
}

export default LoginViewFnc = ({ route }) => {
   const navigation = useNavigation();
   const netInfo = useNetInfo();
   let alertInfo
   route.params ? alertInfo = route.params.alertInfo : alertInfo = null

   return (
      <LoginView netInfo={netInfo} navigation={navigation} alertInfo={alertInfo}></LoginView>
   )

}

const styles = StyleSheet.create({
   //line
   line: { borderWidth: 0.2, borderColor: '#ffa31a', width: '100%', position: 'absolute', bottom: 50 },

   //login Page
   backgroundColorView: { backgroundColor: 'black', width: '100%', height: '100%' },
   header: { alignItems: 'center', justifyContent: 'center', padding: 20, flexDirection: 'row' },
   backButton: { position: 'absolute', left: 15 },
   headerText: { color: '#ffa31a', fontSize: 20, fontWeight: '600' },
   logoView: { justifyContent: 'center', marginTop: 5 },
   loginLogo: { alignSelf: 'center' },
   loginForm: { alignItems: 'center', marginTop: 15 },
   textInput:
   {
      width: 300, height: 50, color: 'white', backgroundColor: 'black', fontWeight: '600', marginTop: 10, fontSize: 20, borderRadius: 5, paddingLeft: 20, borderColor: 'white', borderWidth: 1
   },
   button: { width: 220, height: 50, backgroundColor: '#ffa31a', justifyContent: 'center', marginTop: 15, borderRadius: 30 },
   buttonText: { alignSelf: 'center', color: 'white', fontSize: 20, fontWeight: '600' },
   footer: { justifyContent: 'center', position: 'absolute', bottom: 10, alignSelf: 'center' },
   footerText: { color: 'white', fontSize: 15, alignSelf: 'center' },
   resgisterFreeText: { color: '#ffa31a', fontSize: 20, marginLeft: 5 },

   //netConnected Styles
   ScrollView: { justifyContent: 'center', backgroundColor: 'black', width: '100%', height: '100%' },
   netConnectedView: { alignItems: 'center' },
   netConnectedGif: {
      width: 200, height: 200, borderRadius: 100,
      overlayColor: 'black'
   },
   netConnectedText: { fontSize: 20, marginTop: 15, color: 'white', marginTop: 50 },
   refreshButton: { marginTop: 60 }
})
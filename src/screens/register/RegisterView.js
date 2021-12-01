import * as React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/Ionicons';
import validator from 'validator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CodeInput from 'react-native-confirmation-code-input';

class RegisterView extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         verifyCodePage: false,
         nameSurname: null,
         nameSurnameNull: false,
         phoneNumber: null,
         phoneNumberNull: false,
         email: null,
         emailNull: false,
         pass: null,
         passNull: false,
         rePass: null,
         rePassNull: false
      }
   }
   /* 
    componentDidMount = async () => {
      const randomCode = await Math.floor(100000 + Math.random() * 900000)
      await AsyncStorage.setItem("verifyCode", String(randomCode))
      alert(parseInt(await AsyncStorage.getItem("verifyCode")))
   }
   componentWillUnmount = async () => {
      this.setState = (state, callback) => {
         return;
      };
   }
   */


   goBack = () => {
      this.props.navigation.goBack()
   }
   _Register = async () => {
      const email = await validator.isEmail(this.state.email)
      const phone = await validator.isMobilePhone(this.state.phoneNumber, "tr-TR")
      if (this.state.nameSurname == null || this.state.phoneNumber == null || this.state.email == null || this.state.pass == null || this.state.rePass == null) {
         Alert.alert('Hata', 'Bütün Alanları Eksiksiz Şekilde Doldur.!', [{ text: 'tamam' }])
      } else {
         if (this.state.pass.length <= 8) {
            Alert.alert('Hata', 'Şifreniz En Az 8 Karakter Uzunluğunda Olmalıdır.!', [{ text: 'tamam' }])
         } else {
            if (email) {
               if (phone) {
                  if (this.state.pass != this.state.rePass) {
                     Alert.alert('Hata', 'Şifreler Uyuşmuyor.!', [{ text: 'tamam' }])
                  } else {

                     // buraya smtp ve sms api gelecek verify code yollanacak / kayıt işlemi yapılacak
                     const randomCode = await Math.floor(100000 + Math.random() * 900000)
                     await AsyncStorage.setItem("verifyCode", String(randomCode))
                     console.log(randomCode)
                     this.setState({ verifyCodePage: true })
                  }
               } else {
                  Alert.alert('Hata', 'Başında (0) Olmadan Düzgün Bir Telefon Numarası Girin.!', [{ text: 'tamam' }])
               }
            } else {
               Alert.alert('Hata', 'Litfen Doğru Bir Email Adresi Giriniz.!', [{ text: 'tamam' }])
            }
         }
      }

   }
   _onFulfill = async (code) => {
      const verifyCode = await AsyncStorage.getItem('verifyCode')
      if (code == verifyCode) {
         const user = { "ad soyad": "can uzlas", "phone number": "36473547354", "email": "canuzlas@askfkasnf" }
         await AsyncStorage.setItem("User", JSON.stringify(user))
         await AsyncStorage.setItem("UserLoggedAt", "email/phone")
         this.props.navigation.navigate('Tab')
      } else {
         alert('Yanlış Şifre')
      }
   }
   render() {
      return (
         this.state.verifyCodePage ?
            <View style={styles.container}>
               <View style={styles.header}>
                  <Text style={styles.headerText}>Hesabını Onayla</Text>
               </View>
               <View style={styles.logoView}>
                  <Image style={styles.loginLogo} source={require('../../assets/logo/FH_LOGO.png')}></Image>
               </View>
               <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center', marginTop: 10 }}>Lütfen Emailinize veya telefonunuza gelen şifreyi giriniz.</Text>
               <CodeInput
                  containerStyle={{ alignSelf: 'center' }}
                  activeColor={'#ffa31a'}
                  className={'border-b'}
                  keyboardType="numeric"
                  space={6}
                  size={50}
                  codeLength={6}
                  inputPosition='left'
                  onFulfill={(code) => this._onFulfill(code)}
               />
            </View>
            :
            <View style={styles.container}>
               <View style={styles.header}>
                  <TouchableOpacity style={styles.backButton} onPress={this.goBack}><Icon name='chevron-back-outline' size={30} color={'#ffa31a'} /></TouchableOpacity>
                  <Text style={styles.headerText}>Ücretsiz Kaydol</Text>
               </View>
               <View style={styles.logoView}>
                  <Image style={styles.loginLogo} source={require('../../assets/logo/FH_LOGO.png')}></Image>
               </View>

               <View style={styles.registerFormView}>
                  <TextInput onChangeText={(text) => this.setState({ nameSurname: text })} placeholderTextColor={'black'} placeholder={'Ad Soyad*'} style={styles.formNameSurname}>
                  </TextInput>

                  <TextInput onChangeText={(text) => this.setState({ phoneNumber: text })} placeholderTextColor={'black'} placeholder={'Telefon Numaranız*'} style={styles.formPhoneNumber}>
                  </TextInput>

                  <TextInput onChangeText={(text) => this.setState({ email: text })} placeholderTextColor={'black'} placeholder={'Email*'} style={styles.formEmail}>
                  </TextInput>

                  <TextInput onChangeText={(text) => this.setState({ pass: text })} placeholderTextColor={'black'} secureTextEntry={true} placeholder={'Şifre*'} style={styles.formPass}>
                  </TextInput>
                  <TextInput onChangeText={(text) => this.setState({ rePass: text })} placeholderTextColor={'black'} secureTextEntry={true} placeholder={'Şifre Tekrar*'} style={styles.formRePass}>
                  </TextInput>

                  <TouchableOpacity onPress={this._Register} style={styles.button}><Text style={styles.buttonText}>Kaydol</Text></TouchableOpacity>


               </View>


            </View>
      )
   }

}


export default () => {
   const navigation = useNavigation()
   return (
      <RegisterView navigation={navigation}></RegisterView>
   )
}

const styles = StyleSheet.create({
   container: { backgroundColor: 'black', width: '100%', height: '100%' },
   header: { alignItems: 'center', justifyContent: 'center', padding: 20, flexDirection: 'row' },
   backButton: { position: 'absolute', left: 15 },
   headerText: { color: '#ffa31a', fontSize: 20, fontWeight: '600' },
   logoView: { justifyContent: 'center', marginTop: 5 },
   loginLogo: { alignSelf: 'center' },
   //registerform
   registerFormView: { justifyContent: 'center', marginTop: 15 },
   formNameSurname: { backgroundColor: 'white', width: 300, alignSelf: 'center' },
   formPhoneNumber: { backgroundColor: 'white', marginTop: 8, width: 300, alignSelf: 'center' },
   formEmail: { backgroundColor: 'white', marginTop: 8, marginTop: 8, width: 300, alignSelf: 'center' },
   formPass: { backgroundColor: 'white', marginTop: 8, marginTop: 8, width: 300, alignSelf: 'center' },
   formRePass: { backgroundColor: 'white', marginTop: 8, marginTop: 8, width: 300, alignSelf: 'center' },
   button: { width: 220, height: 50, backgroundColor: '#ffa31a', justifyContent: 'center', marginTop: 15, borderRadius: 30, alignSelf: 'center' },
   buttonText: { alignSelf: 'center', color: 'white', fontSize: 20, fontWeight: '600' },

})
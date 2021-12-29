import * as React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, ToastAndroid, ScrollView, Modal, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import * as Axios from 'axios'
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';
import validator from 'validator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NextIcon from 'react-native-vector-icons/MaterialIcons'
import EyeIcon from 'react-native-vector-icons/Feather'
import Sözlesme from '../../components/Sözlesme';

class RegisterView extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         firstStep: true,
         secondStep: false,
         thirdStep: false,
         checkForUserStep: false,
         showPass: false,
         sözlesmeModal: false,
         sending: false,
         name: null,
         mail: null,
         pass: null,
         focus: null,
      }
   }
   keyboardDidHide
   keyboardDidShow
   componentDidMount() {
      this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => this.setState({ focus: false }))
      this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => this.setState({ focus: true }))
   }
   componentWillUnmount() {
      this.keyboardDidHide.remove()
      this.keyboardDidShow.remove()
   }
   goBack = () => {
      this.props.navigation.goBack()
   }
   checkFristStep = () => {
      if (this.state.name == null) {
         ToastAndroid.show("İsim boş bırakılamaz", ToastAndroid.LONG)
      } else {
         if (this.state.name.length <= 2) {
            ToastAndroid.show("İsim en az 3 karakter olmalı", ToastAndroid.LONG)
         } else {
            this.setState({ secondStep: true, firstStep: false, focus: false })
         }
      }
   }
   checkSecondStep = async () => {
      if (this.state.mail == null) {
         ToastAndroid.show("Mail boş bırakılamaz", ToastAndroid.LONG)
      } else {
         if (!validator.isEmail(this.state.mail)) {
            ToastAndroid.show("Lütfen doğru bir mail adresi girin", ToastAndroid.LONG)
         } else {
            const result = await Axios.default.post('http://10.0.2.2:3000/api/checkEmail', { mail: this.state.mail })
            if (result.data.success) {
               this.setState({ secondStep: false, thirdStep: true, focus: false })
            } else {
               ToastAndroid.show("Bu mail adresi kullanımda", ToastAndroid.LONG)
            }
         }
      }
   }
   checkthirdStep = () => {
      if (this.state.pass == null) {
         ToastAndroid.show("Şifre boş bırakılamaz", ToastAndroid.LONG)
      } else {
         if (this.state.pass.length <= 7) {
            ToastAndroid.show("Şifre en az 8 karakter olmalı", ToastAndroid.LONG)
         } else {
            this.setState({ thirdStep: false, checkForUserStep: true })
         }
      }
   }
   closeModal = () => {
      this.setState({ sözlesmeModal: false })
   }
   signUp = async () => {
      this.setState({ sending: true })
      const result = await Axios.default.post('http://10.0.2.2:3000/api/register', { token: await AsyncStorage.getItem('token'), device: await DeviceInfo.getAndroidId(), name: this.state.name, mail: this.state.mail, password: this.state.pass })
      if (result.data.success) {
         ToastAndroid.show("Kayıt Olma Başarılı", ToastAndroid.LONG)
         await AsyncStorage.setItem('User', JSON.stringify(result.data.data))
         await AsyncStorage.setItem('UserLoggedAt', 'email/phone')
         await AsyncStorage.setItem('coffeeCount', JSON.stringify(result.data.coffeeCount))
         this.setState({ sending: false, firstStep: true, checkForUserStep: false })
         this.props.navigation.navigate('Tab')
      } else {
         ToastAndroid.show("Hata", ToastAndroid.LONG)
         this.setState({ sending: false })
      }
   }
   render() {
      return (

         this.state.sending ?
            <View style={styles.pageLoadingContainer}>
               <Image style={styles.pageLoadingImage} source={require('../../assets/loading/loading.gif')} />
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

               {this.state.firstStep ? <View style={styles.firstStepView}>
                  <Text style={styles.firstStepText}>FalHub'a hoşgeldin, kaydolmak için yapman gereken ilk adım ismini girmek. Lütfen bizi kandırma :(</Text>
                  <TextInput onFocus={() => this.setState({ focus: true })} onBlur={() => this.setState({ focus: false })} value={this.state.name} onChangeText={(text) => this.setState({ name: String(text) })} placeholder='Adınız' placeholderTextColor={'white'} style={this.state.focus ? styles.firstStepTextInputFocus : styles.firstStepTextInput}></TextInput>
                  <TouchableOpacity onPress={this.checkFristStep} style={styles.firstStepNextButton} ><NextIcon name={'navigate-next'} color={'white'} size={70} ></NextIcon></TouchableOpacity>
               </View> : null}

               {this.state.secondStep ? <View style={styles.secondStepView}>
                  <Text style={styles.secondStepText}>Şimdi sıra mail adresinde, haydi bize şu havalı mail adresini göster :)</Text>
                  <TouchableOpacity onPress={() => this.setState({ secondStep: false, firstStep: true })} style={styles.formBackText}><Text style={{ color: 'white' }}>Geri dön(isim)..</Text></TouchableOpacity>
                  <TextInput onFocus={() => this.setState({ focus: true })} onBlur={() => this.setState({ focus: false })} value={this.state.mail} onChangeText={(text) => this.setState({ mail: text })} placeholder='Mail' placeholderTextColor={'white'} style={this.state.focus ? styles.secondStepTextInputFocus : styles.secondStepTextInput}></TextInput>
                  <TouchableOpacity onPress={this.checkSecondStep} style={styles.secondStepNextButton} ><NextIcon name={'navigate-next'} color={'white'} size={70} ></NextIcon></TouchableOpacity>
               </View> : null}

               {this.state.thirdStep ? <View style={styles.thirdStepView}>
                  <Text style={styles.thirdStepText}>Şimdi en önemli kısıma geldik. Merak etme kafamı çevirdim. Bakmıyorum  :)</Text>
                  <TouchableOpacity onPress={() => this.setState({ thirdStep: false, secondStep: true })} style={styles.formBackText}><Text style={{ color: 'white' }}>Geri dön(mail)..</Text></TouchableOpacity>
                  <TextInput onFocus={() => this.setState({ focus: true })} onBlur={() => this.setState({ focus: false })} value={this.state.pass} onChangeText={(text) => this.setState({ pass: text })} placeholder='Şifreniz' secureTextEntry={true} placeholderTextColor={'white'} style={this.state.focus ? styles.thirdStepTextInputFocus : styles.thirdStepTextInput} ></TextInput>
                  <TouchableOpacity onPress={this.checkthirdStep} style={styles.thirdStepNextButton} ><NextIcon name={'navigate-next'} color={'white'} size={70} ></NextIcon></TouchableOpacity>
               </View> : null}


               {this.state.checkForUserStep ?


                  <View style={styles.checkForUserStepView}>
                     <Text style={{ color: 'white', fontSize: 15 }}>Aşağıda girmiş olduğunuz bilgiler yer almaktadır lütfen kontrol edin.!</Text>
                     <Text style={{ color: 'white', fontSize: 20, marginTop: 40 }}>Adınız : <Text style={{ color: '#ffa31a' }}>{this.state.name}</Text></Text>
                     <Text style={{ color: 'white', fontSize: 20, marginTop: 5 }}>Mail Adresiniz : <Text style={{ color: '#ffa31a' }}>{this.state.mail}</Text></Text>
                     <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{ color: 'white', fontSize: 20, }}>Şifreniz : {this.state.showPass ? <Text style={{ color: '#ffa31a' }}>{this.state.pass}</Text> : <Text style={{ color: '#ffa31a' }}>********</Text>}</Text>
                        <TouchableOpacity onPress={() => this.setState({ showPass: !this.state.showPass })} style={{ justifyContent: 'center', marginLeft: 10 }}>{this.state.showPass ? <EyeIcon name='eye' color={'white'} size={30}></EyeIcon> : <EyeIcon name='eye-off' color={'white'} size={20}></EyeIcon>}</TouchableOpacity>
                     </View>

                     <TouchableOpacity onPress={() => this.setState({ thirdStep: true, checkForUserStep: false })} style={styles.formBackText}><Text style={{ color: 'white' }}>Geri dön(sifre)..</Text></TouchableOpacity>

                     <TouchableOpacity onPress={() => this.signUp()} style={styles.formButton}><Text style={styles.formButtonText}>Kaydol</Text></TouchableOpacity>
                     <Text style={{ color: 'white', fontSize: 12, marginTop: 10 }}><TouchableOpacity onPress={() => this.setState({ sözlesmeModal: true })}><Text style={{ color: '#ffa31a', fontSize: 13 }}>***Üyelik Sözleşmesi***</Text></TouchableOpacity>'ni okudum, kabul ediyorum.</Text>

                     <Modal
                        animationType={"slide"}
                        transparent={true}
                        visible={this.state.sözlesmeModal}
                     >
                        <ScrollView style={{ width: '75%', height: '60%', alignSelf: 'center', top: '10%', backgroundColor: 'black' }}>
                           {this.props.Sözlesme(this.closeModal)}
                        </ScrollView>
                     </Modal>

                  </View>
                  : null}
            </View>
      )
   }
}
export default () => {
   const navigation = useNavigation()
   return (
      <RegisterView Sözlesme={Sözlesme} navigation={navigation}></RegisterView>
   )
}
const styles = StyleSheet.create({
   container: { backgroundColor: 'black', width: '100%', height: '100%' },
   header: { alignItems: 'center', justifyContent: 'center', padding: 20, flexDirection: 'row' },
   backButton: { position: 'absolute', left: 15 },
   headerText: { color: '#ffa31a', fontSize: 20, fontWeight: '600' },
   logoView: { justifyContent: 'center', marginTop: 5 },
   loginLogo: { alignSelf: 'center' },

   //firstStepView
   firstStepView: { width: '90%', alignSelf: 'center' },
   firstStepText: { color: 'white', fontSize: 18, marginTop: 10 },
   firstStepTextInput: { alignSelf: 'center', marginTop: 30, width: '60%', height: 55, color: 'white', backgroundColor: 'black', borderRadius: 8, borderColor: 'white', borderWidth: 1, paddingHorizontal: 20 },
   firstStepTextInputFocus: { alignSelf: 'center', marginTop: 30, width: '60%', height: 55, color: 'white', backgroundColor: 'black', borderRadius: 8, borderColor: '#ffa31a', borderWidth: 1, paddingHorizontal: 20 },
   firstStepNextButton: { justifyContent: 'center', alignSelf: 'center', marginTop: 20 },

   //SecondStepView
   secondStepView: { width: '90%', alignSelf: 'center' },
   secondStepText: { color: 'white', fontSize: 18, marginTop: 10 },
   secondStepTextInput: { alignSelf: 'center', marginTop: 10, width: '60%', height: 55, color: 'white', backgroundColor: 'black', borderRadius: 8, borderColor: 'white', borderWidth: 1, paddingHorizontal: 20 },
   secondStepTextInputFocus: { alignSelf: 'center', marginTop: 10, width: '60%', height: 55, color: 'white', backgroundColor: 'black', borderRadius: 8, borderColor: '#ffa31a', borderWidth: 1, paddingHorizontal: 20 },
   secondStepNextButton: { justifyContent: 'center', alignSelf: 'center', marginTop: 20 },
   formBackText: { alignSelf: 'center', marginTop: 20 },

   //thirdStepView
   thirdStepView: { width: '90%', alignSelf: 'center' },
   thirdStepText: { color: 'white', fontSize: 18, marginTop: 10 },
   thirdStepTextInput: { alignSelf: 'center', marginTop: 10, width: '60%', height: 55, color: 'white', backgroundColor: 'black', borderRadius: 8, borderColor: 'white', borderWidth: 1, paddingHorizontal: 20 },
   thirdStepTextInputFocus: { alignSelf: 'center', marginTop: 10, width: '60%', height: 55, color: 'white', backgroundColor: 'black', borderRadius: 8, borderColor: '#ffa31a', borderWidth: 1, paddingHorizontal: 20 },
   thirdStepNextButton: { justifyContent: 'center', alignSelf: 'center', marginTop: 20 },
   formBackText: { alignSelf: 'center', marginTop: 20 },

   //checkForUserStep
   checkForUserStepView: { width: '90%', alignSelf: 'center', marginTop: 50 },
   formButton: { width: '50%', height: 40, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#ffa31a', borderRadius: 5, marginTop: 50 },
   formButtonText: { alignSelf: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: 20 },

   //sending form 
   pageLoadingContainer: { width: '100%', height: '100%', justifyContent: 'center', backgroundColor: 'black' },
   pageLoadingImage: { width: 200, height: 200, alignSelf: 'center' },
   pageLoadingText: { color: 'white', fontSize: 20, fontWeight: '600', alignSelf: 'center' },

})
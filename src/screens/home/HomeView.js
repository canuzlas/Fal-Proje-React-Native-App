import * as React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, TextInput, Button, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

class HomeView extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
      }
   }
   checkLoginForKahveFali = async () => {
      try {
         const res = await AsyncStorage.getItem('loginSession')
         if (res == null) {
            this.props.navigation.navigate('Login', { alertInfo: 'thanKahveFali' })
         }
      } catch (error) {

      }
   }
   componentDidMount = async () => {
      PushNotification.configure({
         // (optional) Called when Token is generated (iOS and Android)
         onRegister: function (token) {
            console.log('TOKEN:', token)
         },
         // (required) Called when a remote or local notification is opened or received
         onNotification: async function (notification) {
            console.log('REMOTE NOTIFICATION ==>', notification)
            PushNotification.createChannel({
               channelId: "1", // (required)
               channelName: "Falhub", // (required)
            });
            try { 
               const res = await AsyncStorage.getItem('loginSession')
               if (res == null) { 
                  PushNotification.localNotification({
                     channelId: "1", 
                     //color: "red", // (optional) default: system default
                     vibrate: true, // (optional) default: true
                     title: notification.title,
                     message: notification.message
                  });
               }
            } catch (error) {
               console.log(error) 
            }

            // process the notification here
         },
         // Android only: GCM or FCM Sender ID
         senderID: '232744567398',
         popInitialNotification: true,
         requestPermissions: true
      })
      /*
      PushNotification.createChannel({
         channelId: "1", // (required)
         channelName: "Falhub", // (required)
      });
      try { 
         const res = await AsyncStorage.getItem('loginSession')
         if (res == null) { 
            PushNotification.localNotification({
               channelId: "1", 
               smallIcon: "ic_launcher",
               //color: "red", // (optional) default: system default
               vibrate: true, // (optional) default: true
               title: "Falhub'a Hoşgeldiniz",
               message: "Falhub'da eşsiz bir deneyim için lütfen kayıt olup, giriş yapınız."
            });
         }
      } catch (error) {
         console.log(error) 
      } */
   }

   render() {
      return (
         <View style={styles.container}>
            <View style={styles.content}>
               <ImageBackground source={require('../../assets/homeview/homeviewfalbg.png')} resizeMode='contain' style={styles.contentImageBg} imageStyle={{ opacity: 0.2 }}>
                  <Text style={styles.contentTitle}>Kahve Falına Baktır</Text>
                  <Text style={styles.contentTitleUnder}>Geleceğe dair ufakta olsa bilgiler öğrenmek istiyorsan, ücretsiz şekilde falına baktır.</Text>
                  <TouchableOpacity onPress={this.checkLoginForKahveFali} style={styles.contentButton}><Text style={styles.contentButtonText}>Falını gönder</Text></TouchableOpacity>
               </ImageBackground>
            </View>
            <View style={styles.content2}>
               <ImageBackground source={require('../../assets/homeview/burclar.png')} resizeMode='stretch' style={styles.content2ImageBg} imageStyle={{ opacity: 0.5 }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Astroloji')}><Text style={styles.content2Title}>Günlük Burç Yorumu İçin Tıkla</Text></TouchableOpacity>
               </ImageBackground>
            </View>
         </View>
      )
   }
}

export default HomeViewFnc = () => {
   const navigation = useNavigation();
   return (
      <SafeAreaView>
         <ScrollView style={styles.container}>
            <HomeView navigation={navigation} ></HomeView>
         </ScrollView>
      </SafeAreaView>
   )

}

const styles = StyleSheet.create({
   container: { backgroundColor: 'black', width: '100%', height: '100%' },
   content: { justifyContent: 'center', width: '100%', height: 200, marginTop: 30 },
   contentImageBg: { width: '100%', height: '100%' },
   contentTitle: { fontSize: 25, color: '#ffa31a', marginTop: 20, marginLeft: 20, fontWeight: '700' },
   contentTitleUnder: { fontSize: 17, color: 'white', marginTop: 20, marginLeft: 20, fontWeight: '700' },
   contentButton: { borderRadius: 2, width: '50%', padding: 10, backgroundColor: '#ffa31a', justifyContent: 'center', marginTop: 20, alignSelf: 'center' },
   contentButtonText: {color:'black', fontSize: 15, fontWeight: '700', textAlign: 'center' },
   content2: { justifyContent: 'center', width: '100%', height: 200, marginTop: 40 },
   content2ImageBg: { width: '100%', height: '100%', justifyContent: 'center' },
   content2Title: { fontSize: 25, color: 'white', alignSelf: 'center', marginTop: 20, marginLeft: 20, fontWeight: '700', }
})
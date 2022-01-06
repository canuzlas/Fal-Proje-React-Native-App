import * as React from 'react';
import { View, Image, StyleSheet, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import PushNotification from 'react-native-push-notification';
import { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default class AppStartScreen extends React.Component {
   constructor(props) {
      super(props)
   }
   componentDidMount = async () => {
      const result = await axios.default.post("https://falhub.com/api", { device: await DeviceInfo.getAndroidId() })
      await AsyncStorage.setItem('firebaseAdmin', JSON.stringify(result.data.admin))
      //console.log( await AsyncStorage.getItem('firebaseAdmin'))
      auth().signInWithEmailAndPassword(result.data.admin.mail, result.data.admin.pass)
         .then(async (user) => {
            await AsyncStorage.setItem('supportChatIsUsable', 'true')
            const reference = await firebase
               .app()
               .database('https://falhub-6c7a2-default-rtdb.europe-west1.firebasedatabase.app/')
            reference
               .ref('/notification')
               .on('value', async (snapshot) => {

                  if (JSON.parse(await AsyncStorage.getItem('notification')) == snapshot.val().body) {
                     return null
                  } else {
                     await AsyncStorage.setItem('notification', JSON.stringify(snapshot.val().body))
                     PushNotification.createChannel({
                        channelId: "1",
                        channelName: "Falhub",
                     });

                     PushNotification.localNotification({
                        channelId: "1",
                        vibrate: true,
                        largeIconUrl: 'https://falhub.com/notification.png',
                        title: snapshot.val().title,
                        message: snapshot.val().body
                     });
                  }
               })

         })
         .catch(async (err) => {
            await AsyncStorage.setItem('supportChatIsUsable', 'false')
            return ToastAndroid.show('Beklenmedik bir hata meydana geldi. Lütfen uygulamaya kapatıp tekrar açınız.!', ToastAndroid.LONG)
         })

      await AsyncStorage.setItem("token", String(result.data.token))
      await PushNotification.configure({
         onNotification: async function (notification) {
            PushNotification.createChannel({
               channelId: "1",
               channelName: "Falhub",
            });

            PushNotification.localNotification({
               channelId: "1",
               vibrate: true,
               smallIcon: "ic_notification",
               title: notification.title,
               message: notification.message
            });
         },
         senderID: '232744567398',
         popInitialNotification: true,
         requestPermissions: true
      })
      const User = await AsyncStorage.getItem('User')
      if (User === null) {
         setTimeout(() => { this.props.navigation.navigate('AppAraScreen') }, 1)
      } else {
         setTimeout(() => { this.props.navigation.navigate('Tab') }, 1)
      }
   }
   render() {
      return (
         <View style={styles.background}>
            <View style={styles.imageView}>
               <Image style={styles.image} source={require('../assets/logo/FH_LOGO.png')}></Image>
               {/* <View style={styles.textView}>
                     <Text style={styles.text}>Uzlaş Yazılım</Text>  
               </View> */}
            </View>
         </View>
      )
   }
}
const styles = StyleSheet.create({
   background: { justifyContent: 'center', backgroundColor: 'black', width: '100%', height: '100%' },
   imageView: { alignItems: 'center' }
   // textView:{alignItems:'center'},
   // text:{fontSize:15,color:'white'}
})
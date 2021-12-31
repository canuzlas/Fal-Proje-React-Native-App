import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Share, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackIcon from 'react-native-vector-icons/Ionicons';
import { version } from '../../../package.json'
import AdminIcon from 'react-native-vector-icons/MaterialIcons'
import SettingsIcon from 'react-native-vector-icons/AntDesign';
import WebIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatIcon from 'react-native-vector-icons/Entypo';


const styles = StyleSheet.create({
   profileEditContainer: { backgroundColor: 'black', width: '100%', height: '100%' },
   header: { alignItems: 'center', justifyContent: 'center', padding: 20, flexDirection: 'row' },
   backButton: { position: 'absolute', left: 15, top: 15 },
   headerTitle: { alignSelf: 'center', color: 'white', fontSize: 25, fontWeight: '700' },

   version: { justifyContent: 'center', padding: 10, position: 'absolute', alignSelf: 'center', bottom: 20 },
   appVersion: { color: 'white', alignSelf: 'center', fontSize: 20, fontWeight: '700' },

   //adminPage
   adminPage: { justifyContent: 'center', padding: 20, flexDirection: 'row', width: '100%', height: 70, backgroundColor: '#0f0f0f' },
   adminPageIcon: { position: 'absolute', left: 20, alignSelf: 'center' },
   adminPageText: { color: 'white', alignSelf: 'center', position: 'absolute', left: 70, fontSize: 18 },
   adminPageRightIcon: { alignSelf: 'center', position: 'absolute', right: 20 },

   //Web Sitemiz
   webPage: { justifyContent: 'center', padding: 20, flexDirection: 'row', width: '100%', height: 70, backgroundColor: '#0f0f0f' },
   webPageIcon: { position: 'absolute', left: 20, alignSelf: 'center' },
   webPageText: { color: 'white', alignSelf: 'center', position: 'absolute', left: 70, fontSize: 18 },
   webPageRightIcon: { alignSelf: 'center', position: 'absolute', right: 20 },
})
export default ({ navigation }) => {
   const [appversion, setVersion] = useState(null)
   const [userIsAdmin, setUserIsAdmin] = useState(false)
   const [userIsVerifyToMail, setUserIsVerifyToMail] = useState(false)

   useEffect(async () => {
      setVersion(version)
      const user = JSON.parse(await AsyncStorage.getItem('User'))
      if (user.mail === 'canuzlass@gmail.com') {
         setUserIsAdmin(true)
      }
      if (user.verify == true) {
         setUserIsVerifyToMail(false)
      } else {
         setUserIsVerifyToMail(true)
      }
      return () => {
         setVersion(null)
         setUserIsAdmin(false)
         setUserIsVerifyToMail(false)
      }
   }, [])

   const ShareToApp = async () => {
      try {
         await Share.share({
            title: 'Falhub - Ücretsiz Kahve Falı',
            message:
               'Falhub - Ücretsiz Kahve Falı \n\nUygulamayı indir, ücretsiz şekilde kahve falını yorumlat. Günlük, haftalık,aylık ve yıllık burç yorumlarını takip et :)\n\nhttps://falhub.com',
         });
      } catch (error) {
         ToastAndroid.show(String(error.message), ToastAndroid.LONG)
      }
   };

   return (
      <View style={styles.profileEditContainer}>
         <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}><BackIcon name='chevron-back-outline' size={35} color={'#ffa31a'} /></TouchableOpacity>
            <Text style={styles.headerTitle}>Ayarlar</Text>
         </View>
         <TouchableOpacity style={{ justifyContent: 'center', paddingHorizontal: 20, marginTop: 10 }} onPress={() => navigation.navigate('FalhubCom')}>
            <View style={styles.webPage}>
               <WebIcon style={styles.webPageIcon} name='web' color={'#ffa31a'} size={30} />
               <Text style={styles.webPageText}>Web Sitemiz</Text>
               <SettingsIcon style={styles.webPageRightIcon} name='arrowright' color={'white'} size={20} />
            </View>
         </TouchableOpacity>
         <TouchableOpacity style={{ justifyContent: 'center', paddingHorizontal: 20, marginTop: 10 }} onPress={() => ShareToApp()}>
            <View style={styles.webPage}>
               <SettingsIcon style={styles.webPageIcon} name='sharealt' color={'#ffa31a'} size={30} />
               <Text style={styles.webPageText}>Bizi Önerin</Text>
               <SettingsIcon style={styles.webPageRightIcon} name='arrowright' color={'white'} size={20} />
            </View>
         </TouchableOpacity>

         {userIsVerifyToMail ? <TouchableOpacity style={{ justifyContent: 'center', paddingHorizontal: 20, marginTop: 10 }} onPress={() => navigation.navigate('VerifyToMail')}>
            <View style={styles.adminPage}>
               <AdminIcon style={styles.adminPageIcon} name='verified' color={'#ffa31a'} size={30} />
               <Text style={styles.adminPageText}>Hesabını Onayla</Text>
               <SettingsIcon style={styles.adminPageRightIcon} name='arrowright' color={'white'} size={20} />
            </View>
         </TouchableOpacity>
            :
            null}

         {/* Admin */}
         {userIsAdmin ? <TouchableOpacity style={{ justifyContent: 'center', paddingHorizontal: 20, marginTop: 10 }} onPress={() => navigation.navigate('AdminPanelWeb')}>
            <View style={styles.adminPage}>
               <AdminIcon style={styles.adminPageIcon} name='admin-panel-settings' color={'#ffa31a'} size={30} />
               <Text style={styles.adminPageText}>Admin Panel Giriş</Text>
               <SettingsIcon style={styles.adminPageRightIcon} name='arrowright' color={'white'} size={20} />
            </View>
         </TouchableOpacity>
            :
            null}
         {/* Admin */}
         <TouchableOpacity style={{ justifyContent: 'center', paddingHorizontal: 20, marginTop: 10 }} onPress={() => navigation.navigate('LiveSupport')}>
            <View style={styles.webPage}>
               <ChatIcon style={styles.webPageIcon} name='chat' color={'#ffa31a'} size={30} />
               <Text style={styles.webPageText}>Canlı Destek</Text>
               <SettingsIcon style={styles.webPageRightIcon} name='arrowright' color={'white'} size={20} />
            </View>
         </TouchableOpacity>
         <View style={styles.version}>
            <Text style={styles.appVersion}>{appversion}</Text>
         </View>
      </View>
   )
}
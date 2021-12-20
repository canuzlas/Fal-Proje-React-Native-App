import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Modal, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackIcon from 'react-native-vector-icons/Ionicons';
import { version } from '../../../package.json'
import AdminIcon from 'react-native-vector-icons/MaterialIcons'
import SettingsIcon from 'react-native-vector-icons/AntDesign';
import WebIcon from 'react-native-vector-icons/MaterialCommunityIcons';


const styles = StyleSheet.create({
   profileEditContainer: { backgroundColor: 'black', width: '100%', height: '100%' },
   header: { alignItems: 'center', justifyContent: 'center', padding: 20, flexDirection: 'row' },
   backButton: { position: 'absolute', left: 15, top: 15 },
   headerTitle: { alignSelf: 'center', color: 'white', fontSize: 25, fontWeight: '700' },

   version: { justifyContent: 'center', padding: 10, position: 'absolute', alignSelf: 'center', bottom: 20 },
   appVersion: { color: 'white', alignSelf: 'center', fontSize: 20, fontWeight: '700' },

   //adminPage
   adminPage: { justifyContent: 'center', padding: 20, flexDirection: 'row', width: '100%', height: 70, backgroundColor: '#0f0f0f', marginTop: 10 },
   adminPageIcon: { position: 'absolute', left: 20, alignSelf: 'center' },
   adminPageText: { color: 'white', alignSelf: 'center', position: 'absolute', left: 70, fontSize: 18 },
   adminPageRightIcon: { alignSelf: 'center', position: 'absolute', right: 20 },

   //Web Sitemiz
   webPage: { justifyContent: 'center', padding: 20, flexDirection: 'row', width: '100%', height: 70, backgroundColor: '#0f0f0f', marginTop: 10 },
   webPageIcon: { position: 'absolute', left: 20, alignSelf: 'center' },
   webPageText: { color: 'white', alignSelf: 'center', position: 'absolute', left: 70, fontSize: 18 },
   webPageRightIcon: { alignSelf: 'center', position: 'absolute', right: 20 },
})

export default ({ navigation }) => {
   const [appversion, setVersion] = useState(null)
   const [userIsAdmin, setUserIsAdmin] = useState(false)

   useEffect(async () => {
      setVersion(version)
      const user = JSON.parse(await AsyncStorage.getItem('User'))
      if (user.mail === 'canuzlass@gmail.com') {
         setUserIsAdmin(true)
      }
   }, [])

   return (
      <View style={styles.profileEditContainer}>
         <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}><BackIcon name='chevron-back-outline' size={35} color={'#ffa31a'} /></TouchableOpacity>
            <Text style={styles.headerTitle}>Ayarlar</Text>
         </View>
         <TouchableOpacity style={{ justifyContent: 'center', padding: 20 }} onPress={() => navigation.navigate('FalhubCom')}>
            <View style={styles.webPage}>
               <WebIcon style={styles.webPageIcon} name='web' color={'#ffa31a'} size={30} />
               <Text style={styles.webPageText}>Web Sitemiz</Text>
               <SettingsIcon style={styles.webPageRightIcon} name='arrowright' color={'white'} size={20} />
            </View>
         </TouchableOpacity>
         {userIsAdmin ? <TouchableOpacity style={{ justifyContent: 'center', padding: 20, position: 'absolute', bottom: 50, width: '100%' }} onPress={() => navigation.navigate('AdminPanelWeb')}>
            <View style={styles.adminPage}>
               <AdminIcon style={styles.adminPageIcon} name='admin-panel-settings' color={'#ffa31a'} size={30} />
               <Text style={styles.adminPageText}>Admin Panel Giriş</Text>
               <SettingsIcon style={styles.adminPageRightIcon} name='arrowright' color={'white'} size={20} />
            </View>
         </TouchableOpacity>
            : 
            null}
         <View style={styles.version}>
            <Text style={styles.appVersion}>{appversion}</Text>
         </View>
      </View>
   )
}
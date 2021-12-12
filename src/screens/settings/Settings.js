import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Modal, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackIcon from 'react-native-vector-icons/Ionicons';
import { version } from '../../../package.json'



const styles = StyleSheet.create({
   profileEditContainer: { backgroundColor: 'black', width: '100%', height: '100%' },
   header: { alignItems: 'center', justifyContent: 'center', padding: 20, flexDirection: 'row' },
   backButton: { position: 'absolute', left: 15, top: 15 },
   headerTitle: { alignSelf: 'center', color: 'white', fontSize: 25, fontWeight: '700' },

   version: { justifyContent: 'center', padding: 10, position: 'absolute', alignSelf: 'center', bottom: 20 },
   appVersion: { color: 'white', alignSelf: 'center', fontSize: 20, fontWeight: '700' },

   logoutView: { position:'absolute',bottom:80, justifyContent: 'center', alignSelf: 'center' },
   logOutButton: { marginTop: 50, borderRadius: 5, backgroundColor: '#CD1818', padding: 10, width: 140 , alignSelf: 'center', justifyContent: 'center' },
   logOutButtonText: { fontSize: 18, alignSelf: 'center', color: 'white', fontWeight: '500' }
})

export default ({ navigation }) => {
   const [appversion, setVersion] = useState(null)

   useEffect(async () => {
      setVersion(version)
   }, [])

   const logOut = async() =>{
      const UserLoggedAt = await AsyncStorage.getItem('UserLoggedAt')
      if(UserLoggedAt === 'email/phone'){
         await AsyncStorage.setItem('User','')
         await AsyncStorage.setItem('UserLoggedAt','')
         navigation.navigate('AppAraScreen')
      }
   }
   return (
      <View style={styles.profileEditContainer}>
         <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}><BackIcon name='chevron-back-outline' size={35} color={'#ffa31a'} /></TouchableOpacity>
            <Text style={styles.headerTitle}>Ayarlar</Text>
         </View>
         <View style={styles.version}>
            <Text style={styles.appVersion}>{appversion}</Text>
         </View>
         <View style={styles.logoutView}>
            <TouchableOpacity style={styles.logOutButton} onPress={() => logOut()}><Text style={styles.logOutButtonText}>Çıkış Yap</Text></TouchableOpacity>
         </View>
      </View>
   )
}
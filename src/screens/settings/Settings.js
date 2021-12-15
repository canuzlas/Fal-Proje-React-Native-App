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
})

export default ({ navigation }) => {
   const [appversion, setVersion] = useState(null)

   useEffect(async () => {
      setVersion(version)
   }, [])

   return (
      <View style={styles.profileEditContainer}>
         <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}><BackIcon name='chevron-back-outline' size={35} color={'#ffa31a'} /></TouchableOpacity>
            <Text style={styles.headerTitle}>Ayarlar</Text>
         </View>
         <View style={styles.version}>
            <Text style={styles.appVersion}>{appversion}</Text>
         </View>
      </View>
   )
}
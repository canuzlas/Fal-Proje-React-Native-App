import React, { useState, useEffect } from 'react'
import { View, Text, ToastAndroid, StyleSheet, RefreshControl, ScrollView, Image, Modal, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Axios from 'axios'
import DeviceInfo from 'react-native-device-info'
import CloseIcon from 'react-native-vector-icons/AntDesign';
import NormalNotiIcon from 'react-native-vector-icons/Ionicons';
import WarningNotiIcon from 'react-native-vector-icons/AntDesign';



const styles = StyleSheet.create({
   //pageloading styles
   pageLoadingContainer: { width: '100%', height: '100%', justifyContent: 'center', backgroundColor: 'black' },
   pageLoadingImage: { width: 200, height: 200, alignSelf: 'center' },
   pageLoadingText: { color: 'white', fontSize: 20, fontWeight: '600', alignSelf: 'center' },

   container: { width: '100%', height: '100%', backgroundColor: 'black', padding: 20 },
   pageTitle: { color: 'white', alignSelf: 'center' },

   renderItemView: { alignSelf: 'center', borderLeftWidth: 2, borderLeftColor: '#ffa31a', padding: 20, width: 300, marginVertical: 5 },
   renderItemViewBorderRight: { alignSelf: 'center', padding: 20, width: 300, marginVertical: 5 },
   renderItemTıtle: { alignSelf: 'flex-start', color: 'white' },
   renderItemDate: { position: 'absolute', alignSelf: 'center', right: 15, color: 'white' },

   fallarınButton: { alignSelf: 'center', width: '45%', height: 50, backgroundColor: 'black', justifyContent: 'center' },
   fallarınButtonText: { color: 'white', alignSelf: 'center' },
   bildirimlerinButton: { alignSelf: 'center', width: '45%', height: 30, backgroundColor: 'black', justifyContent: 'center' },
   bildirimlerinButtonText: { color: 'white', alignSelf: 'center' },
   buttonActive: { alignSelf: 'center', width: '45%', height: 50, backgroundColor: 'black', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'white' },

   body: { padding: 20, justifyContent: 'center', alignSelf: 'center' },

   //modal
   ModalView: { backgroundColor: 'black', alignSelf: 'center', borderWidth: 1, borderColor: '#212121', width: '85%', height: 500, marginTop: 60 },
   closeIconStyle: { position: 'absolute', alignSelf: 'center', right: 15 },
   modalTitle: { position: 'absolute', alignSelf: 'center', color: 'white', fontSize: 20, fontWeight: '600', left: 15 },
   modalTime: { position: 'absolute', alignSelf: 'center', right: 15, top: 60, color: 'white', fontSize: 12, fontWeight: '600' },
   modalScrollView: { padding: 15, marginTop: 15 },
   modalScrollViewText: { color: 'white', fontWeight: '600', fontSize: 18, justifyContent: 'center', paddingBottom: 20 }
})

export default () => {
   const [buttonActive, setButtonActive] = useState(false)
   const [user, setUser] = useState({})
   const [refresh, setRefresh] = useState(false)
   const [fallar, setFal] = useState([])
   const [bildirimler, setBildirim] = useState([])
   const [viewPage, setViewPage] = useState(false)
   const [modal, setModal] = useState(false)
   const [willShowFal, setWillShowFal] = useState([])

   useEffect(async () => {
      setViewPage(false)
      const _user = JSON.parse(await AsyncStorage.getItem('User'))
      setUser(_user)
      if (_user !== null) {
         const fals = await Axios.default.post('http://10.0.2.2:3000/api/getAllFall', { token: await AsyncStorage.getItem('token'), device: await DeviceInfo.getAndroidId(), u_id: _user._id })
         if (fals.data.success) {
            setRefresh(false)
            setViewPage(true)
            setFal((oldArray) => [...oldArray, fals.data.data])
            setBildirim((oldArray) => [...oldArray, fals.data.notifications])
         } else {
            setRefresh(false)
            setViewPage(true)
            setFal((oldArray) => [...oldArray, []])
            setBildirim((oldArray) => [...oldArray, []])
            ToastAndroid.show("Bilgiler getirilemiyor", ToastAndroid.LONG)
         }
      } else {
         setViewPage(true)
      }
   }, [])
   const showModal = (fal) => {
      setModal(true)
      setWillShowFal(fal)
   }
   const renderItem = (item, i) => {
      return (
         <View key={i} style={styles.renderItemView}>
            {item.yorum === null ?
               <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.renderItemTıtle}>Falınız yorumlanıyor..</Text>
                  <Text style={styles.renderItemDate}>{new Date(item.createdAt).getDate() + '.' + parseInt(new Date(item.createdAt).getMonth() + 1) + '.' + new Date(item.createdAt).getFullYear()}</Text>
               </View>
               :
               <TouchableOpacity onPress={() => fallar[0].map((fal, index) => {
                  index === i ? showModal(fal) : null
               })}>
                  <View style={{ flexDirection: 'row' }}>
                     <Text style={styles.renderItemTıtle}>Falın hazır(tıkla).</Text>
                     <Text style={styles.renderItemDate}>{new Date(item.createdAt).getDate() + '.' + parseInt(new Date(item.createdAt).getMonth() + 1) + '.' + new Date(item.createdAt).getFullYear()}</Text>
                  </View>
               </TouchableOpacity>}
         </View>
      )
   }
   const refreshPage = async () => {
      setRefresh(true)
      setFal([])
      setBildirim([])
      const _user = JSON.parse(await AsyncStorage.getItem('User'))
      setUser(_user)
      if (_user !== null) {
         const fals = await Axios.default.post('http://10.0.2.2:3000/api/getAllFall', { token: await AsyncStorage.getItem('token'), device: await DeviceInfo.getAndroidId(), u_id: _user._id })
         if (fals.data.success) {
            setRefresh(false)
            setFal((oldArray) => [...oldArray, fals.data.data])
            setBildirim((oldArray) => [...oldArray, fals.data.notifications])
         } else {
            setRefresh(false)
            setFal((oldArray) => [...oldArray, []])
            setBildirim((oldArray) => [...oldArray, []])
            ToastAndroid.show("Bilgiler getirilemiyor", ToastAndroid.LONG)
         }
      } else {
         setRefresh(false)
      }
   }
   return (
      viewPage ?
         user !== null ?
            <View style={styles.container}>
               <Text style={styles.pageTitle}>Tüm fallarına aşağıdan erişebilirsin.</Text>
               <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
                  <View style={!buttonActive ? styles.buttonActive : styles.fallarınButton}>
                     <TouchableOpacity onPress={() => setButtonActive(false)}>
                        <Text style={styles.fallarınButtonText}>
                           Falların
                        </Text>
                     </TouchableOpacity>
                  </View>
                  <View style={buttonActive ? styles.buttonActive : styles.bildirimlerinButton}>
                     <TouchableOpacity onPress={() => setButtonActive(true)}>
                        <Text style={styles.bildirimlerinButtonText}>
                           Bildirimler
                        </Text>
                     </TouchableOpacity>
                  </View>
               </View>
               <View style={styles.body}>
                  <ScrollView style={{ marginBottom: 120 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => refreshPage()}></RefreshControl>}>
                     {
                        !buttonActive ?
                           fallar[0] !== undefined ?
                              fallar[0].length == 0 ?
                                 <Text style={{ color: 'white' }}>Mevcut falınız yok sayfayı yenileyin</Text>
                                 :
                                 fallar[0].map((item, i) => {
                                    return (
                                       renderItem(item, i)
                                    )
                                 })
                              :
                              <Text style={{ color: 'white' }}>Yenileniyor..</Text>
                           :
                           bildirimler[0] !== undefined ?
                              bildirimler[0].length == 0 ?
                                 <Text style={{ color: 'white' }}>Bildirim Mevcut Değil</Text>
                                 :
                                 bildirimler[0].map((item, i) => {
                                    return (
                                       <View key={i} style={styles.renderItemViewBorderRight}>
                                          <View style={{ flexDirection: 'row' }}>
                                             {item.notificationType === 'normal' ? <NormalNotiIcon style={{ marginRight: 5, alignSelf: 'center' }} name='notifications-outline' color={'white'} size={25}></NormalNotiIcon>
                                                : item.notificationType === 'warning' ?
                                                   <WarningNotiIcon style={{ marginRight: 5, alignSelf: 'center' }} name='warning' color={'yellow'} size={25}></WarningNotiIcon>
                                                   : <WarningNotiIcon style={{ marginRight: 5, alignSelf: 'center' }} name='warning' color={'red'} size={25}></WarningNotiIcon>}
                                             <Text style={styles.renderItemTıtle}>{item.notificationText}</Text>
                                          </View>
                                       </View>
                                    )
                                 })
                              :
                              <Text style={{ color: 'white' }}>Yenileniyor..</Text>
                     }
                  </ScrollView>
               </View>
               <Modal
                  transparent={true}
                  visible={modal}
                  animationType='slide'
               >
                  <View style={styles.ModalView}>
                     <View style={{ flexDirection: 'row', alignSelf: 'center', height: 70, width: '100%' }}>
                        <Text style={styles.modalTitle}>Kahve Falınız</Text>
                        <Text style={styles.modalTime}>{new Date(willShowFal.createdAt).getDate() + '.' + parseInt(new Date(willShowFal.createdAt).getMonth() + 1) + '.' + new Date(willShowFal.createdAt).getFullYear()}</Text>
                        <TouchableOpacity onPress={() => { setModal(false); setWillShowFal([]) }} style={styles.closeIconStyle}><CloseIcon name='close' size={25} color={'#ffa31a'}></CloseIcon></TouchableOpacity>
                     </View>
                     <ScrollView style={styles.modalScrollView}>
                        <Text style={styles.modalScrollViewText}>{willShowFal.yorum}</Text>
                     </ScrollView>
                  </View>
               </Modal>
            </View>
            :
            <ScrollView contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }} style={{ width: '100%', height: '100%', backgroundColor: 'black', padding: 20 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => refreshPage()}></RefreshControl>}>
               <View style={styles.pageLoadingContainer}>
                  <Text style={{ color: 'white', alignSelf: 'center', paddingBottom: 20, fontSize: 20 }}>Fallarını görebilmek için giriş yapmalısın. Giriş yaptıysan sayfayı yenilemeyi dene :)</Text>
                  <Image style={{ width: 300, height: 200, alignSelf: 'center' }} source={require('../../assets/wait/eyes.gif')} />
               </View>
            </ScrollView> 
         :
         <View style={styles.pageLoadingContainer}>
            <Image style={styles.pageLoadingImage} source={require('../../assets/loading/loading.gif')} />
         </View>
   )
} 
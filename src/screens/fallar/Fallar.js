import React, { useState, useEffect } from 'react'
import { View, Text, ToastAndroid, StyleSheet, FlatList, RefreshControl, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Axios from 'axios'
import DeviceInfo from 'react-native-device-info'

const styles = StyleSheet.create({
   container: { width: '100%', height: '100%', backgroundColor: 'black', padding: 20 },
   pageTitle: { color: 'white', alignSelf: 'center' },

   FlatList: { alignSelf: 'flex-start', padding: 10, marginHorizontal: 5, marginTop: 15, width: '100%' },
   renderItemView: { alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: 'white', padding: 20, width: '100%', marginVertical: 2 },
   renderItemTıtle: { alignSelf: 'flex-start', color: 'white' },
   renderItemDate: { position: 'absolute', alignSelf: 'center', right: 15, color: 'white' }
})

export default () => {
   const [user, setUser] = useState({})
   const [refresh, setRefresh] = useState(false)
   const [fallar, setFal] = useState([])

   useEffect(async () => {
      const _user = JSON.parse(await AsyncStorage.getItem('User'))
      setUser(_user)
      const fals = await Axios.default.post('http://10.0.2.2:3000/api/getAllFall', { token: await AsyncStorage.getItem('token'), device: await DeviceInfo.getAndroidId(), u_id: _user._id })
      if (fals.data.success) {
         setRefresh(false)
         setFal((oldArray) => [...oldArray, fals.data.data])
         console.log(fals.data.data)
      } else {
         ToastAndroid.show("Bilgiler getirilemiyor", ToastAndroid.LONG)
      }
   }, [refresh])

   const renderItem = ({ item }) => {
      return (
         <View style={styles.renderItemView}>
            {item.yorum === null ?
               <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.renderItemTıtle}>Falınız yorumlanıyor..</Text>
                  <Text style={styles.renderItemDate}>{new Date(item.createdAt).getDate() + '.' + parseInt(new Date(item.createdAt).getMonth() + 1) + '.' + new Date(item.createdAt).getFullYear()}</Text>
               </View>
               :
               <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.renderItemTıtle}>Falın hazır(tıkla).</Text>
                  <Text style={styles.renderItemDate}>{new Date(item.createdAt).getDate() + '.' + parseInt(new Date(item.createdAt).getMonth() + 1) + '.' + new Date(item.createdAt).getFullYear()}</Text>
               </View>}
         </View>
      )
   }

   return (
      <View style={styles.container}>
         <Text style={styles.pageTitle}>Tüm fallarına aşağıdan erişebilirsin.</Text>
         <FlatList
            refreshControl={<RefreshControl onRefresh={() => setRefresh(true)} refreshing={refresh}></RefreshControl>}
            extraData={fallar[0]}
            style={styles.FlatList}
            data={fallar[0]}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
         >
         </FlatList>
      </View>
   )
} 
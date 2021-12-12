import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Modal, ToastAndroid, PermissionsAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import * as ImagePicker from 'react-native-image-picker';
import * as Axios from 'axios';
import BackIcon from 'react-native-vector-icons/Ionicons';
import PencilIcon from 'react-native-vector-icons/FontAwesome5';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import UserIcon from 'react-native-vector-icons/EvilIcons';



const styles = StyleSheet.create({
   profileEditContainer: { backgroundColor: 'black', width: '100%', height: '100%' },
   header: { alignItems: 'center', justifyContent: 'center', padding: 20, flexDirection: 'row' },
   backButton: { position: 'absolute', left: 15, top: 15 },
   headerTitle: { alignSelf: 'center', color: 'white', fontSize: 25, fontWeight: '700' },

   body: { justifyContent: 'center', marginTop: 20, padding: 20 },

   profilePhoto: { width: 100, height: 100, alignSelf: 'center', width: 150, height: 150, borderRadius: 100 },
   profilePhotoEdit: { alignSelf: 'center' },

   form: { marginTop: 70 },
   nameLabel: { color: 'white', fontWeight: '700', fontSize: 25, alignSelf: 'flex-start', width: '30%', marginTop: 5 },
   nameInput: { paddingHorizontal: 10, color: 'white', maxWidth: '60%', fontSize: 20, alignSelf: 'flex-start', borderWidth: 1, borderColor: 'white', borderRadius: 10 },
   mailLabel: { color: 'white', fontWeight: '700', fontSize: 25, alignSelf: 'flex-start', width: '30%', marginTop: 5 },
   mailInput: { paddingHorizontal: 5, color: 'white', fontSize: 20, maxWidth: '60%', alignSelf: 'flex-start', borderWidth: 1, borderColor: 'white', borderRadius: 10 },
   nameEdit: { alignSelf: 'center', marginLeft: 10 },
   mailEdit: { alignSelf: 'center', marginLeft: 10 },
})

export default ({ navigation }) => {
   const [user, setUser] = useState({})
   const [newName, setNewName] = useState(null)
   const [newMail, setNewMail] = useState(null)
   const [userPhoto, setUserPhoto] = useState(false)
   const [nameModal, setNameModal] = useState(false)
   const [mailModal, setMailModal] = useState(false)

   useEffect(async () => {
      const User = JSON.parse(await AsyncStorage.getItem('User'))
      User.photo ? setUserPhoto(true) : setUserPhoto(false)
      setUser(User)
   }, [])

   const updateProfile = async (route) => {
      switch (route) {
         case 'name':
            if (newName !== null) {
               const result = await Axios.default.post('http://10.0.2.2:3000/api/updateProfile?place=name', { name: newName, u_id: user._id, token: await AsyncStorage.getItem('token'), device: await DeviceInfo.getAndroidId() })
               if (result.data.success == true) {
                  await AsyncStorage.setItem('User', JSON.stringify(result.data.data))
                  setUser(result.data.data)
                  setNameModal(false)
                  ToastAndroid.show("Güncelleme Başarılı :)", ToastAndroid.LONG)
               } else {
                  ToastAndroid.show("Hata.!", ToastAndroid.LONG)
               }
            } else {
               return null
            }
            break;
         case 'mail':
            if (newMail !== null) {
               const resultMail = await Axios.default.post('http://10.0.2.2:3000/api/updateProfile?place=mail', { mail: newMail, u_id: user._id, token: await AsyncStorage.getItem('token'), device: await DeviceInfo.getAndroidId() })
               if (resultMail.data.success == true) {
                  await AsyncStorage.setItem('User', JSON.stringify(resultMail.data.data))
                  setUser(resultMail.data.data)
                  setMailModal(false)
                  ToastAndroid.show("Güncelleme Başarılı :)", ToastAndroid.LONG)
               } else {
                  ToastAndroid.show("Hata.!", ToastAndroid.LONG)
               }
            } else {
               return null
            }
            break;
      }
   }
   const editProfilePhoto = async () => {
      try {
         const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
         );
         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const result = await ImagePicker.launchImageLibrary();
            if (result.didCancel) {
               ToastAndroid.show("Fotoğraf seçilmedi", ToastAndroid.SHORT)
            } else {
               const verify = await Axios.default.post('http://10.0.2.2:3000/api/updatePhoto?verify=true', { token: await AsyncStorage.getItem('token'), device: await DeviceInfo.getAndroidId(), u_id: user._id })
               if (verify.data.success) {
                  const data = new FormData()
                  data.append('file', {
                     uri: result.assets[0].uri,
                     type: result.assets[0].type,
                     name: result.assets[0].fileName,
                  });
                  const photoResult = await Axios.default.post('http://10.0.2.2:3000/api/updatePhoto?savePhoto=true', data, {
                     headers: {
                        'accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                     }
                  })
                  if (photoResult.data.success) {
                     await AsyncStorage.setItem('User', JSON.stringify(photoResult.data.data))
                     setUser(photoResult.data.data)
                     ToastAndroid.show("Immm güzel resim :)", ToastAndroid.LONG)
                  } else {
                     ToastAndroid.show("Hata.!", ToastAndroid.LONG)
                  }
               } else {
                  ToastAndroid.show("Hata.!", ToastAndroid.LONG)
               }
            }
         } else {
            ToastAndroid.show("Galeriye İzin Verilmedi", ToastAndroid.LONG)
         }
      } catch (error) {
         ToastAndroid.show("Galeride Hata.!", ToastAndroid.LONG)
      }
   }

   return (
      <View style={styles.profileEditContainer}>
         <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}><BackIcon name='chevron-back-outline' size={35} color={'#ffa31a'} /></TouchableOpacity>
            <Text style={styles.headerTitle}>{user.name}</Text>
         </View>
         <View style={styles.body}>

            <Image resizeMode='stretch' style={styles.profilePhoto} source={user.photo != 'false' ? { uri: 'http://10.0.2.2:3000/' + user.photo } : require('../../assets/arascreengif/gif.gif')}></Image>

            <TouchableOpacity onPress={() => editProfilePhoto()} style={styles.profilePhotoEdit}><PencilIcon name='pencil-alt' size={35} color={'#ffa31a'} /></TouchableOpacity>
            <View style={styles.form}>
               <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.nameLabel}>Adınız :</Text>
                  <TextInput editable={false} style={styles.nameInput} value={user.name}></TextInput>
                  <TouchableOpacity onPress={() => setNameModal(true)} style={styles.nameEdit}><PencilIcon name='pencil-alt' size={20} color={'white'} /></TouchableOpacity>
               </View>
               <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Text style={styles.mailLabel}>Mail :</Text>
                  <TextInput editable={false} style={styles.mailInput} value={user.mail}></TextInput>
                  <TouchableOpacity onPress={() => setMailModal(true)} style={styles.mailEdit}><PencilIcon name='pencil-alt' size={20} color={'white'} /></TouchableOpacity>
               </View>
            </View>
         </View>

         {/* name MODAL */}
         <Modal
            animationType={"slide"}
            transparent={true}
            visible={nameModal}
         >

            <View style={{ width: '80%', paddingVertical: 20, backgroundColor: '#0f0f0f', alignSelf: 'center', marginTop: '40%' }}>

               <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ alignSelf: 'center', fontSize: 20, color: '#ffa31a' }}>Adını Değiştir</Text>
                  <TouchableOpacity onPress={() => setNameModal(false)} style={{ position: 'absolute', alignSelf: 'center', right: 15 }}><CloseIcon name='close' size={25} color={'#ffa31a'}></CloseIcon></TouchableOpacity>
               </View>

               <View style={{ flexDirection: 'row', marginTop: 10, padding: 20 }}>
                  <Text style={{ color: 'white', fontWeight: '700', fontSize: 25, alignSelf: 'flex-start', marginTop: 5 }}>Adınız :</Text>
                  <TextInput onChangeText={(text) => setNewName(text)} style={{ marginLeft: 9, paddingHorizontal: 10, color: 'white', maxWidth: '60%', fontSize: 20, alignSelf: 'flex-start', borderWidth: 1, borderColor: 'white', borderRadius: 10 }} value={newName != null ? newName : user.name}></TextInput>
               </View>

               <View style={{ marginTop: 10, padding: 10 }}>
                  <TouchableOpacity style={{ borderRadius: 5, backgroundColor: '#ffa31a', padding: 10, width: '80%', alignSelf: 'center', justifyContent: 'center' }} onPress={() => updateProfile('name')}><Text style={{ fontSize: 18, alignSelf: 'center', color: 'white', fontWeight: '500' }}>Güncelle</Text></TouchableOpacity>
               </View>

            </View>

         </Modal>
         {/* name MODAL */}

         {/* mail MODAL */}
         <Modal
            animationType={"slide"}
            transparent={true}
            visible={mailModal}
         >

            <View style={{ width: '80%', paddingVertical: 20, backgroundColor: '#0f0f0f', alignSelf: 'center', marginTop: '40%' }}>

               <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ alignSelf: 'center', fontSize: 20, color: '#ffa31a' }}>Mailini Değiştir</Text>
                  <TouchableOpacity onPress={() => setMailModal(false)} style={{ position: 'absolute', alignSelf: 'center', right: 15 }}><CloseIcon name='close' size={25} color={'#ffa31a'}></CloseIcon></TouchableOpacity>
               </View>

               <View style={{ flexDirection: 'row', marginTop: 10, padding: 20 }}>
                  <Text style={{ color: 'white', fontWeight: '700', fontSize: 25, alignSelf: 'flex-start', marginTop: 5 }}>Mail :</Text>
                  <TextInput onChangeText={(text) => setNewMail(text)} style={{ paddingHorizontal: 5, color: 'white', fontSize: 20, maxWidth: '90%', alignSelf: 'flex-start', borderWidth: 1, borderColor: 'white', borderRadius: 10, marginLeft: 5 }} value={newMail != null ? newMail : user.mail}></TextInput>
               </View>

               <View style={{ marginTop: 10, padding: 10 }}>
                  <TouchableOpacity style={{ borderRadius: 5, backgroundColor: '#ffa31a', padding: 10, width: '80%', alignSelf: 'center', justifyContent: 'center' }} onPress={() => updateProfile('mail')}><Text style={{ fontSize: 18, alignSelf: 'center', color: 'white', fontWeight: '500' }}>Güncelle</Text></TouchableOpacity>
               </View>

            </View>

         </Modal>
         {/* mail MODAL */}
      </View>
   )
}
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View, ToastAndroid, PermissionsAndroid, Modal, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'
import DatePicker from 'react-native-date-picker'
import Icon from 'react-native-vector-icons/Ionicons';
import Photo from 'react-native-vector-icons/MaterialIcons';
import FolderIcon from 'react-native-vector-icons/Entypo'
import CameraIcon from 'react-native-vector-icons/FontAwesome5'
import DeleteIcon from 'react-native-vector-icons/AntDesign'
import trDate from 'tr-date'


const styles = StyleSheet.create({
   container: { backgroundColor: 'black', width: '100%', height: '100%' },
   // header
   header: { alignItems: 'center', justifyContent: 'center', padding: 20, flexDirection: 'row' },
   backButton: { position: 'absolute', left: 15 },
   headerText: { color: '#ffa31a', fontSize: 20, fontWeight: '600' },
   // coffee images
   coffeeFalImagesTitle: { color: 'white', fontSize: 20, alignSelf: 'flex-start', marginLeft: 20, marginTop: 10, fontWeight: '700' },
   coffeeFalImagesSubTitle: { color: '#FF7800', fontSize: 15, alignSelf: 'flex-start', marginLeft: 20, marginTop: 10, fontWeight: '700' },
   coffeeFalImagesView: { marginTop: 10, flexDirection: 'row', width: '90%', height: 120, backgroundColor: 'black', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between' },
   coffeeFalImageFirst: { width: '30%', height: '90%', backgroundColor: '#212121', justifyContent: 'center', borderRadius: 10 },
   coffeeFalImageSecond: { width: '30%', height: '90%', backgroundColor: '#212121', justifyContent: 'center', borderRadius: 10 },
   coffeeFalImageThird: { width: '30%', height: '90%', backgroundColor: '#212121', justifyContent: 'center', borderRadius: 10 },
   coffeeFalImageIcon: { alignSelf: 'center' },
   photos: { width: '100%', height: '100%', borderRadius: 10 },
   //form
   coffeeFormView: { justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: 20 },
   burclarView: { backgroundColor: 'black', borderColor: 'white', borderWidth: 1, justifyContent: 'center' },
   formButton: { width: '50%', height: 40, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#ffa31a', borderRadius: 5, marginTop: 50 },
   formButtonText: { alignSelf: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: 20 },

   //sending form 
   pageLoadingContainer: { width: '100%', height: '100%', justifyContent: 'center', backgroundColor: 'black' },
   pageLoadingImage: { width: 150, height: 150, alignSelf: 'center' },
   pageLoadingText: { color: 'white', fontSize: 20, fontWeight: '600', alignSelf: 'center' },


})

export default ({ navigation }) => {
   const [modal, setModal] = useState(false)
   const [photos, setPhoto] = useState([])
   const [formVisible, setFormVisible] = useState(false)
   const [burcValue, setBurcValue] = useState(null)
   const [cinsiyetValue, setCinsiyetValue] = useState(null)
   const datetr = new trDate()
   const [date, setDate] = useState(new Date())
   const [open, setOpen] = useState(false)
   const [sendingFal, setSendingFal] = useState(false)


   useEffect(() => {
      ToastAndroid.show("Galerinden seç veya fotoğraf çek.!", ToastAndroid.LONG)
      return () => {
         console.log('willunmout')
      }
   }, [])

   const savePhoto = async (route) => {
      switch (route) {
         case "galery":
            try {
               const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
               );
               if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  const result = await ImagePicker.launchImageLibrary();
                  if (result.didCancel) {
                     ToastAndroid.show("Fotoğraf seçilmedi", ToastAndroid.SHORT)
                     setModal(false)
                  } else {
                     setModal(false)
                     setPhoto(oldArray => [...oldArray, String(result.assets[0].uri)])
                     setFormVisible(true)
                  }
               } else {
                  setModal(false)
                  ToastAndroid.show("Galeriye İzin Verilmedi", ToastAndroid.LONG)
               }
            } catch (error) {
               setModal(false)
               ToastAndroid.show("Galeride Hata.!", ToastAndroid.LONG)
            }
            break;
         case "camera":
            try {
               const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.CAMERA,
               );
               if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  const result = await ImagePicker.launchCamera();
                  if (result.didCancel) {
                     ToastAndroid.show("Kamera Kapatıldı", ToastAndroid.SHORT)
                     setModal(false)
                  } else {
                     setModal(false)
                     setPhoto(oldArray => [...oldArray, String(result.assets[0].uri)])
                     setFormVisible(true)
                  }
               } else {
                  setModal(false)
                  ToastAndroid.show("Kameraya İzin Verilmedi", ToastAndroid.LONG)
               }
            } catch (err) {
               setModal(false)
               ToastAndroid.show("Kamerada Hata.!", ToastAndroid.SHORT)
            }
            break;
      }
   }

   const checkModalIsUsable = () => {
      if (photos.length >= 3) {
         return ToastAndroid.show("Zaten Fotoğraf Seçtin", ToastAndroid.LONG)
      } else {
         return setModal(true)
      }
   }

   const deletePhotoFromPhotos = (index) => {
      photos.splice(index, 1)
      setPhoto(old => [...old])
      photos.length == 0 ? setFormVisible(false) : null
   }

   const sendFal = () => {
      setSendingFal(true)
      setTimeout(() => {
         setSendingFal(false)
      }, 2000)
   }
   return (
      sendingFal ?
         <View style={styles.pageLoadingContainer}>
            <Image style={styles.pageLoadingImage} source={require('../../assets/loading/loading.gif')} />
            <Text style={styles.pageLoadingText}>Falınız gönderiliyor..</Text>
         </View>
         :
         <View style={styles.container}>
            <View style={styles.header}>
               <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}><Icon name='chevron-back-outline' size={30} color={'#ffa31a'} /></TouchableOpacity>
               <Text style={styles.headerText}>Ücretsiz Kahve Falı</Text>
            </View>
            <Text style={styles.coffeeFalImagesTitle}>Fincan fotoğraflarını yükle</Text>
            <View style={styles.coffeeFalImagesView}>
               <TouchableOpacity onPress={() => checkModalIsUsable()} style={styles.coffeeFalImageFirst}>
                  {photos[0] ? <View><Image resizeMode={'stretch'} resizeMethod={'auto'} source={{ uri: photos[0] }} style={styles.photos} /><TouchableOpacity style={{ position: 'absolute', top: 5, right: 5 }} onPress={() => deletePhotoFromPhotos(0)}><DeleteIcon name={'delete'} color={'red'} size={30} /></TouchableOpacity></View> : <Photo style={styles.coffeeFalImageIcon} name={'add-a-photo'} color={'white'} size={60} />}
               </TouchableOpacity>
               <TouchableOpacity onPress={() => checkModalIsUsable()} style={styles.coffeeFalImageSecond}>
                  {photos[1] ? <View><Image resizeMode={'stretch'} resizeMethod={'auto'} source={{ uri: photos[1] }} style={styles.photos} /><TouchableOpacity style={{ position: 'absolute', top: 5, right: 5 }} onPress={() => deletePhotoFromPhotos(1)}><DeleteIcon name={'delete'} color={'red'} size={30} /></TouchableOpacity></View> : <Photo style={styles.coffeeFalImageIcon} name={'add-a-photo'} color={'white'} size={60} />}
               </TouchableOpacity>
               <TouchableOpacity onPress={() => checkModalIsUsable()} style={styles.coffeeFalImageThird}>
                  {photos[2] ? <View><Image resizeMode={'stretch'} resizeMethod={'auto'} source={{ uri: photos[2] }} style={styles.photos} /><TouchableOpacity style={{ position: 'absolute', top: 5, right: 5 }} onPress={() => deletePhotoFromPhotos(2)}><DeleteIcon name={'delete'} color={'red'} size={30} /></TouchableOpacity></View> : <Photo style={styles.coffeeFalImageIcon} name={'add-a-photo'} color={'white'} size={60} />}
               </TouchableOpacity>
            </View>
            <Text style={styles.coffeeFalImagesSubTitle}>*Yorumlamamız için fincan fotoğraflarını yüklemelisin.</Text>

            {formVisible ? <View style={styles.coffeeFormView}>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'white', fontSize: 20 }}>Burcunuzu seçin:</Text>
                  <View style={styles.burclarView}>
                     <Picker
                        dropdownIconColor={'white'}
                        selectedValue={burcValue}
                        style={{ height: 50, width: 150, color: 'white' }}
                        onValueChange={(itemValue, itemIndex) => setBurcValue(itemValue)}
                     >
                        <Picker.Item label="Koç" value="Koç" />
                        <Picker.Item label="Boğa" value="Boğa" />
                        <Picker.Item label="İkizler" value="İkizler" />
                        <Picker.Item label="Yengeç" value="Yengeç" />
                        <Picker.Item label="Aslan" value="Aslan" />
                        <Picker.Item label="Başak" value="Başak" />
                        <Picker.Item label="Terazi" value="Terazi" />
                        <Picker.Item label="Akrep" value="Akrep" />
                        <Picker.Item label="Yay" value="Yay" />
                        <Picker.Item label="Oğlak" value="Oğlak" />
                        <Picker.Item label="Kova" value="Kova" />
                        <Picker.Item label="Balık" value="Balık" />
                     </Picker>
                  </View>
               </View>
               <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                  <Text style={{ color: 'white', fontSize: 20 }}>Cinsiyet:</Text>
                  <View style={styles.burclarView}>
                     <Picker
                        dropdownIconColor={'white'}
                        selectedValue={cinsiyetValue}
                        style={{ height: 50, width: 150, color: 'white' }}
                        onValueChange={(itemValue, itemIndex) => setCinsiyetValue(itemValue)}
                     >
                        <Picker.Item label="Erkek" value="Erkek" />
                        <Picker.Item label="Kadın" value="Kadın" />
                        <Picker.Item label="Diğer" value="Diğer" />
                     </Picker>
                  </View>
               </View>
               <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                  <Text style={{ color: 'white', fontSize: 20 }}>Doğum Tarihiniz:</Text>
                  <View style={styles.burclarView}>
                     <TouchableOpacity onPress={() => setOpen(true)} style={{ borderColor: 'white', borderWidth: 1, height: 40, width: 150, justifyContent: 'center', paddingHorizontal: 4 }}><Text style={{ color: 'white', alignSelf: 'center' }}>{String(date.getDate() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear())}</Text></TouchableOpacity>
                     <DatePicker
                        title='Doğum tarihinizi seçin'
                        confirmText='onayla'
                        cancelText='iptal'
                        mode='date'
                        textColor='black'
                        locale='tr-TR'
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                           setOpen(false)
                           setDate(date)
                        }}
                        onCancel={() => {
                           setOpen(false)
                        }}
                     />
                  </View>
               </View>
               <TouchableOpacity onPress={() => sendFal()} style={styles.formButton}><Text style={styles.formButtonText}>Gönder</Text></TouchableOpacity>
            </View> : null}

            {/* MODAL */}
            <Modal
               animationType={"slide"}
               transparent={true}
               visible={modal}
            >
               <View style={{ borderRadius: 15, flexDirection: 'row', width: '70%', height: '25%', backgroundColor: '#212121', alignSelf: 'center', bottom: '30%', position: 'absolute', justifyContent: 'center' }}>
                  <TouchableOpacity onPress={() => setModal(false)} style={{ position: 'absolute', right: 10, top: 0 }}><Text style={{ color: 'white', fontWeight: '600', fontSize: 35 }}>x</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => savePhoto("galery")} style={{ width: '40%', bottom: 0, height: '90%', justifyContent: 'center' }}>
                     <FolderIcon style={{ alignSelf: 'center' }} name={'folder-images'} size={70} color={'white'} />
                     <Text style={{ color: 'white', alignSelf: 'center' }}>Galeri</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => savePhoto("camera")} style={{ width: '40%', bottom: 0, height: '90%', justifyContent: 'center' }}>
                     <CameraIcon style={{ alignSelf: 'center' }} name={'camera-retro'} size={70} color={'white'} />
                     <Text style={{ color: 'white', alignSelf: 'center' }}>Kamera</Text>
                  </TouchableOpacity>
                  {/* <Text style={{ position: 'absolute', alignSelf: 'center', bottom: 5, color: 'white' }}>Galerinden seç veya fotoğraf çek.!</Text> */}
               </View>
            </Modal>
            {/* MODAL */}

         </View>
   )
}


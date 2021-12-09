import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View, ToastAndroid, PermissionsAndroid, Modal, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Photo from 'react-native-vector-icons/MaterialIcons';
import FolderIcon from 'react-native-vector-icons/Entypo'
import CameraIcon from 'react-native-vector-icons/FontAwesome5'
import DeleteIcon from 'react-native-vector-icons/AntDesign'


const styles = StyleSheet.create({
   container: { backgroundColor: 'black', width: '100%', height: '100%' },
   // header
   header: { alignItems: 'center', justifyContent: 'center', padding: 20, flexDirection: 'row' },
   backButton: { position: 'absolute', left: 15 },
   headerText: { color: '#ffa31a', fontSize: 20, fontWeight: '600' },
   // coffee images
   coffeeFalImagesTitle: { color: 'white', fontSize: 20, alignSelf: 'flex-start', marginLeft: 20, marginTop: 10, fontWeight: '700' },
   coffeeFalImagesSubTitle:{color:'#FF7800',fontSize: 15, alignSelf: 'flex-start', marginLeft: 20, marginTop: 10, fontWeight: '700'},
   coffeeFalImagesView: { marginTop: 10, flexDirection: 'row', width: '90%', height: 120, backgroundColor: 'black', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between' },
   coffeeFalImageFirst: { width: '30%', height: '90%', backgroundColor: '#212121', justifyContent: 'center', borderRadius: 10 },
   coffeeFalImageSecond: { width: '30%', height: '90%', backgroundColor: '#212121', justifyContent: 'center', borderRadius: 10 },
   coffeeFalImageThird: { width: '30%', height: '90%', backgroundColor: '#212121', justifyContent: 'center', borderRadius: 10 },
   coffeeFalImageIcon: { alignSelf: 'center' },
   photos: { width: '100%', height: '100%', borderRadius: 10 }


})


export default ({ navigation }) => {
   const [count, setCount] = useState(0)
   const [modal, setModal] = useState(false)
   const [photos, setPhoto] = useState([])

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
                  }
                  console.log(result.assets[0].uri)
                  setModal(false)
                  setPhoto(oldArray => [...oldArray, String(result.assets[0].uri)])

               } else {
                  setModal(false)
                  ToastAndroid.show("Galeriye İzin Verilmedi", ToastAndroid.LONG)
               }
            } catch (error) {
               setModal(false)
               ToastAndroid.show("Galeriye İzin Verilmedi", ToastAndroid.LONG)
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
                  }
                  setModal(false)
                  setPhoto(oldArray => [...oldArray, String(result.assets[0].uri)])
                  console.log(photos)
               } else {
                  setModal(false)
                  ToastAndroid.show("Kameraya İzin Verilmedi", ToastAndroid.LONG)
               }
            } catch (err) {
               setModal(false)
               ToastAndroid.show("Hata.!", ToastAndroid.SHORT)
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
      setPhoto(old=>[...old])
   }
 
   return (
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


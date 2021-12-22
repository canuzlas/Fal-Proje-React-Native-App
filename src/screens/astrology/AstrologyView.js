import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import trDate from 'tr-date'
import * as axios from 'axios'
const date = new trDate()
class AstrologyView extends Component {
   constructor(props) {
      super(props)
      this.state = {
         date: null,
         modalLoading: true,
         burcData: null,
         isVisible: false,
         activeButton: 0
      }
   }
   componentDidMount = async () => {
      this.setState({ date: String(date.getTime()) })
   }
   getBurcDataFromApi = async (route) => {
      const data = new Object({
         gunluk: '',
         haftalik: '',
         aylik: '',
         yillik: '',
         element: '',
         gezegen: '',
         motto: '',

      })
      this.setState({ isVisible: true })
      const gunluk = await axios.default.get("http://10.0.2.2:3000/burc/api/get/" + route)
      const haftalik = await axios.default.get("http://10.0.2.2:3000/burc/api/get/" + route + "/haftalik")
      const aylik = await axios.default.get("http://10.0.2.2:3000/burc/api/get/" + route + "/aylik")
      const yillik = await axios.default.get("http://10.0.2.2:3000/burc/api/get/" + route + "/yillik")
      data.gunluk = gunluk.data[0]
      data.haftalik = haftalik.data[0]
      data.aylik = aylik.data[0]
      data.yillik = yillik.data[0]
      data.element = gunluk.data[0].Elementi
      data.gezegen = gunluk.data[0].Gezegeni
      data.motto = gunluk.data[0].Mottosu
      //console.log(data)
      this.setState({ modalLoading: false, burcData: data })
   }
   render() {
      return (
         <View style={styles.container}>
            <TouchableOpacity onPress={() => this.getBurcDataFromApi('koc')} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                  <Text style={styles.buttonText}>Koç</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getBurcDataFromApi('boga')} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
                  <Text style={styles.buttonText}>Boğa</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getBurcDataFromApi('ikizler')} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                  <Text style={styles.buttonText}>İkizler</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getBurcDataFromApi('yengec')} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
                  <Text style={styles.buttonText}>Yengeç</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getBurcDataFromApi('aslan')} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                  <Text style={styles.buttonText}>Aslan</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getBurcDataFromApi('basak')} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
                  <Text style={styles.buttonText}>Başak</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getBurcDataFromApi('terazi')} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                  <Text style={styles.buttonText}>Terazi</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getBurcDataFromApi('akrep')} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
                  <Text style={styles.buttonText}>Akrep</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getBurcDataFromApi('yay')} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                  <Text style={styles.buttonText}>Yay</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getBurcDataFromApi('oglak')} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
                  <Text style={styles.buttonText}>Oğlak</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getBurcDataFromApi('kova')} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                  <Text style={styles.buttonText}>Kova</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getBurcDataFromApi('balik')} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
                  <Text style={styles.buttonText}>Balık</Text>
               </ImageBackground>
            </TouchableOpacity>
            <Modal
               animationType={"slide"}
               transparent={true}
               visible={this.state.isVisible}
            >
               {/*All views of Modal*/}

               <ImageBackground style={styles.astrologyModalBgGif} source={require('../../assets/astrologyModalBgGif/modalBg.png')} imageStyle={{ opacity: 0.3, resizeMode: 'stretch' }}>

                  {this.state.modalLoading ?
                     <View style={styles.pageLoadingContainer}>
                        <Image style={styles.pageLoadingImage} source={require('../../assets/loading/loading.gif')} />
                        <Text style={styles.pageLoadingText}>yorumlar yükleniyor..</Text>
                     </View>
                     :
                     <View>
                        <View style={styles.modalHeader}>
                           <Text style={styles.modalHeaderDate}>{this.state.date}</Text>
                           <Text style={styles.modalHeaderTitle}>{this.state.burcData.gunluk.Burc}</Text>
                           <TouchableOpacity onPress={() => this.setState({ burcData: null, isVisible: false, modalLoading: true })} style={styles.modalHeaderCloseIcon}><CloseIcon name='close' size={25} color={'#ffa31a'}></CloseIcon></TouchableOpacity>
                        </View>
                        <View style={styles.modalBurcFeatures}>
                           <Text style={styles.modalBurcMotto}>Mottosu : <Text style={{ fontWeight: 'bold' }}>{this.state.burcData.motto}</Text></Text>
                           <Text style={styles.modalBurcGezegen}>Yönetici Gezegeni : <Text style={{ fontWeight: 'bold' }}>{this.state.burcData.gezegen}</Text></Text>
                           <Text style={styles.modalBurcElement}>Elementi : <Text style={{ fontWeight: 'bold' }}>{this.state.burcData.element}</Text></Text>
                        </View>
                        <View style={styles.modalYorum}>
                           <View style={styles.modalYorumTabs}>
                              <TouchableOpacity onPress={() => this.setState({ activeButton: 0 })} style={this.state.activeButton === 0 ? styles.modalYorumTabsActiveButton : styles.modalYorumTabsButton}><Text style={styles.modalYorumTabsTitle}>Bugün</Text></TouchableOpacity>
                              <TouchableOpacity onPress={() => this.setState({ activeButton: 1 })} style={this.state.activeButton === 1 ? styles.modalYorumTabsActiveButton : styles.modalYorumTabsButton}><Text style={styles.modalYorumTabsTitle}>Haftalık</Text></TouchableOpacity>
                              <TouchableOpacity onPress={() => this.setState({ activeButton: 2 })} style={this.state.activeButton === 2 ? styles.modalYorumTabsActiveButton : styles.modalYorumTabsButton}><Text style={styles.modalYorumTabsTitle}>Aylık</Text></TouchableOpacity>
                              <TouchableOpacity onPress={() => this.setState({ activeButton: 3 })} style={this.state.activeButton === 3 ? styles.modalYorumTabsActiveButton : styles.modalYorumTabsButton}><Text style={styles.modalYorumTabsTitle}>Yıllık</Text></TouchableOpacity>
                           </View>
                           <ScrollView style={styles.modalYorumScrollView}>
                              {this.state.activeButton === 0 ? <Text style={styles.modalYorumText}>{this.state.burcData.gunluk.GunlukYorum}</Text> : null}
                              {this.state.activeButton === 1 ? <Text style={styles.modalYorumText}>{this.state.burcData.haftalik.Yorum}</Text> : null}
                              {this.state.activeButton === 2 ? <Text style={styles.modalYorumText}>{this.state.burcData.aylik.Yorum}</Text> : null}
                              {this.state.activeButton === 3 ? <Text style={styles.modalYorumText}>{this.state.burcData.yillik.Yorum}</Text> : null}
                           </ScrollView>
                        </View>
                     </View>
                  }
               </ImageBackground>
            </Modal>
         </View>
      );
   }
}
export default AstrologyViewFnc = () => {
   return (
      <SafeAreaView>
         <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={{ width: '100%', height: '100%', backgroundColor: 'black' }} >
            <AstrologyView></AstrologyView>
         </ScrollView>
      </SafeAreaView>
   )
}
const styles = StyleSheet.create({
   //modal loading styles
   pageLoadingContainer: { width: '100%', height: '100%', justifyContent: 'center' },
   pageLoadingImage: { width: 200, height: 200, alignSelf: 'center' },
   pageLoadingText: { color: 'white', fontSize: 20, fontWeight: '600', alignSelf: 'center' },

   //page
   container: {
      backgroundColor: 'black',
      width: '100%',
      height: '100%'
   },
   button: {
      width: '100%',
      height: 70,
      marginTop: 10,
      justifyContent: 'center'
   },
   ImageBackground: {
      justifyContent: 'center',
      width: '100%',
      height: '100%'
   },
   buttonText: {
      color: 'white',
      alignSelf: 'center',
      fontSize: 20
   },
   //modal
   astrologyModalBgGif: {
      backgroundColor: "black",
      height: '100%',
      width: '100%',
   },
   modalHeader: { flexDirection: 'row', padding: 20, justifyContent: 'center' },
   modalHeaderTitle: { alignSelf: 'center', fontSize: 25, color: 'white' },
   modalHeaderDate: { alignSelf: 'center', position: 'absolute', left: 15, color: 'white', fontSize: 12 },
   modalHeaderCloseIcon: { alignSelf: 'center', position: 'absolute', right: 15 },
   modalBurcFeatures: { padding: 15 },
   modalBurcMotto: { color: 'white', fontSize: 18, marginTop: 5 },
   modalBurcGezegen: { color: 'white', fontSize: 18, marginTop: 5 },
   modalBurcElement: { color: 'white', fontSize: 18, marginTop: 5 },
   modalYorum: { padding: 15, justifyContent: 'center', maxHeight: 450 },
   modalYorumTabs: { justifyContent: 'space-between', alignSelf: 'center', flexDirection: 'row', marginTop: 20 },
   modalYorumTabsButton: { padding: 10, justifyContent: 'center' },
   modalYorumTabsActiveButton: { padding: 10, justifyContent: 'center', borderBottomColor: '#ffa31a', borderBottomWidth: 1 },
   modalYorumTabsTitle: { alignSelf: 'center', color: 'white', fontSize: 20 },
   modalYorumScrollView: { padding: 15, marginTop: 10},
   modalYorumText: { color: 'white', fontSize: 17, alignSelf: 'center',paddingBottom:25 }
});



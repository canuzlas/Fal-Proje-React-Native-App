import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Modal, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcon from 'react-native-vector-icons/Ionicons';
import trDate from 'tr-date'
const date = new trDate()

class AstrologyView extends Component {
   constructor(props) {
      super(props)
      this.state = {
         date: null,
         pageLoading: true,
         koc: null,
         akrep: null,
         aslan: null,
         balik: null,
         basak: null,
         boga: null,
         ikizler: null,
         kova: null,
         oglak: null,
         terazi: null,
         yay: null,
         yengec: null,
         isVisible: false,
         isVisible1: false,
         isVisible2: false,
         isVisible3: false,
         isVisible4: false,
         isVisible5: false,
         isVisible6: false,
         isVisible7: false,
         isVisible8: false,
         isVisible9: false,
         isVisible10: false,
         isVisible11: false,
      }
   }
   componentDidMount = async () => {
      this.setState({ date: String(date.getTime()) })
      const koc = await AsyncStorage.getItem('koc');
      const akrep = await AsyncStorage.getItem('akrep');
      const aslan = await AsyncStorage.getItem('aslan');
      const balik = await AsyncStorage.getItem('balik');
      const basak = await AsyncStorage.getItem('basak');
      const boga = await AsyncStorage.getItem('boga');
      const ikizler = await AsyncStorage.getItem('ikizler');
      const kova = await AsyncStorage.getItem('kova');
      const oglak = await AsyncStorage.getItem('oglak');
      const terazi = await AsyncStorage.getItem('terazi');
      const yay = await AsyncStorage.getItem('yay');
      const yengec = await AsyncStorage.getItem('yengec');

      if (koc != null && akrep != null && aslan != null && balik != null && basak != null && boga != null && ikizler != null && kova != null && oglak != null && terazi != null && yay != null && yengec != null) {
         this.setState({ pageLoading: !this.state.pageLoading, koc: JSON.parse(koc), akrep: JSON.parse(akrep), aslan: JSON.parse(aslan), balik: JSON.parse(balik), basak: JSON.parse(basak), boga: JSON.parse(boga), ikizler: JSON.parse(ikizler), kova: JSON.parse(kova), oglak: JSON.parse(oglak), terazi: JSON.parse(terazi), yay: JSON.parse(yay), yengec: JSON.parse(yengec) })
      }
   }

   render() {
      return (
         this.state.pageLoading ?
            <View style={styles.pageLoadingContainer}>
               <Image style={styles.pageLoadingImage} source={require('../../assets/loading/loading.gif')} />
               <Text style={styles.pageLoadingText}>sayfa yükleniyor..</Text>
            </View>
            :
            <View style={styles.container}>

               {/* KOÇ */}
               <Modal
                  animationType={"slide"}
                  transparent={true}
                  visible={this.state.isVisible}
               >
                  {/*All views of Modal*/}

                  <ImageBackground style={styles.astrologyModalBgGif} source={require('../../assets/astrologyModalBgGif/modalBg.gif')} imageStyle={{ opacity: 0.3, resizeMode: 'stretch' }}>

                     <TouchableOpacity onPress={() => this.setState({ isVisible: !this.state.isVisible })} style={styles.modalBackButton}>
                        <IonIcon name={'chevron-back'} size={50} color={'#ffa31a'}></IonIcon>
                     </TouchableOpacity>
                     <Text style={styles.burcNameText}>
                        KOÇ
                     </Text>
                     <Text style={{ color: '#ffa31a' }}>{this.state.date}</Text>
                     <View style={styles.modalHeaderLine}></View>

                     <View style={{ paddingLeft: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18, }}>{String(this.state.koc.GunlukYorum)}</Text>
                     </View>
                  </ImageBackground>

               </Modal>
               {/* KOÇ */}


               {/* Boğa */}
               <Modal
                  animationType={"slide"}
                  transparent={true}
                  visible={this.state.isVisible1}
               >
                  {/*All views of Modal*/}

                  <ImageBackground style={styles.astrologyModalBgGif} source={require('../../assets/astrologyModalBgGif/modalBg.gif')} imageStyle={{ opacity: 0.3, resizeMode: 'stretch' }}>

                     <TouchableOpacity onPress={() => this.setState({ isVisible1: !this.state.isVisible1 })} style={styles.modalBackButton}>
                        <IonIcon name={'chevron-back'} size={50} color={'#ffa31a'}></IonIcon>
                     </TouchableOpacity>
                     <Text style={styles.burcNameText}>
                        BOĞA
                     </Text>
                     <Text style={{ color: '#ffa31a' }}>{this.state.date}</Text>
                     <View style={styles.modalHeaderLine}></View>

                     <View style={{ paddingLeft: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18, }}>{String(this.state.boga.GunlukYorum)}</Text>
                     </View>
                  </ImageBackground>
               </Modal>
               {/* Boğa */}



               {/* İkizler */}
               <Modal
                  animationType={"slide"}
                  transparent={true}
                  visible={this.state.isVisible2}
               >
                  {/*All views of Modal*/}

                  <ImageBackground style={styles.astrologyModalBgGif} source={require('../../assets/astrologyModalBgGif/modalBg.gif')} imageStyle={{ opacity: 0.3, resizeMode: 'stretch' }}>

                     <TouchableOpacity onPress={() => this.setState({ isVisible2: !this.state.isVisible2 })} style={styles.modalBackButton}>
                        <IonIcon name={'chevron-back'} size={50} color={'#ffa31a'}></IonIcon>
                     </TouchableOpacity>
                     <Text style={styles.burcNameText}>
                        İKİZLER
                     </Text>
                     <Text style={{ color: '#ffa31a' }}>{this.state.date}</Text>
                     <View style={styles.modalHeaderLine}></View>

                     <View style={{ paddingLeft: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18, }}>{String(this.state.ikizler.GunlukYorum)}</Text>
                     </View>
                  </ImageBackground>
               </Modal>
               {/* İkizler */}


               {/* Yengeç */}
               <Modal
                  animationType={"slide"}
                  transparent={true}
                  visible={this.state.isVisible3}
               >
                  {/*All views of Modal*/}

                  <ImageBackground style={styles.astrologyModalBgGif} source={require('../../assets/astrologyModalBgGif/modalBg.gif')} imageStyle={{ opacity: 0.3, resizeMode: 'stretch' }}>

                     <TouchableOpacity onPress={() => this.setState({ isVisible3: !this.state.isVisible3 })} style={styles.modalBackButton}>
                        <IonIcon name={'chevron-back'} size={50} color={'#ffa31a'}></IonIcon>
                     </TouchableOpacity>
                     <Text style={styles.burcNameText}>
                        YENGEÇ
                     </Text>
                     <Text style={{ color: '#ffa31a' }}>{this.state.date}</Text>
                     <View style={styles.modalHeaderLine}></View>

                     <View style={{ paddingLeft: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18, }}>{String(this.state.yengec.GunlukYorum)}</Text>
                     </View>
                  </ImageBackground>
               </Modal>
               {/* Yengeç */}


               {/* Aslan */}
               <Modal
                  animationType={"slide"}
                  transparent={true}
                  visible={this.state.isVisible4}
               >
                  {/*All views of Modal*/}

                  <ImageBackground style={styles.astrologyModalBgGif} source={require('../../assets/astrologyModalBgGif/modalBg.gif')} imageStyle={{ opacity: 0.3, resizeMode: 'stretch' }}>

                     <TouchableOpacity onPress={() => this.setState({ isVisible4: !this.state.isVisible4 })} style={styles.modalBackButton}>
                        <IonIcon name={'chevron-back'} size={50} color={'#ffa31a'}></IonIcon>
                     </TouchableOpacity>
                     <Text style={styles.burcNameText}>
                        ASLAN
                     </Text>
                     <Text style={{ color: '#ffa31a' }}>{this.state.date}</Text>
                     <View style={styles.modalHeaderLine}></View>

                     <View style={{ paddingLeft: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18, }}>{String(this.state.aslan.GunlukYorum)}</Text>
                     </View>
                  </ImageBackground>
               </Modal>
               {/* Aslan */}


               {/* Başak */}
               <Modal
                  animationType={"slide"}
                  transparent={true}
                  visible={this.state.isVisible5}
               >
                  {/*All views of Modal*/}

                  <ImageBackground style={styles.astrologyModalBgGif} source={require('../../assets/astrologyModalBgGif/modalBg.gif')} imageStyle={{ opacity: 0.3, resizeMode: 'stretch' }}>

                     <TouchableOpacity onPress={() => this.setState({ isVisible5: !this.state.isVisible5 })} style={styles.modalBackButton}>
                        <IonIcon name={'chevron-back'} size={50} color={'#ffa31a'}></IonIcon>
                     </TouchableOpacity>
                     <Text style={styles.burcNameText}>
                        BAŞAK
                     </Text>
                     <Text style={{ color: '#ffa31a' }}>{this.state.date}</Text>
                     <View style={styles.modalHeaderLine}></View>

                     <View style={{ paddingLeft: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18, }}>{String(this.state.basak.GunlukYorum)}</Text>
                     </View>
                  </ImageBackground>
               </Modal>
               {/* Başak */}


               {/* Terazi */}
               <Modal
                  animationType={"slide"}
                  transparent={true}
                  visible={this.state.isVisible6}
               >
                  {/*All views of Modal*/}

                  <ImageBackground style={styles.astrologyModalBgGif} source={require('../../assets/astrologyModalBgGif/modalBg.gif')} imageStyle={{ opacity: 0.3, resizeMode: 'stretch' }}>

                     <TouchableOpacity onPress={() => this.setState({ isVisible6: !this.state.isVisible6 })} style={styles.modalBackButton}>
                        <IonIcon name={'chevron-back'} size={50} color={'#ffa31a'}></IonIcon>
                     </TouchableOpacity>
                     <Text style={styles.burcNameText}>
                        TERAZİ
                     </Text>
                     <Text style={{ color: '#ffa31a' }}>{this.state.date}</Text>
                     <View style={styles.modalHeaderLine}></View>

                     <View style={{ paddingLeft: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18, }}>{String(this.state.terazi.GunlukYorum)}</Text>
                     </View>
                  </ImageBackground>
               </Modal>
               {/* Terazi */}


               {/* Akrep */}
               <Modal
                  animationType={"slide"}
                  transparent={true}
                  visible={this.state.isVisible7}
               >
                  {/*All views of Modal*/}

                  <ImageBackground style={styles.astrologyModalBgGif} source={require('../../assets/astrologyModalBgGif/modalBg.gif')} imageStyle={{ opacity: 0.3, resizeMode: 'stretch' }}>

                     <TouchableOpacity onPress={() => this.setState({ isVisible7: !this.state.isVisible7 })} style={styles.modalBackButton}>
                        <IonIcon name={'chevron-back'} size={50} color={'#ffa31a'}></IonIcon>
                     </TouchableOpacity>
                     <Text style={styles.burcNameText}>
                        AKREP
                     </Text>
                     <Text style={{ color: '#ffa31a' }}>{this.state.date}</Text>
                     <View style={styles.modalHeaderLine}></View>

                     <View style={{ paddingLeft: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18, }}>{String(this.state.akrep.GunlukYorum)}</Text>
                     </View>
                  </ImageBackground>
               </Modal>
               {/* Akrep */}


               {/* Yay */}
               <Modal
                  animationType={"slide"}
                  transparent={true}
                  visible={this.state.isVisible8}
               >
                  {/*All views of Modal*/}

                  <ImageBackground style={styles.astrologyModalBgGif} source={require('../../assets/astrologyModalBgGif/modalBg.gif')} imageStyle={{ opacity: 0.3, resizeMode: 'stretch' }}>

                     <TouchableOpacity onPress={() => this.setState({ isVisible8: !this.state.isVisible8 })} style={styles.modalBackButton}>
                        <IonIcon name={'chevron-back'} size={50} color={'#ffa31a'}></IonIcon>
                     </TouchableOpacity>
                     <Text style={styles.burcNameText}>
                        YAY
                     </Text>
                     <Text style={{ color: '#ffa31a' }}>{this.state.date}</Text>
                     <View style={styles.modalHeaderLine}></View>

                     <View style={{ paddingLeft: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18, }}>{String(this.state.yay.GunlukYorum)}</Text>
                     </View>
                  </ImageBackground>
               </Modal>
               {/* Yay */}


               {/* Oğlak */}
               <Modal
                  animationType={"slide"}
                  transparent={true}
                  visible={this.state.isVisible9}
               >
                  {/*All views of Modal*/}

                  <ImageBackground style={styles.astrologyModalBgGif} source={require('../../assets/astrologyModalBgGif/modalBg.gif')} imageStyle={{ opacity: 0.3, resizeMode: 'stretch' }}>

                     <TouchableOpacity onPress={() => this.setState({ isVisible9: !this.state.isVisible9 })} style={styles.modalBackButton}>
                        <IonIcon name={'chevron-back'} size={50} color={'#ffa31a'}></IonIcon>
                     </TouchableOpacity>
                     <Text style={styles.burcNameText}>
                        OĞLAK
                     </Text>
                     <Text style={{ color: '#ffa31a' }}>{this.state.date}</Text>
                     <View style={styles.modalHeaderLine}></View>

                     <View style={{ paddingLeft: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18, }}>{String(this.state.oglak.GunlukYorum)}</Text>
                     </View>
                  </ImageBackground>
               </Modal>
               {/* Oğlak */}


               {/* Kova */}
               <Modal
                  animationType={"slide"}
                  transparent={true}
                  visible={this.state.isVisible10}
               >
                  {/*All views of Modal*/}

                  <ImageBackground style={styles.astrologyModalBgGif} source={require('../../assets/astrologyModalBgGif/modalBg.gif')} imageStyle={{ opacity: 0.3, resizeMode: 'stretch' }}>

                     <TouchableOpacity onPress={() => this.setState({ isVisible10: !this.state.isVisible10 })} style={styles.modalBackButton}>
                        <IonIcon name={'chevron-back'} size={50} color={'#ffa31a'}></IonIcon>
                     </TouchableOpacity>
                     <Text style={styles.burcNameText}>
                        KOVA
                     </Text>
                     <Text style={{ color: '#ffa31a' }}>{this.state.date}</Text>
                     <View style={styles.modalHeaderLine}></View>

                     <View style={{ paddingLeft: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18, }}>{String(this.state.kova.GunlukYorum)}</Text>
                     </View>
                  </ImageBackground>
               </Modal>
               {/* Kova */}


               {/* Balık */}
               <Modal
                  animationType={"slide"}
                  transparent={true}
                  visible={this.state.isVisible11}
               >
                  {/*All views of Modal*/}

                  <ImageBackground style={styles.astrologyModalBgGif} source={require('../../assets/astrologyModalBgGif/modalBg.gif')} imageStyle={{ opacity: 0.3, resizeMode: 'stretch' }}>

                     <TouchableOpacity onPress={() => this.setState({ isVisible11: !this.state.isVisible11 })} style={styles.modalBackButton}>
                        <IonIcon name={'chevron-back'} size={50} color={'#ffa31a'}></IonIcon>
                     </TouchableOpacity>
                     <Text style={styles.burcNameText}>
                        BALIK
                     </Text>
                     <Text style={{ color: '#ffa31a' }}>{this.state.date}</Text>
                     <View style={styles.modalHeaderLine}></View>

                     <View style={{ paddingLeft: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18, }}>{String(this.state.balik.GunlukYorum)}</Text>
                     </View>
                  </ImageBackground>
               </Modal>
               {/* Balık */}


               <TouchableOpacity onPress={() => this.setState({ isVisible: true })} style={styles.button}>
                  <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                     <Text style={styles.buttonText}>Koç</Text>
                  </ImageBackground>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => this.setState({ isVisible1: true })} style={styles.button}>
                  <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
                     <Text style={styles.buttonText}>Boğa</Text>
                  </ImageBackground>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => this.setState({ isVisible2: true })} style={styles.button}>
                  <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                     <Text style={styles.buttonText}>İkizler</Text>
                  </ImageBackground>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => this.setState({ isVisible3: true })} style={styles.button}>
                  <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
                     <Text style={styles.buttonText}>Yengeç</Text>
                  </ImageBackground>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => this.setState({ isVisible4: true })} style={styles.button}>
                  <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                     <Text style={styles.buttonText}>Aslan</Text>
                  </ImageBackground>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => this.setState({ isVisible5: true })} style={styles.button}>
                  <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
                     <Text style={styles.buttonText}>Başak</Text>
                  </ImageBackground>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => this.setState({ isVisible6: true })} style={styles.button}>
                  <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                     <Text style={styles.buttonText}>Terazi</Text>
                  </ImageBackground>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => this.setState({ isVisible7: true })} style={styles.button}>
                  <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
                     <Text style={styles.buttonText}>Akrep</Text>
                  </ImageBackground>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => this.setState({ isVisible8: true })} style={styles.button}>
                  <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                     <Text style={styles.buttonText}>Yay</Text>
                  </ImageBackground>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => this.setState({ isVisible9: true })} style={styles.button}>
                  <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
                     <Text style={styles.buttonText}>Oğlak</Text>
                  </ImageBackground>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => this.setState({ isVisible10: true })} style={styles.button}>
                  <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                     <Text style={styles.buttonText}>Kova</Text>
                  </ImageBackground>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => this.setState({ isVisible11: true })} style={styles.button}>
                  <ImageBackground imageStyle={{ opacity: 0.3 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
                     <Text style={styles.buttonText}>Balık</Text>
                  </ImageBackground>
               </TouchableOpacity>
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

   //pageloading styles
   pageLoadingContainer: { width: '100%', height: '100%', justifyContent: 'center', backgroundColor: 'black' },
   pageLoadingImage: { width: 150, height: 150, alignSelf: 'center' },
   pageLoadingText: { color: 'white', fontSize: 20, fontWeight: '600', alignSelf: 'center' },

   //page
   container: {
      backgroundColor: 'black',
      width: '100%',
      height: '100%'
   },
   astrologyModalBgGif: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "black",
      height: '100%',
      width: '100%',
   },
   modalBackButton: {
      position: 'absolute',
      top: 10,
      left: 10,
      justifyContent: 'center'
   },
   burcNameText: {
      color: '#ffa31a',
      fontSize: 30,
      position: 'absolute',
      top: 15
   },
   modalHeaderLine: {
      width: "100%",
      borderWidth: 0.5,
      borderColor: '#ffa31a',
      position: 'absolute',
      top: 70
   },

   modalButtonText: {
      color: 'white',
      fontSize: 20
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
   text: {
      color: '#3f2949',
      marginTop: 10
   }
});



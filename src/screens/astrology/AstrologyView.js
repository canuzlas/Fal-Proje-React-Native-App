import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Modal, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';

class AstrologyView extends Component {
   constructor(props) {
      super(props)
      this.state = {
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

   render() {
      return (

         <View style={styles.container}>
            {/* KOÇ */}
            <Modal
               animationType={"slide"}
               transparent={true}
               visible={this.state.isVisible}
            >
               {/*All views of Modal*/}
               <View style={styles.modal}>
                  <TouchableOpacity onPress={()=>this.setState({isVisible:!this.state.isVisible})} style={styles.modalButton}><Text style={styles.modalButtonText}>Kapat</Text></TouchableOpacity>
               </View>
            </Modal>
            {/* KOÇ */}
            {/* Boğa */}
            <Modal
               animationType={"slide"}
               transparent={true}
               visible={this.state.isVisible1}
            >
               {/*All views of Modal*/}
               <View style={styles.modal}>
                  <TouchableOpacity onPress={()=>this.setState({isVisible1:!this.state.isVisible1})} style={styles.modalButton}><Text style={styles.modalButtonText}>Kapat</Text></TouchableOpacity>
               </View>
            </Modal>
            {/* Boğa */}
            {/* İkizler */}
            <Modal
               animationType={"slide"}
               transparent={true}
               visible={this.state.isVisible2}
            >
               {/*All views of Modal*/}
               <View style={styles.modal}>
                  <TouchableOpacity onPress={()=>this.setState({isVisible2:!this.state.isVisible2})} style={styles.modalButton}><Text style={styles.modalButtonText}>Kapat</Text></TouchableOpacity>
               </View>
            </Modal>
            {/* İkizler */}
            {/* Yengeç */}
            <Modal
               animationType={"slide"}
               transparent={true}
               visible={this.state.isVisible3}
            >
               {/*All views of Modal*/}
               <View style={styles.modal}>
                  <TouchableOpacity onPress={()=>this.setState({isVisible3:!this.state.isVisible3})} style={styles.modalButton}><Text style={styles.modalButtonText}>Kapat</Text></TouchableOpacity>
               </View>
            </Modal>
            {/* Yengeç */}
            {/* Aslan */}
            <Modal
               animationType={"slide"}
               transparent={true}
               visible={this.state.isVisible4}
            >
               {/*All views of Modal*/}
               <View style={styles.modal}>
                  <TouchableOpacity onPress={()=>this.setState({isVisible4:!this.state.isVisible4})} style={styles.modalButton}><Text style={styles.modalButtonText}>Kapat</Text></TouchableOpacity>
               </View>
            </Modal>
            {/* Aslan */}
            {/* Başak */}
            <Modal
               animationType={"slide"}
               transparent={true}
               visible={this.state.isVisible5}
            >
               {/*All views of Modal*/}
               <View style={styles.modal}>
                  <TouchableOpacity onPress={()=>this.setState({isVisible5:!this.state.isVisible5})} style={styles.modalButton}><Text style={styles.modalButtonText}>Başak</Text></TouchableOpacity>
               </View>
            </Modal>
            {/* Başak */}
            {/* Terazi */}
            <Modal
               animationType={"slide"}
               transparent={true}
               visible={this.state.isVisible6}
            >
               {/*All views of Modal*/}
               <View style={styles.modal}>
                  <TouchableOpacity onPress={()=>this.setState({isVisible6:!this.state.isVisible6})} style={styles.modalButton}><Text style={styles.modalButtonText}>Kapat</Text></TouchableOpacity>
               </View>
            </Modal>
            {/* Terazi */}
            {/* Akrep */}
            <Modal
               animationType={"slide"}
               transparent={true}
               visible={this.state.isVisible7}
            >
               {/*All views of Modal*/}
               <View style={styles.modal}>
                  <TouchableOpacity onPress={()=>this.setState({isVisible7:!this.state.isVisible7})} style={styles.modalButton}><Text style={styles.modalButtonText}>Kapat</Text></TouchableOpacity>
               </View>
            </Modal>
            {/* Akrep */}
            {/* Yay */}
            <Modal
               animationType={"slide"}
               transparent={true}
               visible={this.state.isVisible8}
            >
               {/*All views of Modal*/}
               <View style={styles.modal}>
                  <TouchableOpacity onPress={()=>this.setState({isVisible8:!this.state.isVisible8})} style={styles.modalButton}><Text style={styles.modalButtonText}>Kapat</Text></TouchableOpacity>
               </View>
            </Modal>
            {/* Yay */}
            {/* Oğlak */}
            <Modal
               animationType={"slide"}
               transparent={true}
               visible={this.state.isVisible9}
            >
               {/*All views of Modal*/}
               <View style={styles.modal}>
                  <TouchableOpacity onPress={()=>this.setState({isVisible9:!this.state.isVisible9})} style={styles.modalButton}><Text style={styles.modalButtonText}>Kapat</Text></TouchableOpacity>
               </View>
            </Modal>
            {/* Oğlak */}
            {/* Kova */}
            <Modal
               animationType={"slide"}
               transparent={true}
               visible={this.state.isVisible10}
            >
               {/*All views of Modal*/}
               <View style={styles.modal}>
                  <TouchableOpacity onPress={()=>this.setState({isVisible10:!this.state.isVisible10})} style={styles.modalButton}><Text style={styles.modalButtonText}>Kapat</Text></TouchableOpacity>
               </View>
            </Modal>
            {/* Kova */}
            {/* Balık */}
            <Modal
               animationType={"slide"}
               transparent={true}
               visible={this.state.isVisible11}
            >
               {/*All views of Modal*/}
               <View style={styles.modal}>
                  <TouchableOpacity onPress={()=>this.setState({isVisible11:!this.state.isVisible11})} style={styles.modalButton}><Text style={styles.modalButtonText}>Kapat</Text></TouchableOpacity>
               </View>
            </Modal>
            {/* Balık */}
            <TouchableOpacity onPress={() => this.setState({ isVisible: true })} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.1 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                  <Text style={styles.buttonText}>Koç</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ isVisible1: true })} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.1 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
                  <Text style={styles.buttonText}>Boğa</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ isVisible2: true })} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.1 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                  <Text style={styles.buttonText}>İkizler</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ isVisible3: true })} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.1 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
                  <Text style={styles.buttonText}>Yengeç</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ isVisible4: true })} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.1 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                  <Text style={styles.buttonText}>Aslan</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ isVisible5: true })} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.1 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
                  <Text style={styles.buttonText}>Başak</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ isVisible6: true })} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.1 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                  <Text style={styles.buttonText}>Terazi</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ isVisible7: true })} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.1 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
                  <Text style={styles.buttonText}>Akrep</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ isVisible8: true })} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.1 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                  <Text style={styles.buttonText}>Yay</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ isVisible9: true })} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.1 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
                  <Text style={styles.buttonText}>Oğlak</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ isVisible10: true })} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.1 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg.jpg')}>
                  <Text style={styles.buttonText}>Kova</Text>
               </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ isVisible11: true })} style={styles.button}>
               <ImageBackground imageStyle={{ opacity: 0.1 }} style={styles.ImageBackground} source={require('../../assets/astrologyBg/bg1.jpg')}>
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
         <ScrollView>
            <AstrologyView></AstrologyView>
         </ScrollView>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: 'black',
      width: '100%',
      height: '100%'
   },
   modal: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "black",
      height: 400,
      width: '100%',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginTop: 80,


   },
   modalButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      justifyContent: 'center'
   },
   modalButtonText:{
      color:'white',
      fontSize:20
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



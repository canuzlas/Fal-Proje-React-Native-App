import * as React from 'react';
import { View, Image, StyleSheet,Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as axios from 'axios';

export default class AppStartScreen extends React.Component {
   constructor(props) {
      super(props)
   }
   componentDidMount = async()=> {
      const koc = await axios.default.get("https://burc-yorumlari.herokuapp.com/get/koc")
      const akrep = await axios.default.get("https://burc-yorumlari.herokuapp.com/get/akrep")
      const aslan = await axios.default.get("https://burc-yorumlari.herokuapp.com/get/aslan")
      const balik = await axios.default.get("https://burc-yorumlari.herokuapp.com/get/balik")
      const basak = await axios.default.get("https://burc-yorumlari.herokuapp.com/get/basak")
      const boga = await axios.default.get("https://burc-yorumlari.herokuapp.com/get/boga")
      const ikizler = await axios.default.get("https://burc-yorumlari.herokuapp.com/get/ikizler")
      const kova = await axios.default.get("https://burc-yorumlari.herokuapp.com/get/kova")
      const oglak = await axios.default.get("https://burc-yorumlari.herokuapp.com/get/oglak")
      const terazi = await axios.default.get("https://burc-yorumlari.herokuapp.com/get/terazi")
      const yay = await axios.default.get("https://burc-yorumlari.herokuapp.com/get/yay")
      const yengec = await axios.default.get("https://burc-yorumlari.herokuapp.com/get/yengec")
      AsyncStorage.setItem("koc", JSON.stringify(koc.data[0]))
      AsyncStorage.setItem("akrep", JSON.stringify(akrep.data[0]))
      AsyncStorage.setItem("aslan", JSON.stringify(aslan.data[0]))
      AsyncStorage.setItem("balik", JSON.stringify(balik.data[0]))
      AsyncStorage.setItem("basak", JSON.stringify(basak.data[0]))
      AsyncStorage.setItem("boga", JSON.stringify(boga.data[0]))
      AsyncStorage.setItem("ikizler", JSON.stringify(ikizler.data[0]))
      AsyncStorage.setItem("kova", JSON.stringify(kova.data[0]))
      AsyncStorage.setItem("oglak", JSON.stringify(oglak.data[0]))
      AsyncStorage.setItem("terazi", JSON.stringify(terazi.data[0]))
      AsyncStorage.setItem("yay", JSON.stringify(yay.data[0]))
      AsyncStorage.setItem("yengec", JSON.stringify(yengec.data[0]))

      setTimeout(() => { this.props.navigation.navigate('AppAraScreen') }, 1)
   }
   render() {
      return (
         <View style={styles.background}>
            <View style={styles.imageView}>
               <Image style={styles.image} source={require('../assets/logo/FH_LOGO.png')}></Image>
               {/* <View style={styles.textView}>
                     <Text style={styles.text}>Uzlaş Yazılım</Text>  
               </View> */}
            </View>
         </View>
      )
   } 
}
const styles = StyleSheet.create({
   background: { justifyContent: 'center', backgroundColor: 'black', width: '100%', height: '100%' },
   imageView: { alignItems: 'center' }
   // textView:{alignItems:'center'},
   // text:{fontSize:15,color:'white'}
})
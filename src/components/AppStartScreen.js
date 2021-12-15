import * as React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as axios from 'axios';
import DeviceInfo from 'react-native-device-info';

export default class AppStartScreen extends React.Component {
   constructor(props) {
      super(props)
   }
   componentDidMount = async () => {
      const result = await axios.default.post("https://fal-hub.herokuapp.com/api", { device: await DeviceInfo.getAndroidId() })
      await AsyncStorage.setItem("token", String(result.data.token))
      const User = await AsyncStorage.getItem('User')
      if (User === null) {
         setTimeout(() => { this.props.navigation.navigate('AppAraScreen') }, 1)
      } else {
         setTimeout(() => { this.props.navigation.navigate('Tab') }, 1)
      }
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
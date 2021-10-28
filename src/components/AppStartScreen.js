import * as React from 'react';
import { View, Image, StyleSheet,Text } from 'react-native';

export default class AppStartScreen extends React.Component {
   constructor(props) {
      super(props)
   }
   componentDidMount() {
      setTimeout(() => { this.props.navigation.navigate('AppAraScreen') }, 1500)
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
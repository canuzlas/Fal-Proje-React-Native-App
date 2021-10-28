import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from "react-native"
import * as React from 'react'

export default AppAraScreen = ({ navigation }) => {
   return (

      <View style={style.container}>
         <ImageBackground source={require('../assets/arascreengif/gif.gif')} resizeMode="stretch" style={style.bgimage} imageStyle={{ opacity: 0.3 }}>
            <Text style={style.textHeader}>Geleceğini görmeye hazır mısın?</Text>
            <Text style={style.textUnder}>"Fala inanma ama <Text style={style.textFalhub}>Falhub</Text>'sız da kalma."</Text>
            {/* <Text style={style.textWriter}><Text style={style.textFalhub}>Falhub</Text></Text> */}
            <TouchableOpacity style={style.button} onPress={() => navigation.navigate('Tab')}><Text style={style.buttonText}>Haydi Başlayalım</Text></TouchableOpacity>
         </ImageBackground>
      </View>

   )
}

const style = StyleSheet.create({
   container: { backgroundColor: 'black', width: '100%', height: '100%', justifyContent: 'center' },
   bgimage: {width: '100%', height: '100%', justifyContent: 'center'},
   textHeader: { color: 'white', fontSize: 30, marginLeft: 10 },
   textUnder: { color: 'white', fontSize: 15, marginLeft: 5, marginTop: 20 },
   textFalhub: { color: '#ffa31a', fontSize: 20 },
   // textWriter: { color: 'white', alignSelf: 'center', fontSize: 10, marginLeft: 100, marginTop: 5 },
   button: { borderRadius: 5, backgroundColor: '#ffa31a', position: 'absolute', padding: 10, width: '80%', bottom: 50, alignSelf: 'center', justifyContent: 'center' },
   buttonText: { fontSize: 18, alignSelf: 'center', color: 'black', fontWeight: '500' }
})
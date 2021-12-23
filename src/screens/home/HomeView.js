import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeView extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
      }
   }
   checkLoginForKahveFali = async (route) => {
      let res;
      switch (route) {
         case "kahve":
            res = await AsyncStorage.getItem('User')
            if (res == null) {
               this.props.navigation.navigate('Login', { alertInfo: 'thanKahveFali' })
            } else {
               this.props.navigation.navigate('CoffeFal')
            }
            break;

         case "tarot":
            res = await AsyncStorage.getItem('User')
            if (res == null) {
               this.props.navigation.navigate('Login', { alertInfo: 'thanTarotFali' })
            } else {
               this.props.navigation.navigate('TarotFal')
            }
            break;
      }
   }
   componentDidMount = async () => {
      const User = JSON.parse(await AsyncStorage.getItem('User'))
      User ? ToastAndroid.show("Hoşgeldin " + User.name, ToastAndroid.LONG) : ToastAndroid.show("Hoşgeldin", ToastAndroid.LONG)
   }
   render() {
      return (
         <View style={styles.container}>

            <Text style={styles.titleFirst}>Falına Baktır</Text>
            <View style={styles.kahveFaliView}>
               <View style={{ width: '45%', height: 180, marginRight: 20 }}>
                  <TouchableOpacity onPress={() => this.checkLoginForKahveFali("kahve")}>
                     <ImageBackground style={styles.kahveFaliViewBgImage} imageStyle={{ opacity: 0.6 }} resizeMode={'stretch'} resizeMethod={'auto'} source={require('../../assets/homeview/fal.jpg')}>
                        <Text style={styles.kahveFaliTitle}>Kahve Falı</Text>
                     </ImageBackground>
                  </TouchableOpacity>
               </View>

               <View style={{ width: '45%', height: 180 }}>
                  <TouchableOpacity onPress={() => this.checkLoginForKahveFali("tarot")}>
                     <ImageBackground style={styles.kahveFaliViewBgImage} imageStyle={{ opacity: 0.6 }} resizeMode={'stretch'} resizeMethod={'auto'} source={require('../../assets/homeview/tarot.jpeg')}>
                        <Text style={styles.kahveFaliTitle}>Tarot Falı</Text>
                     </ImageBackground>
                  </TouchableOpacity>
               </View>
            </View>

            <Text style={styles.titleSecond}>Günlük Burç Yorumu</Text>
            <View style={styles.astrologyView}>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('Astroloji')}>
                  <ImageBackground style={styles.astrologyViewBgImage} imageStyle={{ opacity: 0.3 }} resizeMode={'stretch'} resizeMethod={'auto'} source={require('../../assets/astrologyBg/gif.gif')}>
                     <Text style={styles.astrologyTitle}>Astroloji</Text>
                  </ImageBackground>
               </TouchableOpacity>
            </View>

         </View>
      )
   }
}

export default HomeViewFnc = () => {
   const navigation = useNavigation();
   return (
      <SafeAreaView>
         <ScrollView style={styles.container}>
            <HomeView navigation={navigation}></HomeView>
         </ScrollView>
      </SafeAreaView>
   )

}

const styles = StyleSheet.create({
   container: { backgroundColor: 'black', width: '100%', height: '100%' },

   //titles
   titleFirst: { fontSize: 20, fontWeight: '700', color: '#ffa31a', marginLeft: 20, marginTop: 15 },
   titleSecond: { fontSize: 20, fontWeight: '700', color: '#ffa31a', marginLeft: 20, marginTop: 15 },

   //coffe
   kahveFaliView: { width: '90%', height: 180, alignSelf: 'center', justifyContent: 'center', marginTop: 20, backgroundColor: 'black', borderRadius: 20, flexDirection: 'row' },
   kahveFaliViewBgImage: { width: '100%', height: '100%' },
   kahveFaliTitle: { color: 'white', alignSelf: 'center', position: 'absolute', bottom: 0, fontSize: 20, fontWeight: '900' },

   //astrology
   astrologyView: { width: '90%', height: 200, alignSelf: 'center', marginTop: 20, backgroundColor: 'black', borderRadius: 20 },
   astrologyViewBgImage: { width: '100%', height: '100%' },
   astrologyIcon: { alignSelf: 'center', top: 5 },
   astrologyTitle: { color: 'white', alignSelf: 'center', position: 'absolute', bottom: 0, fontSize: 30, fontWeight: '900' },
   astrologyDesc: { color: 'white', alignSelf: 'center', marginTop: 30, fontSize: 20 }
})
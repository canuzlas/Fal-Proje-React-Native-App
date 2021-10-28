import * as React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'


class ProfileView extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         userLogged: true,
         pageLoading: true
      }
   }
   componentDidMount = async () => {
      try {
         const res = await AsyncStorage.getItem('loginSession')
         if (res == null) {
            this.setState({pageLoading:false})
            this.setState({ userLogged: false })
         } else {
            this.setState({pageLoading:false})
            this.setState({ userLogged: true })
         }
      } catch (error) {

      }
   }
   goToLoginPage() {
      this.props.navigation.navigate('Login', { alertInfo: null })
   }
   render() {
      return (
         this.state.pageLoading ?
            <View style={styles.pageLoadingContainer}>
               <Image style={styles.pageLoadingImage} source={require('../../assets/loading/loading.gif')}/>
               <Text style={styles.pageLoadingText}>sayfa yükleniyor..</Text>
            </View>
            :
            this.state.userLogged ?
               <View>
                  <Text>User Giriş Yaptı</Text>
               </View>
               :
               <View style={styles.containerNotLogged}>
                  <Text style={styles.notLoggedText}>Kullanıcı Giriş Yapmadı.!</Text>
                  <TouchableOpacity style={styles.notLoggedButton} onPress={() => this.goToLoginPage()}><Text style={styles.notLoggedButtonText}>Giriş Yap</Text></TouchableOpacity>
               </View>
      )
   }

}


export default () => {
   const navigation = useNavigation()
   return (
      <ProfileView navigation={navigation}></ProfileView>
   )
}

const styles = StyleSheet.create({
   //pageloading styles
   pageLoadingContainer:{width:'100%',height:'100%',justifyContent:'center',backgroundColor:'black'},
   pageLoadingImage:{width:150,height:150,alignSelf:'center'},
   pageLoadingText:{color:'white',fontSize:20,fontWeight:'600',alignSelf:'center'},



   containerNotLogged: { backgroundColor: 'black', width: '100%', height: '100%', justifyContent: 'center' },
   notLoggedText: { color: 'white', fontSize: 20, alignSelf: 'center' },
   notLoggedButton: { marginTop: 50, borderRadius: 5, backgroundColor: '#ffa31a', padding: 10, width: '80%', alignSelf: 'center', justifyContent: 'center' },
   notLoggedButtonText: { fontSize: 18, alignSelf: 'center', color: 'black', fontWeight: '500' }
})
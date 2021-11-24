import * as React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { LoginManager,Settings } from 'react-native-fbsdk-next';

class ProfileView extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         userLogged: true,
         pageLoading: true,
         user: null,
         UserLoggedAt: null,
         loop: 0
      }
   }
   componentDidMount() {
      this.setState({ loop: this.state.loop++ })
   }
   componentDidUpdate = async (prevProps, prevState) => {

      if (prevState.loop != this.state.loop) {
         const User = await AsyncStorage.getItem('User')
         const UserLoggedAt = await AsyncStorage.getItem('UserLoggedAt')
         console.log(User)
         if (User === null) {
            console.log("if")
            this.setState({ pageLoading: false, userLogged: false, loop: this.state.loop++ })
         } else {
            console.log("else")
            this.setState({ pageLoading: false, userLogged: true, user: User, UserLoggedAt: UserLoggedAt, loop: this.state.loop })
         }
      }
   }
   componentWillUnmount = async() => {
      this.setState = (state,callback)=>{
         return;
     };
   }

   goToLoginPage() {
      this.props.navigation.navigate('Login', { alertInfo: null })
   }
   signOutGoogle = async () => {
      await GoogleSignin.configure({
         webClientId: '232744567398-fclqsccnqab64tr6m727l69mpr7cmio8.apps.googleusercontent.com'
      });
      await GoogleSignin.signOut();
      await AsyncStorage.clear();
      this.props.navigation.navigate('Tab')
      this.setState({ user: null, loop: this.state.loop++ })
   }
   signOutFaceBook = async () => {
      await Settings.setAppID('4770259456354337');
      await Settings.initializeSDK()
      await LoginManager.logOut()
      await AsyncStorage.setItem("User", "")
      await AsyncStorage.setItem("UserLoggedAt", "")
      this.props.navigation.navigate('Tab')
      this.setState({ user: null, loop: this.state.loop++ })
   }
   render() {
      return (
         this.state.pageLoading ?
            <View style={styles.pageLoadingContainer}>
               <Image style={styles.pageLoadingImage} source={require('../../assets/loading/loading.gif')} />
               <Text style={styles.pageLoadingText}>sayfa yükleniyor..</Text>
            </View>
            :
            this.state.userLogged ?
               this.state.UserLoggedAt === 'google' ?
                  <View>
                     <Text style={{ color: 'white' }}>{this.state.user}</Text>
                     <Text style={{ color: 'white' }}>Giriş Yöntemi : {this.state.UserLoggedAt}</Text>
                     <TouchableOpacity onPress={this.signOutGoogle} style={{ marginTop: 50, alignSelf: 'center' }}><Text style={{ color: 'white' }}>Çıkış Yap</Text></TouchableOpacity>
                  </View>
                  :
                  <View>
                     <Text style={{ color: 'white' }}>{this.state.user}</Text>
                     <Text style={{ color: 'white' }}>Giriş Yöntemi : {this.state.UserLoggedAt}</Text>
                     <TouchableOpacity onPress={this.signOutFaceBook} style={{ marginTop: 50, alignSelf: 'center' }}><Text style={{ color: 'white' }}>Çıkış Yap</Text></TouchableOpacity>
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
      <SafeAreaView>
         <ScrollView contentContainerStyle={{flexGrow:1, justifyContent:'center'}} style={{width:'100%',height:'100%', backgroundColor:'black'}}>
            <ProfileView navigation={navigation}></ProfileView>
         </ScrollView>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   //pageloading styles
   pageLoadingContainer: { width: '100%', height: '100%', justifyContent: 'center', backgroundColor: 'black' },
   pageLoadingImage: { width: 150, height: 150, alignSelf: 'center' },
   pageLoadingText: { color: 'white', fontSize: 20, fontWeight: '600', alignSelf: 'center' },



   containerNotLogged: { backgroundColor: 'black', width: '100%', height: '100%', justifyContent: 'center' },
   notLoggedText: { color: 'white', fontSize: 20, alignSelf: 'center' },
   notLoggedButton: { marginTop: 50, borderRadius: 5, backgroundColor: '#ffa31a', padding: 10, width: '80%', alignSelf: 'center', justifyContent: 'center' },
   notLoggedButtonText: { fontSize: 18, alignSelf: 'center', color: 'black', fontWeight: '500' }
})
import * as React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/Ionicons';

class RegisterView extends React.Component {
   constructor(props) {
      super(props)
      this.state = {

      }
   }
   goBack = () => {
      this.props.navigation.goBack()
   }
   render() {
      return (
         <View style={styles.container}>
            <View style={styles.header}>
               <TouchableOpacity style={styles.backButton} onPress={this.goBack}><Icon name='chevron-back-outline' size={30} color={'#ffa31a'} /></TouchableOpacity>
               <Text style={styles.headerText}>Ücretsiz Kaydol</Text>
            </View>
            <View style={styles.logoView}>
               <Image style={styles.loginLogo} source={require('../../assets/logo/FH_LOGO.png')}></Image>
            </View>
         </View>
      )
   }

}


export default () => {
   const navigation = useNavigation()
   return (
      <RegisterView navigation={navigation}></RegisterView>
   )
}

const styles = StyleSheet.create({
   container: { backgroundColor: 'black', width: '100%', height: '100%' },
   header: { alignItems: 'center', justifyContent: 'center', padding: 20, flexDirection: 'row' },
   backButton: { position: 'absolute', left: 15 },
   headerText: { color: '#ffa31a', fontSize: 20, fontWeight: '600' },
   logoView: { justifyContent: 'center', marginTop: 5 },
   loginLogo: { alignSelf: 'center' },
})
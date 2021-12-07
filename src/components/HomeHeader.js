import * as React from 'react'
import { View, StyleSheet, Image } from 'react-native'

export default () => {
   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Image style={styles.headerLogo} source={require('../assets/logo/FH_LOGO.png')}></Image>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: { backgroundColor: 'black', width: '100%', height: '100%' },
   header: { justifyContent: 'center',flexDirection:'row'},
   headerLogo: {alignSelf: 'center' }
})


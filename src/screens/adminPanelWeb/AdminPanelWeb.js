import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import BackIcon from 'react-native-vector-icons/Ionicons';
import WebView from 'react-native-webview';

const styles = StyleSheet.create({
    profileEditContainer: { backgroundColor: 'black', width: '100%', height: '100%' },
    header: { alignItems: 'center', justifyContent: 'center', padding: 20, flexDirection: 'row' },
    backButton: { position: 'absolute', left: 15, top: 15 },
    headerTitle: { alignSelf: 'center', color: 'white', fontSize: 25, fontWeight: '700' },

})
export default ({ navigation }) => {
    return (
        <View style={styles.profileEditContainer}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}><BackIcon name='chevron-back-outline' size={35} color={'#BB86CC'} /></TouchableOpacity>
                <Text style={styles.headerTitle}>Admin Paneli</Text>
            </View>
            <WebView
                startInLoadingState={true}
                source={{ uri: 'https://falhub.com/staff/admin' }}
            >
            </WebView>
        </View>
    )
}
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import BackIcon from 'react-native-vector-icons/Ionicons';
import WebView from 'react-native-webview';



const styles = StyleSheet.create({
    profileEditContainer: { backgroundColor: 'black', width: '100%', height: '100%' },
    header: { alignItems: 'center', justifyContent: 'center', padding: 20, flexDirection: 'row' },
    backButton: { position: 'absolute', left: 15, top: 15 },
    headerTitle: { alignSelf: 'center', color: 'white', fontSize: 25, fontWeight: '700' },

    //pageloading styles
    pageLoadingContainer: { width: '100%', height: '100%', justifyContent: 'center', backgroundColor: 'black' },
    pageLoadingImage: { width: 150, height: 150, alignSelf: 'center' },
    pageLoadingText: { color: 'white', fontSize: 20, fontWeight: '600', alignSelf: 'center' },
})

export default ({ navigation }) => {
    return (
        <View style={styles.profileEditContainer}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}><BackIcon name='chevron-back-outline' size={35} color={'#ffa31a'} /></TouchableOpacity>
                <Text style={styles.headerTitle}>Beni Destekle</Text>
            </View>
            <WebView
                startInLoadingState={true}
                source={{ uri: 'https://www.bynogame.com/tr/destekle/mcanuzlas' }}
            >
            </WebView>
        </View>
    )
}
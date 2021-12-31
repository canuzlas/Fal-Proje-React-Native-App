import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import BackIcon from 'react-native-vector-icons/Ionicons';
import SendIcon from 'react-native-vector-icons/Feather';
import { firebase } from '@react-native-firebase/database';
import { ScrollView } from 'react-native-gesture-handler';

/*
const reference = firebase
.app()
.database('https://falhub-6c7a2-default-rtdb.europe-west1.firebasedatabase.app/')

reference.ref('/spchat/1').set({ title: 'help', data: 'anan' })

reference
.ref('/spchat/1')
.once('value')
.then(snapshot => {
   console.log('User data: ', snapshot.val());
});
*/

const styles = StyleSheet.create({
    profileEditContainer: { backgroundColor: 'black', width: '100%', height: '100%' },
    header: { alignItems: 'center', justifyContent: 'center', padding: 20, flexDirection: 'row' },
    backButton: { position: 'absolute', left: 15, top: 15 },
    headerTitle: { alignSelf: 'center', color: 'white', fontSize: 25, fontWeight: '700' },

    chatView: { alignSelf: 'center', width: '90%', height: '100%', borderRadius: 20 },
    chatSendView: { flexDirection: 'row', position: 'absolute', bottom: 100, padding: 25, alignSelf: 'center', backgroundColor: 'black', width: '95%', borderRadius: 20, borderColor: 'white', borderWidth: 1, justifyContent: 'center' },
    chatTextInput: { maxWidth: 250, width: 250, color: 'white', fontSize: 20, justifyContent: 'center', padding: 5, position: 'absolute', left: 20, alignSelf: 'center' },
    SendIcon: { position: 'absolute', alignSelf: 'center', right: 20 },

    chatScrolView: { width: '100%', height: '75%', position: 'absolute', top: 0, padding: 5 },
    chatScrolViewKeyboard: { width: '100%', height: '60%', position: 'absolute', top: 0, padding: 5 },
    sendedFromMe: { backgroundColor: 'black', maxWidth: '60%', alignSelf: 'flex-end', marginVertical: 3, borderRadius: 20, borderWidth: 1, borderColor: 'white' },
    sendedFromAdmin: { backgroundColor: 'black', maxWidth: '60%', marginVertical: 3, alignSelf: 'flex-start', borderRadius: 20, borderWidth: 1, borderColor: 'white' },
    sendedFromMeText: { color: 'white', justifyContent: 'center', paddingVertical: 15, paddingHorizontal: 10 },
    sendedFromAdminText: { color: 'white', justifyContent: 'center', paddingVertical: 15, paddingHorizontal: 10 }

})
export default ({ navigation }) => {
    const [messages, setMessages] = useState([])
    const [scrollView, setScrollView] = useState(null)
    const [text, setText] = useState(null)
    useEffect(() => {
    }, [])

    const renderMessage = (msg, i) => {
        return (
            <View style={{ paddingBottom: 5 }} key={i}>
                {msg.fromWho == 'user' ?
                    <View style={styles.sendedFromMe}>
                        <Text style={styles.sendedFromMeText}>{msg.message}</Text>
                    </View>
                    : <View style={styles.sendedFromAdmin}>
                        <Text style={styles.sendedFromAdminText}>{msg.message}</Text>
                    </View>
                }
            </View>
        )
    }
    return (
        <View style={styles.profileEditContainer}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}><BackIcon name='chevron-back-outline' size={35} color={'#ffa31a'} /></TouchableOpacity>
                <Text style={styles.headerTitle}>Canlı Destek</Text>
            </View>
            <View style={styles.chatView}>

                <ScrollView
                    ref={ref => { setScrollView(ref) }}
                    onContentSizeChange={() => scrollView.scrollToEnd({ animated: true })}
                    style={styles.chatScrolViewKeyboard}>

                    {messages.length != 0 ?
                        messages.map((message, i) => {

                            return (
                                renderMessage(message, i)
                            )
                        }) : null}

                </ScrollView>

                <View style={styles.chatSendView}>
                    <TextInput value={text} onChangeText={(txt) => { setText(txt) }} maxLength={100} style={styles.chatTextInput} placeholderTextColor={'white'} placeholder='Mesajını gir..'></TextInput>
                    <TouchableOpacity onPress={() => { setMessages(old => [...old, { message: text, fromWho: 'user' }]); setText(null) }} style={styles.SendIcon}><SendIcon name='send' size={25} color={'white'} /></TouchableOpacity>
                </View>

            </View>
        </View>
    )
}
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard, FlatList, Image } from 'react-native'
import BackIcon from 'react-native-vector-icons/Ionicons';
import SendIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/database';
import trDate from 'tr-date'
const date = new trDate()

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
    pageLoadingContainer: { width: '100%', height: '100%', justifyContent: 'center', backgroundColor: 'black' },
    pageLoadingImage: { width: 200, height: 200, alignSelf: 'center' },
    pageLoadingText: { color: 'white', fontSize: 20, fontWeight: '600', alignSelf: 'center' },

    profileEditContainer: { backgroundColor: 'black', width: '100%', height: '100%' },
    header: { alignItems: 'center', justifyContent: 'center', padding: 20, flexDirection: 'row' },
    backButton: { position: 'absolute', left: 15, top: 15 },
    headerTitle: { alignSelf: 'center', color: 'white', fontSize: 25, fontWeight: '700' },

    chatView: { alignSelf: 'center', width: '90%', height: '100%', borderRadius: 20 },
    chatSendView: { flexDirection: 'row', position: 'absolute', bottom: 100, padding: 25, alignSelf: 'center', backgroundColor: 'black', width: '95%', borderRadius: 20, borderColor: 'white', borderWidth: 1, justifyContent: 'center' },
    chatTextInput: { maxWidth: 250, width: 250, color: 'white', fontSize: 20, justifyContent: 'center', padding: 5, position: 'absolute', left: 20, alignSelf: 'center' },
    SendIcon: { position: 'absolute', alignSelf: 'center', right: 20 },

    chatScrolView: { width: '100%', height: '75%', position: 'absolute', top: 0, padding: 5 },
    chatScrolViewKeyboard: { width: '100%', height: '55%', position: 'absolute', top: 0, padding: 5 },
    sendedFromMe: { backgroundColor: 'black', maxWidth: '60%', alignSelf: 'flex-end', marginVertical: 3, borderRadius: 20, borderWidth: 1, borderColor: 'white' },
    sendedFromAdmin: { backgroundColor: '#ffa31a', maxWidth: '60%', marginVertical: 3, alignSelf: 'flex-start', borderRadius: 20, borderWidth: 1, borderColor: 'white' },
    sendedFromMeText: { color: 'white', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 10 },
    sendedFromAdminText: { color: 'black', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 10 },
    sendedFromAdminTime: { color: 'white', fontSize: 10, alignSelf: 'flex-end', paddingHorizontal: 10, paddingBottom: 5 }

})
export default ({ navigation }) => {
    const [user, setUser] = useState({})
    const [messages, setMessages] = useState([])
    const [scrollView, setScrollView] = useState(null)
    const [kbIsShow, setKbIsShow] = useState(false)
    const [text, setText] = useState(null)
    const [sendButton, setSendButton] = useState(false)
    let kbHide, kbShow
    useEffect(async () => {
        const User = JSON.parse(await AsyncStorage.getItem('User'))
        setUser(User)
        kbHide = Keyboard.addListener('keyboardDidHide', () => { setKbIsShow(false) })
        kbShow = Keyboard.addListener('keyboardDidShow', () => { setKbIsShow(true) })

        const reference = await firebase
            .app()
            .database('https://falhub-6c7a2-default-rtdb.europe-west1.firebasedatabase.app/')

        reference
            .ref('/spchat/' + User._id)
            .limitToLast(10)
            .on('value', snapshot => {
                setMessages([])
                snapshot.forEach(message => { setMessages(old => [...old, { message: message.val().message, fromWho: message.val().fromWho, time: message.val().time }]) })
            })

        return () => {
            kbHide.remove()
            kbShow.remove()
            setUser({})
            setMessages([])
            setScrollView(null)
            setKbIsShow(false)
            setText(null)
            setSendButton(false)
        }
    }, [])

    const renderMessage = ({ item, i }) => {
        return (
            <View style={{ paddingBottom: 5 }} key={i}>
                {item.fromWho == 'user' ?
                    <View style={styles.sendedFromMe}>
                        <Text style={styles.sendedFromMeText}>{item.message}</Text>
                        <Text style={styles.sendedFromAdminTime}>{item.time}</Text>
                    </View>
                    : <View style={styles.sendedFromAdmin}>
                        <Text style={styles.sendedFromAdminText}>{item.message}</Text>
                        <Text style={styles.sendedFromAdminTime}>{item.time}</Text>
                    </View>
                }
            </View>
        )
    }
    const sendMessage = async () => {
        const date = new trDate()
        const reference = await firebase
            .app()
            .database('https://falhub-6c7a2-default-rtdb.europe-west1.firebasedatabase.app/')
        reference.ref('/spchat/' + user._id).push({ fromWho: 'user', message: text, time: date.getClock() })
    }
    return (
        <View style={styles.profileEditContainer}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}><BackIcon name='chevron-back-outline' size={35} color={'#ffa31a'} /></TouchableOpacity>
                <Text style={styles.headerTitle}>Canlı Destek</Text>
            </View>
            <View style={styles.chatView}>

                {messages[0] !== undefined ?
                    messages[0].length != 0 ?
                        <FlatList
                            //ref={ref => { setScrollView(ref) }}
                            data={messages}
                            renderItem={renderMessage}
                            keyExtractor={(item, i) => i}
                            // onContentSizeChange={() => scrollView.scrollToEnd({ animated: true })}
                            // onLayout={() => scrollView.scrollToEnd({ animated: true })}
                            inverted
                            contentContainerStyle={{ flexDirection: 'column-reverse' }}
                            style={kbIsShow ? styles.chatScrolViewKeyboard : styles.chatScrolView}
                        >
                        </FlatList>

                        : <View style={styles.pageLoadingContainer}>
                            <Image style={styles.pageLoadingImage} source={require('../../assets/loading/loading.gif')} />
                        </View>
                    : <Text style={{ color: 'white', alignSelf: 'center' }}>Canlı destek için mesaj atabilirsin.</Text>}

                <View style={styles.chatSendView}>
                    <TextInput value={text} onChangeText={(txt) => { txt.length >= 1 ? setSendButton(true) : setSendButton(false); setText(txt) }} maxLength={100} style={styles.chatTextInput} placeholderTextColor={'white'} placeholder='Mesajını gir..'></TextInput>
                    {sendButton ? <TouchableOpacity onPress={() => { sendMessage(); setText(null) }} style={styles.SendIcon}><SendIcon name='send' size={25} color={'white'} /></TouchableOpacity> : null}
                </View>

            </View>
        </View>
    )
}
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View, ToastAndroid, PermissionsAndroid, Modal, Image } from 'react-native';
import * as Axios from 'axios'
import DeviceInfo from 'react-native-device-info'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel';
import BackIcon from 'react-native-vector-icons/Ionicons';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import RestartIcon from 'react-native-vector-icons/MaterialCommunityIcons';



const styles = StyleSheet.create({
    container: { backgroundColor: 'black', width: '100%', height: '100%' },
    // header
    header: { alignItems: 'center', justifyContent: 'center', padding: 20, flexDirection: 'row' },
    backButton: { position: 'absolute', left: 15 },
    headerText: { color: '#ffa31a', fontSize: 20, fontWeight: '600' },
    //cards
    cardsView: { alignSelf: 'center', position: 'absolute', bottom: 30 },
    cardsTitle: { color: 'white', fontSize: 18, alignSelf: 'center', marginBottom: 20 },
    //selectedCard
    selectedCardView: { flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center', padding: 20, width: '100%' },
    selectedCard: { backgroundColor: '#212121', height: 135, width: 82.3, justifyContent: 'center' },
    //button
    sendButtonView: { alignSelf: 'center', position: 'absolute', bottom: 80, justifyContent: 'center', width: '100%' },
    sendButton: { width: '50%', alignSelf: 'center', justifyContent: 'center', borderColor: 'white', borderWidth: 1, backgroundColor: 'black', padding: 20, borderRadius: 10 },
    sendButtonText: { color: 'white', fontSize: 22, alignSelf: 'center' }


})

export default ({ navigation }) => {
    const [user, setUser] = useState({})
    const [cards, setCard] = useState([])
    const [cardsVisible, setCardsVisible] = useState(true)
    const data = [
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
    ]

    useEffect(async () => {
        setUser(JSON.parse(await AsyncStorage.getItem('User')))

        return () => {

        }
    }, [])

    const selectCard = (index) => {
        if (cards.length == 2) {
            setCardsVisible(false)
            setCard(old => [...old, index])
        }else{
            setCard(old => [...old, index])
        }
    }

    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} onPress={() => { selectCard(index) }}>
                <View style={{ backgroundColor: 'white', height: 250 }}>
                    <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/tarot/tarotCard.png')}></Image>
                </View>
            </TouchableOpacity>
        );
    }

    let _carousel;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}><BackIcon name='chevron-back-outline' size={30} color={'#ffa31a'} /></TouchableOpacity>
                <Text style={styles.headerText}>Ücretsiz Tarot Falı</Text>
            </View>
            <View style={styles.selectedCardView}>
                <View style={styles.selectedCard}>
                    {cards.length >= 1 ? <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/tarot/tarotCard.png')}></Image> : <PlusIcon style={{ alignSelf: 'center' }} size={25} color={'black'} name='plus'></PlusIcon>}
                </View>
                <View style={styles.selectedCard}>
                    {cards.length >= 2 ? <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/tarot/tarotCard.png')}></Image> : <PlusIcon style={{ alignSelf: 'center' }} size={25} color={'black'} name='plus'></PlusIcon>}
                </View>
                <View style={styles.selectedCard}>
                    {cards.length == 3 ? <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/tarot/tarotCard.png')}></Image> : <PlusIcon style={{ alignSelf: 'center' }} size={25} color={'black'} name='plus'></PlusIcon>}
                </View>
            </View>
            {!cardsVisible ? <TouchableOpacity style={{ alignSelf: 'center', marginTop: 20 }} onPress={() => { setCard([]); setCardsVisible(true) }}><RestartIcon size={35} color={'white'} name='restart'></RestartIcon></TouchableOpacity> : null}
            {cardsVisible ?
                <View style={styles.cardsView}>
                    <Text style={styles.cardsTitle}>Seçtiğin kartın üzerine tıklaman yeterli.</Text>
                    <Carousel
                        layout={'default'}
                        ref={(c) => { _carousel = c; }}
                        data={data}
                        renderItem={_renderItem}
                        sliderWidth={250}
                        itemWidth={144.6}
                    />
                </View>
                :
                <View style={styles.sendButtonView}>
                    <TouchableOpacity style={styles.sendButton}><Text style={styles.sendButtonText}>Gönder</Text></TouchableOpacity>
                </View>
            }
        </View>

    )


}


import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import CoffeeIcon from 'react-native-vector-icons/Feather'

/* pages imports */
import LoginView from '../screens/login/LoginView'
import AppStartScreen from '../components/AppStartScreen'
import HomeView from '../screens/home/HomeView';
import AppAraScreen from '../components/AppAraScreen';
import ProfileView from '../screens/profil/ProfileView';
import RegisterView from '../screens/register/RegisterView';
import AstrologyView from '../screens/astrology/AstrologyView'
import CoffeeFal from '../screens/coffeeFal/CoffeeFal';
import EditProfile from '../screens/editProfile/EditProfile';
import Settings from '../screens/settings/Settings';
import Fallar from '../screens/fallar/Fallar';

/* components imports */
import HomeHeader from '../components/HomeHeader';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/*
import { View, Text } from 'react-native';
const deneme = () => {
  return (
    <View><Text>deneme</Text></View>
  )
}
*/

const TabNavigator = () => {

  return (
    <Tab.Navigator screenOptions={{
      headerText: { color: '#ffa31a', fontSize: 20, fontWeight: '600' },
      tabBarActiveTintColor: '#ffa31a',
      tabBarInactiveTintColor: 'white',
      tabBarStyle: { backgroundColor: 'black', borderTopWidth: 0 },
      headerStyle: { backgroundColor: 'black', shadowColor: 'transparent', height: 70 },
      headerTitleStyle: { color: '#ffa31a' },
      headerTitleAlign: 'center'
    }} initialRouteName='Home'>
      <Tab.Screen options={{ tabBarIcon: ({ color }) => <Icon name={'home'} color={color} size={30}></Icon>, tabBarLabel: 'Anasayfa', headerTitle: () => <HomeHeader></HomeHeader> }} component={HomeView} name='Home' />
      <Tab.Screen options={{ tabBarIcon: ({ color }) => <CoffeeIcon name={'coffee'} color={color} size={30}></CoffeeIcon>, tabBarLabel: 'Fallarım',headerTitle:'Fallarım' }} component={Fallar} name='Fal' />
      <Tab.Screen options={{ tabBarIcon: ({ color }) => <IconFontAwesome name={'moon-o'} color={color} size={30}></IconFontAwesome>, tabBarLabel: 'Astroloji' }} component={AstrologyView} name='Astroloji' />
      <Tab.Screen options={{ tabBarIcon: ({ color }) => <IconFontAwesome name={'user-o'} color={color} size={30}></IconFontAwesome>, tabBarLabel: 'Profil',headerShown:false }} component={ProfileView} name='Profil' />
    </Tab.Navigator>
  )
}

class Router extends React.Component {
  render() {
    return (
      <NavigationContainer > 
        <Stack.Navigator initialRouteName='AppStartScreen' screenOptions={{ headerShown: false }}>
          <Stack.Screen component={TabNavigator} name={'Tab'} />
          <Stack.Screen component={AppStartScreen} name={'AppStartScreen'} />
          <Stack.Screen component={AppAraScreen} name={'AppAraScreen'} />
          <Stack.Screen component={LoginView} name={'Login'} />
          <Stack.Screen component={RegisterView} name={'Register'}/>
          <Stack.Screen component={CoffeeFal} name={'CoffeFal'}/>
          <Stack.Screen component={EditProfile} name={'EditProfile'}/>
          <Stack.Screen component={Settings} name={'Settings'}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default Router

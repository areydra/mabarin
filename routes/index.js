import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import { BuyPremium, Chat, Events, Home, Login, MabarHistory, Maps, More, Profile, Register, SplashScreen } from '../screens'

import { Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

const HomeStack = createStackNavigator({
    Home, Events, BuyPremium, Maps, Chat
},{
    initialRouteName : 'Home',
    headerMode : 'none'
})

const MoreStack = createStackNavigator({
    More, Profile
},{
    initialRouteName: 'More',
    headerMode: 'none'
})

const AuthStack = createStackNavigator({
    Login, Register
},{
    initialRouteName: 'Login',
    headerMode: 'none'
})

const NavigationStack = createBottomTabNavigator({
   Home: HomeStack, 
   History : MabarHistory, 
   More : MoreStack
},{
    initialRouteName: 'Home',
    activeTintColor: '#FFFFFF',
    inactiveTintColor: '#FFFFFF',
    tabBarOptions: {
        style : {
            backgroundColor: 'white'
        },
        tabStyle: {
            width : width/3
        },
        labelStyle: {
            textAlign: 'center',
            fontSize: 10,
            fontWeight: 'bold',
        }
    }
})

const Router = createSwitchNavigator({
    NavigationStack, SplashScreen, AuthStack
},{
    initialRouteName: 'SplashScreen',
    headerMode: 'none'
})

export default createAppContainer(Router)
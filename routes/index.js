import React from 'react';

import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Icon} from 'native-base';

import {
  BuyPremium,
  Chat,
  Events,
  Home,
  Login,
  MabarHistory,
  Maps,
  More,
  Profile,
  Register,
  SplashScreen,
  EditProfile,
} from '../screens';

import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const HomeStack = createStackNavigator(
  {
    Home,
    Events,
    BuyPremium,
    Maps,
    Chat,
    Profile,
    EditProfile,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',

    navigationOptions: ({navigation}) => {
      let {routeName} = navigation.state.routes[navigation.state.index];
      let navigationOptions = {};

      if (routeName === 'Maps' || routeName === 'Chat') {
        navigationOptions.tabBarVisible = false;
      }

      return navigationOptions;
    },
  },
);

const MoreStack = createStackNavigator(
  {
    More,
  },
  {
    initialRouteName: 'More',
    headerMode: 'none',
  },
);

const AuthStack = createStackNavigator(
  {
    Login,
    Register,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const NavigationStack = createBottomTabNavigator(
  {
    HomeTab: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="MaterialCommunityIcons"
            name="home"
            style={{fontSize: 24, color: tintColor, marginTop: 5}}
          />
        ),
      },
    },
    MabarHistoryTab: {
      screen: MabarHistory,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="MaterialCommunityIcons"
            name="history"
            style={{fontSize: 24, color: tintColor, marginTop: 5}}
          />
        ),
      },
    },
    MoreTab: {
      screen: MoreStack,
      navigationOptions: {
        tabBarLabel: 'More',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="MaterialCommunityIcons"
            name="menu"
            style={{fontSize: 24, color: tintColor, marginTop: 5}}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'HomeTab',

    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: '#373737',
        borderTopWidth: 0,
      },
      tabStyle: {
        width: width / 3,
      },
      labelStyle: {
        textAlign: 'center',
        fontSize: 10,
      },
    },
  },
);

const Router = createSwitchNavigator(
  {
    NavigationStack,
    SplashScreen,
    AuthStack,
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
  },
);

export default createAppContainer(Router);

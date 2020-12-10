import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MyDonations from './screens/myDonations';

import WelcomeScreen from './screens/WelcomeScreen';
import { AppTabNavigator } from './components/AppTabNavigator'
import {AppDrawerNavigator} from './components/AppDrawerNavigator'
import BookDonateScreen from './screens/BookDonateScreen';
import RecieverScreen from './screens/RecieverScreen';
import NotificationScreen from './screens/NotificationScreen'

export default function App() {
  return (
    <AppContainer/>
  );
}


const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  DrawerTab:{screen: AppDrawerNavigator},
  BookDonateList:{screen:BookDonateScreen, navigationOptions:{headerShown:false}},
  RecieverDetails:{screen:RecieverScreen, navigationOptions:{headerShown:false}},
  MyDonations: {screen:MyDonations},
  Notifications: {screen:NotificationScreen},
})

const AppContainer =  createAppContainer(switchNavigator);

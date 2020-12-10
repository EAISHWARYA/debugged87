import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    FlatList,
    ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader'
import db from '../config';
import firebase from 'firebase';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './AppTabNavigator'
import {SideBar} from './SideBarMenu'
import SettingsScreen from '../screens/Settings'
import MyDonations from '../screens/myDonations'
import NotificationScreen from '../screens/NotificationScreen';

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    Notifications:{screen:NotificationScreen},
    Settings:{screen:SettingsScreen},
    Donations: {screen:MyDonations},
    Notifications:{screen:NotificationScreen},
},
    {contentComponent:SideBar},
    {initialRootName:"Home"
})
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

import {createStackNavigator} from 'react-navigation-stack';
import RecieverScreen from '../screens/RecieverScreen';
import BookDonateScreen from '../screens/BookDonateScreen';

const AppStackNavigator = createStackNavigator({
    BookDonateList:{screen:BookDonateScreen, navigationOptions:{headerShown:false}},
    RecieverDetails:{screen:RecieverScreen, navigationOptions:{headerShown:false}},
},
{initialRouteName:'BookDonateList'}
)
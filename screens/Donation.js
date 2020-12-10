import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, Button } from 'react-native';
import db from "../config"
import firebase from "firebase"
import SantaAnim from '../santa'

export default class DonationScreen {
    constructor() {
        this.state = {

        }
    }

    render() {
        return(
            <View>
                Hello, This is the Donation Screen!
            </View>
        )
    }
}
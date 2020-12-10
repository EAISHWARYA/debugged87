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
    ScrollView,
    Dimensions,
    Animated} from 'react-native';
import {ListItem, Card, ThemeConsumer} from 'react-native-elements'
import MyHeader from './MyHeader'
import db from '../config';
import firebase from 'firebase';
import SwipeListView from 'react-native-swipe-list-view';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

export default class SwipeableFlatlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications:this.props.notifications
        }
    }

    updateMarkAsRead = (notification) => {
        db.collection('Notifications').doc(notification.doc.id).update({
            notificationStatus:"read",
        })
    }

    swipeValueChange = (swipeData) => {
        var allNotifications = this.state.notifications;
        const {key, value} = swipeData;

        if (value < -Dimensions.get("window").width) {
            const newData = [...notifications];
            const previousIndex = notifications.findIndex(item=>item.key==key) 
            this.updateMarkAsRead(notifications[previousIndex]);
            newData.splice(previousIndex, 1);
            this.setState({
                notifications:newData,
            })
        }
    }

    renderItem = (data)=>(
        <Animated.View>
            <ListItem
            title={data.item.bookName}
            subtitle={data.item.messsage}
            leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            bottomDivider 
            ></ListItem>
        </Animated.View>
    )
    
    renderHiddenItem = () => (
        <View style = {styles.RowBack}>
            <View style = {[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style = {styles.backTextWhite}></Text>
            </View>
        </View>
    )

    render() {
        return(
            <View style = {styles.container}>
                    <SwipeListView 
                    disableRightSwipe
                    data = {this.state.notifications}
                    renderItem = {this.renderItem}
                    renderHiddenItem = {this.renderHiddenItem}
                    rightOpenValue = {-Dimensions.get("window").width}
                    previewRowKey = {"0"} 
                    previewOpenValue = {-40}
                    previewOpenDelay = {3000}
                    onSwipeValueChange = {this.swipeValueChange}
                    ></SwipeListView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
        fontWeight:'bold',
        fontSize:15
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#29b6f6',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100,
    },
    backRightBtnRight: {
        backgroundColor: '#29b6f6',
        right: 0,
    },
});
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
import {ListItem, Card} from 'react-native-elements'
import MyHeader from '../components/MyHeader'
import db from '../config';
import firebase from 'firebase';
import {SwipeableFlatlist} from '../components/swipeablleFlatlist';

export default class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID:firebase.auth().currentUser.email,
            notifications:[],
        }

        this.notificationRef = null;
    }

    getNotifications = () => {
        console.log(this.state.userID)
        this.notificationRef = db.collection('Notifications').where("notificationstatus", "==", "unread").where(this.state.userID, "==", "recieverID").onSnapshot(
            (snapshot) => {
                console.log("reached snapshot")
                var allNotifications = [];
                snapshot.docs.map((doc)=>{
                    var notification = doc.data();
                    notification["doc_id"] = doc.id;
                    allNotifications.push(notification);
                })

                this.setState({
                    notifications:allNotifications,
                })
                console.log(allNotifications);
            }
        )
    }

    componentDidMount() {
        this.getNotifications();
    }

    componentWillUnmount() {
        this.notificationRef();
    }

    keyExtractor = (item, index) => index.toString();
    renderItem = ( {item, i} ) =>(
        <ListItem
          key={i}
          title={item.book_name}
          subtitle={item.message}
          leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          bottomDivider
        />
      )

    render() {
        return(
            <View style = {{flex:1}}>
                <MyHeader title = "Notifications" navigation = {this.props.navigation}></MyHeader>
                <View>
                    {this.state.notifications.length == 0?(<View style = {{flex:1, justifyContent:'center', alignItems: 'center'}}>
                        <Text>Sadly, you dont have any notifications 😢</Text>
                    </View>):(
                        <SwipeableFlatlist allNotifications = {this.state.allNotifications}></SwipeableFlatlist>
                    )}
                </View>
            </View>
        )
    }
}
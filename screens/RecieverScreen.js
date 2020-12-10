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

export default class RecieverScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userID: firebase.auth().currentUser.email,
            recieverID: this.props.navigation.getParam('details')['UserID'],
            requestID: this.props.navigation.getParam('details')['RequestID'],
            bookName: this.props.navigation.getParam('details')['BookName'],
            reason: this.props.navigation.getParam('details')['Reason'],
            recieverName: '',
            recieverContact:'',
            recieverAdress:'',
            recieverRequestDocumentID:'',
        }
    }

    getRecieverDetails() {
        db.collection("Users").where("emailID", "==", this.state.recieverID).get()
        .then(snapshot=>{snapshot.forEach(doc=>{
            this.setState({
                recieverName:doc.data().firstName,
                recieverContact:doc.data().contact,
                recieverAdress:doc.data().address,
            })
        })})

        db.collection('Requests').where("requestID", "==", this.state.requestID).get()
        .then(snapshot=>{snapshot.forEach(doc=>{
            this.setState({
                recieverRequestDocumentID: doc.id
            })
        })})
    }

    updateBookStatus = () => {
        db.collection('Donations').add({
            BookName:this.state.bookName,
            RequestID:this.state.requestID,
            RecieverName:this.state.recieverName,
            DonorID:this.state.userID,
            RequestStatus: "Donor Interested",
        })

        this.getNotification();
    }

    componentDidMount() {
        this.getRecieverDetails();
        this.getUser
    }

    getNotification = () => {
        var message = "User " + this.state.recieverName + " wants to donate";
        db.collection('Notifications').add({
            "recieverID":this.state.recieverID,
            "donorID": this.state.userID,
            "requestID": this.state.requestID,
            "bookName": this.state.bookName,
            "date": firebase.firestore.FieldValue.serverTimestamp(),
            "notificationstatus":"unread",
            "message":message,
        })

        this.props.navigation.navigate('MyDonations')
    }

    render() {
        return(
            <View style = {{flex:0.3}}>

                <Card title = "Book Information" titleStyle = {{fontSize:20}}>
                    <Card><Text style = {{fontWeight:"bold"}}>Name:{this.state.bookName}</Text></Card>
                    <Card><Text style = {{fontWeight:"bold"}}>Reciever's Contact:{this.state.recieverContact}</Text></Card>
                    <Card><Text style = {{fontWeight:"bold"}}>Reciever's Address:{this.state.recieverAdress}</Text></Card>
                </Card>

            <View>
                {this.state.recieverID!=this.state.userID?(
                    <TouchableOpacity style = {styles.button} onPress = {()=>{this.updateBookStatus(); this.props.navigation.navigate('MyDonations')}}
                    ><Text>Donate</Text></TouchableOpacity>
                ):null}
            </View>

            </View>
        )
    }
}

var styles = StyleSheet.create({
    KeyboardStyle: {
      flex:1,
     justifyContent:'center',
     alignItems:'center'
    },
  
    subContainer: {
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    },
  
    textInput: {
      width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'#ffab91',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
    },
  
    button: {
      width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:30,
     shadowColor:'black',
     shadowOffset:{width:0, height:8}
    }
  
  })
import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'
import { Updates } from 'expo';


export default class BookRequestScreen extends Component{

  constructor() {
    super()
    this.state = {
      UserID: firebase.auth().currentUser.email,
      BookName:"",
      Reason:"",
      RequestID:"",
      RequestedBookName:"",
      bookStatus:"",
      DocID:"",
    }
  }

  publishRequest = async () => {
    var randomRequestId = Math.random().toString(36).substring(7);
    db.collection("Requests").add({
      UserID: this.state.UserID,
      BookName: this.state.BookName,
      Reason: this.state.Reason,
      RequestID: randomRequestId,
    })
    
    await this.getBookRequest()
    db.collection('Users').where("emailID", "==", this.state.UserID).get().then()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{db.collection('Users').doc(doc.id).update({
        bookRequestActive: true,
      })})
    })
  

    this.setState({
      BookName:"",
      Reason:"",
    })

    alert("Your Request Is Now Available To The Public.")
  }

  getBookRequest = () =>{
    var bookRequest = db.collection('requested_books').where("user_id", "==", this.state.UserID).get().then(
      (snapshot)=>{
        snapshot.forEach((doc)=>{if(doc.data().bookStatus!="recieved") {
          this.setState({
            RequestID:doc.data().request_id,
            RequestedBookName:doc.data().book_name,
            bookStatus: doc.data().book_status,
            DocID:doc.id,
          })
        }})
      }
    )
  }

  getBookRequestActive() {
    db.collection('Users').where("email_id", "==", this.state.UserID).onSnapshot(querySnapshot=>{
      querySnapshot.forEach((doc)=>{this.setState({
        bookRequestActive: doc.data().bookRequestActive,
        UserDocID: doc.id,
      })})
    })
  }


 
  render(){
    if (this.state.bookRequestActive) {
      return(
        <View style = {{flex:1, justifyContent: 'center'}}>
          <Text>Book Name</Text>
      <Text>{this.state.RequestedBookName}</Text>
      <Text>Book Status</Text>
      <Text>{this.state.bookStatus}</Text>
        </View>
      )
    }

    else  {
      return(
      <View style = {{flex:1}}>

<MyHeader title = "Donate Books" navigation={this.props.navigation}></MyHeader>
        <KeyboardAvoidingView style = {styles.KeyboardStyle}>
          <TextInput placeholder = "Book Name" style = {styles.textInput} onChangeText = {(text)=>{this.setState({
              BookName:text
          })  
          }} value = {this.state.BookName}></TextInput>

          <TextInput placeholder = "Reason" style = {styles.textInput} type = "multiline" numberOfLines = {8} onChangeText = {(text)=>{this.setState({
              Reason:text
          })  
          }} value = {this.state.Reason}></TextInput>
          
          <TouchableOpacity style = {styles.button} onPress = {this.publishRequest}>
            <Text>Request</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      </View>
    )
    }
    
  }
}

var styles = StyleSheet.create({
  KeyboardStyle: {
    flex:1,
   justifyContent:'center',
   alignItems:'center'
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
   marginTop:30
  }

})
        
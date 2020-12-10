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



export default class BookDonateScreen extends React.Component{

  constructor() {
    super();
    this.state = {
      requestList: [],
    }

    this.requestRef = null;
  }

  componentDidMount() {
    this.updateRequestList()
  }

  componentWillUnmount() {
    this.requestRef()
  }

  goToDetails = (item) => {
    console.log("i should navigate.")
    this.props.navigation.navigate("RecieverDetails", {'details': item})
  }

  updateRequestList = () => {
    this.requestRef = db.collection('Requests').onSnapshot((snapshot)=>{
      var requestBookList = snapshot.docs.map(doccument => doccument.data());
      this.setState({
        requestList: requestBookList,
      })
    })
  }

  keyExtractor = (item, index) => index.toString()
  renderItem = ({item, i}) => {
    return(
      <ListItem key = {i} title = {item.BookName} subtitle = {item.Reason} titleStyle = {{color:"black", fontWeight: "bold"}} rightElement = {
        <TouchableOpacity style = {styles.button} onPress = {()=>{this.goToDetails(item)}}><Text>View Content</Text></TouchableOpacity>
      } bottomDivider></ListItem>
    )
  }

  render(){
    return(
      <View style = {{flex:1}}>
        <MyHeader title = "Donate Books" navigation={this.props.navigation}></MyHeader>

        <View style = {{flex:1}}>
          {this.state.requestList.length === 0?(<View style = {styles.subContainer}><Text style = {{fontSize:20}}>Requested Books</Text></View>):
          (<FlatList keyExtractor = {this.keyExtractor} data = {this.state.requestList} renderItem = {this.renderItem}></FlatList>)}
        </View>


      </View>
    );
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
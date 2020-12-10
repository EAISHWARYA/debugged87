import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';

import db from '../config'

export default class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    }
  }


render() {
  return (
    <Header
      centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
      backgroundColor = "#eaf8fe"
      leftComponent = {<Icon name = "bars" type = "font-awesome" color = "#696969" onPress = {()=>{this.props.navigation.toggleDrawer()}}></Icon>}
      rightComponent = {<this.BellIconWithBadge {...this.props}/>}
    />
  );
}
  

getUnreadNotifications() {
  db.collection('Notifications').where("notificationStatus", "==", "unread").onSnapshot((snapshot) =>{
    var allUnread = snapshot.docs.map((doc)=>doc.data());
    this.setState({
      value:allUnread.length,
    })
  })
}

componentDidMount() {
  this.getUnreadNotifications()
}

BellIconWithBadge = props => {
  return(
    <View>
       <Icon name = "bell" type = "font-awesome" color = "#696969" size = {20} onPress = {()=>{this.props.navigation.navigate('Notifictions')}}></Icon>
       <Badge value = {this.state.value} containerStyle = {{position:"absolute", top:-4, right: -4}}></Badge>
    </View>
  )
}

}
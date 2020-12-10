import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, Button } from 'react-native';
import db from "../config"
import firebase from "firebase"
import SantaAnim from '../santa'

export default class LoginScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            logPassword: '',
            isModalVisible: "false",
            firstName: "",
            lastName: "",
            address: "",
            mobile: "",
            regEmail: "",
            username:"",
            confirmPassword:"",
            regPassword:"",
        }
    }

    showModal = ()=>{
        return(
            <Modal animationType = "fade" transparent = {true} visible = {this.state.isModalVisible} >
                <View style = {styles.ModalContainer}>
                    <ScrollView style = {{width:"100%",}}>
                        <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
                            <Text style = {styles.ModalTitle}>Registration Form</Text>

                            <TextInput style = {styles.TextInput} placeholder = {"First Name"} maxLength = {12} onChangeText = {(text)=>{
                                this.setState({
                                    firstName:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Last Name"} maxLength = {12} onChangeText = {(text)=>{
                                this.setState({
                                    lastName:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Adress"} maxLength = {30} onChangeText = {(text)=>{
                                this.setState({
                                    address:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Mobile Number"} maxLength = {12} onChangeText = {(text)=>{
                                this.setState({
                                    mobile:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Display Name"} maxLength = {12} onChangeText = {(text)=>{
                                this.setState({
                                    username:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Email"} maxLength = {25} onChangeText = {(text)=>{
                                this.setState({
                                    regEmail:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Password"}  onChangeText = {(text)=>{
                                this.setState({
                                    regPassword:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Confirm Password"} onChangeText = {(text)=>{
                                this.setState({
                                    confirmPassword:text
                                })
                            }}></TextInput>

                            <Button title = "Submit" style = {{backgroundColor: "green"}} 
                            onPress = {() => {this.signUp(this.state.regEmail, this.state.regPassword, this.state.confirmPassword)}}></Button>

                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }
    
    login = async (email, logPassword)=> {
        firebase.auth().signInWithEmailAndPassword(email, logPassword).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode)
          });

        this.props.navigation.navigate("Donate")
    }

    signUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
            return alert("password doesn't match\nCheck your password.")
        }else{
          firebase.auth().createUserWithEmailAndPassword(emailId, password)
          .then(()=>{
            db.collection('Users').add({
              firstName:this.state.firstName,
              lastName:this.state.lastName,
              contact:this.state.mobile,
              emailID:emailId,
              address:this.state.address
            })
            return alert(
                 'User Added Successfully',
                 '',
                 [
                   {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                 ]
             );
          })
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return alert(errorMessage)
          });
        }
      }

    changeModalVisibility(arg) {
        if (arg) {
            this.setState({isModalVisible:"true"})
        }

        else {
            this.setState({isModalVisible:"false"})
        }
        
    }


    render() {
        return(
            <View>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
    
            </View>
              {
                this.showModal()
              }
            <View style={{justifyContent:'center', alignItems:'center'}}>
             
              <Text style={styles.title}>Returning user? Log in here.</Text>
            </View>
            <View>
                <TextInput
                style={styles.loginBox}
                placeholder="abc@example.com"
                keyboardType ='email-address'
                onChangeText={(text)=>{
                  this.setState({
                    emailId: text
                  })
                }}
              />
              <TextInput
              style={styles.loginBox}
              secureTextEntry = {true}
              placeholder="enter Password"
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            />
            <TouchableOpacity
               style={[styles.button,{marginBottom:20, marginTop:20}]}
               onPress = {()=>{
                 this.login(this.state.emailId, this.state.password)
               }}
               >
               <Text style={styles.buttonText}>Login</Text>
             </TouchableOpacity>
          </View>
        </View>
        )
    }
}

var styles = StyleSheet.create({
    TextInput: {
        borderRadius: 5, borderwidth:3, width:200, height:50, marginTop: 50
    },

    ModalContainer: {
        alignItems:'center'
    },

    KeyboardAvoidingView: {
        alignItems:'center',
        borderWidth:10,
        borderRadius:10,
    }
})
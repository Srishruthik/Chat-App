import React, { Component, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  TextInput,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TouchableHighlight,
  Platform,
} from "react-native";
import * as firebase from "firebase";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
import "firebase/firestore";
import { firestore } from "firebase";

var uuid = require("react-native-uuid");

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendDetails: [], //friend account details
      userDetails: [], //current account details
      messageData: [], //chat messages,
      message: "",
    
    };
  
  }

  sendMessage = () => {
      let {friendDetails,userDetails,message} = this.state;
      const r = uuid.v4();

      const uniqueMsgID = r
     firestore().collection("Chat").doc(friendDetails.chatID).collection("Messages").add({
        msg:message.trim(),
        email:userDetails.email,
        TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        uniqueID:uniqueMsgID,
        sendTo:friendDetails.friendName
      
     }).then(() => {
         this.setState({
             message:""
         },() => {
          this.scrollView.scrollToEnd()
         })
         
     })
   



  };


  componentDidMount = () => {
    //update the {CURRENT} user to state
    if(this.scrollView.scrollToEnd() !== null){
      this.scrollView.scrollToEnd()
    }
  
    let current_user = firebase.auth().currentUser;
    this.setState({
      userDetails: current_user,
    });
  

    // update the {FRIEND} user to state
    let current_friend = this.props.route.params.chatData;
    this.setState({
      friendDetails: current_friend,
    },() => {
     
      firestore().collection("Chat").doc(this.state.friendDetails.chatID).collection("Messages") .orderBy("TimeStamp", "asc").onSnapshot(docs => {
        let chats = []
        docs.forEach(chat => {
            chats.push(chat.data())
        })
        this.setState({
            messageData:chats
        })
        
        
        this.scrollView.scrollToEnd()
    })
   
     
  


    })

 // console.log(this.state.friendDetails.chatID)
  




   


  };
 


  render() {

   
   
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {this.state.friendDetails.friendName}
          </Text>
        </View>
        
        <View style={styles.messagesContainer}>
        <ScrollView  style={{flex:1}} 
       ref={ref => {this.scrollView = ref}}
    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
        >
        {this.state.messageData.map((Chat) => {
      
        
    

            return(        
            <View style={this.state.userDetails.email === Chat.email ? styles.msgBox: [styles.msgBox,{alignSelf:"flex-start",backgroundColor:"#e6e9ed"}]  } key={Chat.uniqueID}>
                <Text style={styles.msgText}>{Chat.msg}</Text>
            </View>
            )
        })}
     
      

      </ScrollView>
        </View> 
       

        <SafeAreaView style={styles.textInputContainer}>
          <View style={{ flex: 3, justifyContent: "center" }}>
            <TextInput
              style={styles.textInput}
              value={this.state.message}
              onChangeText={(message) => this.setState({ message })}
              placeholder="Type Message"
              placeholderTextColor="black"
            />
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
          <TouchableOpacity style={{backgroundColor:null,width:deviceWidth/8,marginLeft:"15%"}}   onPress={this.sendMessage} disabled={!(this.state.message.trim())} >
            <FontAwesome
              name="send"
              size={deviceHeight/25}
              color="black"
              style={styles.iconSendMsg}
            />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
    
  }
  
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d46f4d",
    //app themes: #430c05, #d46f4d, #ffbf66, #00353f
  },
  headerContainer: {
    justifyContent: "center",
    backgroundColor: "#d46f4d",
    flex: 1,
  },
  messagesContainer: {
    flex: 6,
    backgroundColor: "#fff9f0",
    padding:"0.5%"
   
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: "#d46f4d",
    flexDirection: "row",
  },
  headerText: {
    color: "#430c05",
    textAlign: "center",
    fontSize: deviceHeight / 30,
    fontFamily: "Gill Sans",
  },
  textInput: {
    height: "50%",
    //  backgroundColor:'#fff',
    borderBottomWidth: 1,
    width: "90%",
    marginLeft: "2%",
    fontFamily: "Gill Sans",
    fontSize: deviceHeight / 40,
  },
  iconSendMsg: {
    alignSelf: "center",
    marginTop: "10%",
  },
  msgBox:{
    maxWidth:'60%',
   minWidth:'5%',
    height:'auto',
    width:'auto',
    backgroundColor:"#ffbf66",
    alignSelf:"flex-end",
    padding:'2%',
    borderRadius:10,
    marginTop:"1%"
   
      
  },
  msgText:{
    //  textAlign:'left'
    fontFamily: "Gill Sans",
    
  }
});
export default Chat;

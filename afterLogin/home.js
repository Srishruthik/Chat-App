import React, { Component, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
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
import react from "react";
var uuid = require("react-native-uuid");
let uniqueID_ = firebase.auth().currentUser;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: [],
      chatBox: [],
      text: "Hello",
      usersArr: [], //contains all the users in the firebase
      lastMsg: ""
    };
  }

  componentDidMount = () => {
    let user_details = firebase.auth().currentUser;
    //  console.log(user_details)
    this.setState({
      userDetails: user_details,
    });
    //  console.log(deviceHeight/7.5)

    firestore()
      .collection("Users")
      .doc(user_details.uid)
      .collection("Friends")
      .onSnapshot((docs) => {
        let chat = [];
        docs.forEach((user) => {
          chat.push(user.data());
        });

        this.setState({
          chatBox: chat,
        });
      });
  };





getLastMsgFromChat = (chat) => {
  
  
      firestore().collection("Chat").doc(chat.chatID).collection("Messages") .orderBy("TimeStamp", "asc").onSnapshot(docs => {
       
        let chatData = []
         docs.forEach(msg => {
            chatData.push(msg.data())
        })
        let lastMsg = (chatData.slice(-1)[0].msg)
        console.log(lastMsg)
        this.setState({lastMsg:lastMsg})
        
      
    })
  
   
   
   
}
  addFriendToFirebase = (email, name, friendUUID) => {
    //current user
    let unique = uuid.v4();
    const { userDetails } = this.state;
    let chat_ID = unique;

    let uniqueID = unique;
    firestore()
      .collection("Users")
      .doc(userDetails.uid)
      .collection("Friends")
      .doc(friendUUID)
      .set({
        friendName: name,
        friendID: uniqueID,
        TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        friendEmail: email,
        chatID: chat_ID,
      });

    //the {friend} user

    firestore()
      .collection("Users")
      .doc(friendUUID)
      .collection("Friends")
      .doc(userDetails.uid)
      .set({
        friendName: userDetails.displayName,
        friendID: uniqueID,
        TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        friendEmail: userDetails.email,
        chatID: chat_ID,
      });
  };

  validateFriend = (text) => {
    firestore()
      .collection("Users")
      .onSnapshot((docs) => {
        let users = [];
        docs.forEach((doc) => {
          users.push(doc.data());
        });
        this.setState({
          usersArr: users,
        });

        //  console.log(this.state.usersArr)

        let found = false;
        let email = "";
        let name = "";
        let friendUUID = "";
        for (let user of this.state.usersArr) {
          if (text === this.state.userDetails.email) {
            found = 1;
            break;
          }
          if (user.Email === text) {
            found = true;
            email = user.Email;
            name = user.Name;
            friendUUID = user.UniqueId;
          }
        }
        if (found === 1) {
          Alert.alert("You can't message your self!");
        } else if (found) {
          Alert.alert("User found");

          /*   console.log(name)
        console.log(email)
        console.log(friendUUID) */
          this.addFriendToFirebase(email, name, friendUUID);
        } else {
          Alert.alert(
            "Sorry! User is not found.  ",
            "Make sure that you have correct case so Test is different that test. This is due to security reasons. "
          );
        }
      });
  };

  addFriend = () => {
    Alert.prompt(
      "Add Friend",
      "Enter your friend's email to add that person to your friend list",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Add", onPress: (text) => this.validateFriend(text) },
      ]
    );
  };

  openChatMessage = (chat) => {
    // console.log(chat);
    this.props.navigation.navigate("Chat", { chatData: chat });
  };

   render() {
    //  console.log(this.state.userDetails)
    //console.log(this.state.chatBox)

    return (
      <View style={styles.container}>
        {this.state.chatBox.map((chat, chatID) => {
          // console.log(chat)
          return (
            <TouchableOpacity
              style={styles.chatBoxContainer}
              onPress={() => this.openChatMessage(chat)}
              key={chat.friendID}
              onLongPress={() => Alert.alert(
                  "Friend Details",
                  "Name: "+chat.friendName+"\n"+"Email: "+chat.friendEmail+"\n"+"Chat ID: "+chat.chatID+"\n"+"Friend ID: "+chat.friendID
              )}
            >
              <View style={styles.pfpConatiner}></View>
              <View style={styles.nameChatDetailsContainer}>
                <Text style={styles.friendNameText}>{chat.friendName}</Text>
              
                <Text style={styles.lastMsgText}> 
              {/*   {this.getLastMsgFromChat(chat)}  */}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <Ionicons
          onPress={this.addFriend}
          style={styles.circleContainer}
          name="add-circle-sharp"
          size={Platform.OS === "ios" ? deviceHeight / 9.5 : deviceHeight / 7.5}
          color="#d46f4d"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circleContainer: {
    borderRadius: 30,
    // width: Dimensions.get('window').width * 0.085,
    // height: Dimensions.get('window').width * 0.3,
    // backgroundColor:'#d46f4d',
    position: "absolute",
    alignSelf: "flex-end",
    bottom: "1%",
    right: "1%",
  },
  chatBoxContainer: {
    height: deviceHeight / 8,
    borderBottomWidth: 0.3,
    flexDirection: "row",
  },
  pfpConatiner: {
    flex: 1,
  },
  nameChatDetailsContainer:{
      flex:3,
      justifyContent: "center"

  },
  friendNameText:{
      fontWeight:'bold',
      fontSize:deviceHeight/35,
      fontFamily: "Arial",
  },
  lastMsgText:{
      color:'#757471',
      marginTop:'1%',
      fontFamily:"Gill Sans"
  }
});
export default Home;

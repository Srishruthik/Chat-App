import React, { Component } from "react";
import Spinner from 'react-native-loading-spinner-overlay';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView
} from "react-native";

//app themes: #430c05, #d46f4d, #ffbf66, #00353f
import * as firebase from 'firebase';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

var firebaseConfig = {
  apiKey: "AIzaSyBFuGvbeGCIzZPV0YLEf2EUb69moWNfkEY",
  authDomain: "chatapp-fc7f9.firebaseapp.com",
  projectId: "chatapp-fc7f9",
  storageBucket: "chatapp-fc7f9.appspot.com",
  messagingSenderId: "27820508879",
  appId: "1:27820508879:web:20970b8766ad37b678d9ba"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"shruthik.alle@gmail.com",
      password:"Test@123",
      loading:false
    };
  }
goToSignUpScreen = () => {
this.props.navigation.navigate("SignUp")

  }


  onLoginPress = () => {
    this.setState({loading:true})

    const {email,password} = this.state;
firebase.auth().signInWithEmailAndPassword(email,password)
.then(() => {
      this.setState({
        loading:false,
     })
  
  this.props.navigation.navigate("Home")

  })
  .catch((err) => {
  
Alert.alert(err.message)
console.log(err.message)

this.setState({
  loading:false,
})

  })

  }





  

disableButton = () => {
  if(this.state.email.trim() != "" && this.state.password.trim() !=""){
    return false;
  }else{
    return true
  }
}
  render() {
    if(this.state.loading){
      return (
      <View style={{flex:1,backgroundColor:'#ffbf66'}}>
         <Spinner
      visible={this.state.loading}
      textContent={'Loading...'}
      textStyle={{color:'white'}}
    />
      </View>)
  }else{
    return (
      <View style={{ flex: 1,backgroundColor:'#dac3a2' }}>
        <View style={styles.imageContainer}>
          <ImageBackground
          
          
            style={styles.imageContainer}
            imageStyle={styles.imageContainer}
          >


            <View style={styles.extraSpace}></View>
            <View style={styles.mainContainer}>
                <View style={styles.mainContainerBox}>
                   
                    <View style={styles.pfpBoxLogo}></View>
                    
                    <View style={styles.showMainTextContainer}>
                        <Text style={styles.descText}>Welcome Back!</Text>
                        
                    </View>
                    <View style={styles.showDetailsContainer}>
                        <Text style={styles.showDescText}>
                            Email
                        </Text>
                        <TextInput value={this.state.email} onChangeText={(text) => this.setState({email:text})} style={styles.textInputStyle} placeholder="Enter Email_" />

                        <View style={{height:'10%'}}></View>

                        <Text style={styles.showDescText}>
                            Password
                        </Text>
                        <TextInput style={styles.textInputStyle} placeholder="Enter Password_" value={this.state.password} onChangeText={(text) => this.setState({password:text})} />
                    </View>
                   
                   
                   
                  <TouchableOpacity  onPress={() => Alert.alert("Test")} >
                  
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  
                  </TouchableOpacity>
                   
                  
                   
                    <View style={{flex:0.2}}></View>
                    
                </View>
            </View>

          </ImageBackground>
          
        </View>
        <View style={{flex:0.5}}></View>
        <View style={{flex:1}}>
          <TouchableOpacity onPress={this.onLoginPress} style={styles.submitBtnContainer} disabled={this.disableButton()}>
          
            <Text style={styles.logInText}>Log In</Text>
          </TouchableOpacity>
        </View>
    <View style={{flex:0.5}}>
      <Text style={styles.createAccText}>Don't have an account? <Text onPress={this.goToSignUpScreen} style={[styles.createAccText,{color:"#d46f4d"}]}>Sign Up</Text></Text>
    </View>
      </View>
    );
  }
}}
const styles = StyleSheet.create({
  extraSpace: {
    flex: 2,
    //    backgroundColor:'red',
  },

  imageContainer: {
        height: 5 * (deviceHeight / 7),
        backgroundColor: "#ffbf66",
        // zIndex:1001,

      borderBottomLeftRadius:40,
      borderBottomRightRadius:40,
        shadowOffset:{
          height:1,
          width:1,
      },
      shadowOpacity:0.8,
      shadowRadius:30,
    

  },
  mainContainer:{
     // borderWidth:1,s
      flex:5,
     // backgroundColor:'white',
    justifyContent:'center',
  },
  mainContainerBox:{
      height:'115%',
      width:'90%',
      backgroundColor:'white',
      alignSelf:'center',
      shadowOffset:{
          height:0,
          width:1,
      },
      shadowOpacity:0.4,
      shadowRadius:20,
    borderRadius:10,
      backgroundColor:'#faf3e8',

      
  },
  pfpBoxLogo:{
      alignSelf:'center',
      height:'34%',
      width:'45%',
      backgroundColor:'#d46f4d',
    //  position:'absolute',
      marginTop:"-15%",
      borderRadius:10,
      shadowOffset:{
        height:4,
        width:3,
    },
    shadowOpacity:0.4,
    shadowRadius:20,
      
  },
  showMainTextContainer:{
      flex:1,
   //   backgroundColor:'red',
   justifyContent:'center',
    
  },
  showDetailsContainer:{
      flex:4,
      backgroundColor:'white',
    
     backgroundColor:'#faf1e4',
  },
  descText:{
      textAlign:'center',
      fontSize:deviceHeight/30,
      fontFamily:"Gill Sans"
  },
  textInputStyle:{
      height:"20%",
      width:"90%",
     // backgroundColor:'red',
      alignSelf:'center',
      borderRadius:10,
      borderWidth:1,
      padding:'1%'
  },
  showDescText:{
    marginLeft:'5%',
    marginBottom:5,
 
    fontSize:deviceHeight/50,
    fontFamily:"Gill Sans"
  },
  submitBtnContainer:{
    height:'55%',
    width:'50%',
    backgroundColor:'#D57101',
  
  //  borderWidth:1,
    borderRadius:40,
    alignSelf:"flex-end",
    marginRight:"5%",
    shadowOffset:{
      height:1,
      width:5,
  },
  shadowOpacity:0.45,
  shadowRadius:20,
  justifyContent:'center',
    
  },
  logInText:{
    color:'white',
    fontSize:deviceHeight/23,
    fontFamily:"Gill Sans",
    textAlign:'center',
  },
  forgotText:{
    textAlign:'right',
    marginRight:'5%',
    fontFamily:"Gill Sans",
    fontSize:deviceHeight/45,
  },
  createAccText:{
    textAlign:'center',
    fontSize:deviceHeight/50,
    fontFamily:"Gill Sans",
  }




});
export default SignIn;

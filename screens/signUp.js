import React, { Component } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import { firestore } from "firebase";
import Spinner from "react-native-loading-spinner-overlay";
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
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
//app themes: #430c05, #d46f4d, #ffbf66, #00353f

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      loading: false,
    };
  }
  disableButton = () => {
    if (
      this.state.name.trim() != "" &&
      this.state.password.trim() != "" &&
      this.state.email.trim() != ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  onCreateAccount = () => {
    this.setState({ loading: true });

    const { email, password, name } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        if (userCredentials.user) {
          userCredentials.user
            .updateProfile({
              displayName: name,
            })
            .then((s) => {
              this.setState({
                loading: false,
              });
              const userInfo = firebase.auth().currentUser;
              firestore().collection("Users").doc(userInfo.uid).set({
                Email: this.state.email.toLowerCase(),
                Name: name,
                TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                UniqueId: userInfo.uid,
              });

              this.props.navigation.navigate("Home");
            });
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        Alert.alert(err.message);
        console.log(err.message);
      });
  };

  goToSignInScreen = () => {
    this.props.navigation.navigate("SignIn");
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, backgroundColor: "#ffbf66" }}>
          <Spinner
            visible={this.state.loading}
            textContent={"Loading..."}
            textStyle={{ color: "white" }}
          />
        </View>
      );
    } else {
      return (
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: "#dac3a2" }}
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
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
                    <Text style={styles.descText}>Create an Account!</Text>
                  </View>
                  <View style={styles.showDetailsContainer}>
                    <Text style={styles.showDescText}>Enter Name</Text>
                    <TextInput
                      value={this.state.name}
                      onChangeText={(text) => this.setState({ name: text })}
                      style={styles.textInputStyle}
                      placeholder="Enter Name_"
                    />
                    <View style={{ height: "10%" }}></View>
                    <Text style={styles.showDescText}>Enter Email</Text>
                    <TextInput
                      value={this.state.email}
                      onChangeText={(text) => this.setState({ email: text })}
                      style={styles.textInputStyle}
                      placeholder="Enter Email"
                    />

                    <View style={{ height: "10%" }}></View>

                    <Text style={styles.showDescText}>Create Password</Text>
                    <TextInput
                      style={styles.textInputStyle}
                      placeholder="Enter Password_"
                      value={this.state.password}
                      onChangeText={(text) => this.setState({ password: text })}
                    />
                  </View>

                  <View style={{ flex: 0.75 }}></View>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={{ flex: 0.5 }}></View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.submitBtnContainer}
              disabled={this.disableButton()}
              onPress={this.onCreateAccount}
            >
              <Text style={styles.logInText}>Create Account</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.5 }}>
            <Text style={styles.createAccText}>
              Already Have an Account?{" "}
              <Text
                onPress={this.goToSignInScreen}
                style={[styles.createAccText, { color: "#d46f4d" }]}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      );
    }
  }
}
const styles = StyleSheet.create({
  extraSpace: {
    flex: 2,
    //    backgroundColor:'red',
  },

  imageContainer: {
    height: 5 * (deviceHeight / 7),
    backgroundColor: "#ffbf66",
    // zIndex:1001,

    borderRadius: 40,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 30,
  },
  mainContainer: {
    // borderWidth:1,s
    flex: 5,
    // backgroundColor:'white',
    justifyContent: "center",
  },
  mainContainerBox: {
    height: "115%",
    width: "90%",
    backgroundColor: "white",
    alignSelf: "center",
    shadowOffset: {
      height: 0,
      width: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    borderRadius: 10,
    backgroundColor: "#faf3e8",
  },
  pfpBoxLogo: {
    alignSelf: "center",
    height: "34%",
    width: "45%",
    backgroundColor: "#d46f4d",
    //  position:'absolute',
    marginTop: "-15%",
    borderRadius: 10,
    shadowOffset: {
      height: 4,
      width: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  showMainTextContainer: {
    flex: 1,
    //   backgroundColor:'red',
    justifyContent: "center",
  },
  showDetailsContainer: {
    flex: 4,
    backgroundColor: "white",

    backgroundColor: "#faf1e4",
  },
  descText: {
    textAlign: "center",
    fontSize: deviceHeight / 30,
    fontFamily: "Gill Sans",
  },
  textInputStyle: {
    height: "20%",
    width: "90%",
    // backgroundColor:'red',
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    padding: "1%",
  },
  showDescText: {
    marginLeft: "5%",
    marginBottom: 5,

    fontSize: deviceHeight / 50,
    fontFamily: "Gill Sans",
  },
  submitBtnContainer: {
    height: "55%",
    width: "90%",
    backgroundColor: "#D57101",

    //  borderWidth:1,
    borderRadius: 40,
    alignSelf: "flex-end",
    marginRight: "5%",
    shadowOffset: {
      height: 1,
      width: 5,
    },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    justifyContent: "center",
  },
  logInText: {
    color: "white",
    fontSize: deviceHeight / 40,
    fontFamily: "Gill Sans",
    textAlign: "center",
  },
  forgotText: {
    textAlign: "right",
    marginRight: "5%",
    fontFamily: "Gill Sans",
    fontSize: deviceHeight / 45,
  },
  createAccText: {
    textAlign: "center",
    fontSize: deviceHeight / 50,
    fontFamily: "Gill Sans",
  },
});

export default SignUp;

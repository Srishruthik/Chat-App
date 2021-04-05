import React, { Component } from 'react';
import {View,Text,Button} from "react-native"
import * as firebase from 'firebase';
class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
signOut = () => {
    firebase.auth().signOut().then(() => {
        this.props.navigation.navigate("SignIn")
      }).catch((error) => {
        // An error happened.
      });
      
}
    render() {
        return (
            <View style={{flex:1}}>
                <Button title="Sign Out" onPress={this.signOut}></Button>
            </View>
        );
    }
}

export default Settings;
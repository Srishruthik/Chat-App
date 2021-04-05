import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import SignIn from "./screens/signIn"
import SignUp from "./screens/signUp"
import Home from "./afterLogin/home"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Settings from "./afterLogin/settings"
import Chat from "./afterLogin/chat"
console.disableYellowBox = true
function tabScreen() {
  return (

    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{ tabBarBadge: 3 }} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>

  )
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignIn} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
        <Stack.Screen options={{
          headerShown: true, headerLeft: null, gestureEnabled: false, title: "Messages", headerStyle: {
            backgroundColor: '#d46f4d',
          },
        }} name="Home" component={tabScreen} />

    <Stack.Screen options={{ headerShown: false }} name="Chat" component={Chat} />  
      </Stack.Navigator>


    </NavigationContainer>
  );
}




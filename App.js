

import React, { Component } from 'react';
import { Text, View, Button, Platform,TextInput,StyleSheet } from 'react-native';

import DrawerNavigator from './navigator/DrawerNavigator';
import LoginScreen from './screens/Login';

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Appointment from './screens/Appointment'


import firebase from "firebase";
import { firebaseConfig } from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const AppSwitchNavigator = createSwitchNavigator({
  
  LoginScreen: LoginScreen,
  DrawerNavigator: DrawerNavigator
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default function App() {
  return <AppNavigator />;
}

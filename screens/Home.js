import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Alert
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,  
      photoUrl:this.props.photoUrl,
      email:this.props.email
    };
  }

  render() {
   
      return (
        <View style={styles.containerLight}>
          <SafeAreaView style={styles.droidSafeArea} />
         
          <View style={styles.screenContainer}>
            <View style={styles.profileImageContainer}>
          <Image source = {{uri:this.state.photoUrl}} style = {styles.profileImage}></Image>
          <Text style={styles.nameTextLight}>{this.state.name}</Text>
              <Text style={styles.nameTextLight}>{this.state.email}</Text>
               
            </View>
          
            <View style={{ flex: 0.3 }} />
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    
  }
}

const styles = StyleSheet.create({
 
  containerLight: {
    flex: 1,
    backgroundColor: "#00c2d1"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },

  screenContainer: {
    flex: 0.85
  },
  profileImageContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  profileImage: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70)
  },

  
  nameTextLight: {
    color: "#FFFFFF",
    fontSize: RFValue(20),
    fontWeight:'bold',
    fontFamily: "Bubblegum-Sans",
    marginTop: RFValue(10)
  },
 
});

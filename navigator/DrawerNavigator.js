import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from '../screens/Home';
import Appointment from '../screens/Appointment';
import Logout from '../screens/Logout';
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();


export default class DrawerNavigator extends Component{


renderhome = props =>{
  return <Home email = {this.props.navigation.getParam("email")}
  name = {this.props.navigation.getParam("name")}
  photoUrl = {this.props.navigation.getParam("photoUrl")}
  />
}


renderapp = props =>{
  return <Appointment email = {this.props.navigation.getParam("email")}
  name = {this.props.navigation.getParam("name")}
  photoUrl = {this.props.navigation.getParam("photoUrl")}
  />
}

logout = props =>{
  return <Logout navigation = {this.props.navigation.navigate("LoginScreen")}/>
}


render(){
  return(

  <NavigationContainer>
    <Drawer.Navigator>
    <Drawer.Screen name = "Home" component = {this.renderhome}/>
    <Drawer.Screen name = "Appointment" component = {this.renderapp}/>
    <Drawer.Screen name = "Logout" component = {this.logout}/>

    </Drawer.Navigator>
  </NavigationContainer>
  )
}

}

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';
import Products from './src/screens/Products';
import Register from './src/screens/Register';
import Premisess from './src/screens/Premisess';
import myPremisess from './src/screens/MyPremisess';
import addPremisess from './src/screens/AddPremisess';
import editPremisess from './src/screens/EditPremisess';
import { DrawerContent } from './src/screens/DrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
        <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="Login" component={Login}/>
        <Drawer.Screen name="Profile" component={Profile}/>
        <Drawer.Screen name="Products" component={Products}/>
        <Drawer.Screen name="Register" component={Register}/>
        <Drawer.Screen name="Premisess" component={Premisess}/>
        <Drawer.Screen name="myPremisess" component={myPremisess}/>
        <Drawer.Screen name="addPremisess" component={addPremisess}/>
        <Drawer.Screen name="editPremisess" component={editPremisess}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

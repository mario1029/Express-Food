import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/Home';
import Login from './src/screens/users/Login';
import Profile from './src/screens/users/Profile';
import Register from './src/screens/users/Register';
import Products from './src/screens/products/Products';
import MyProducts from './src/screens/products/MyProducts';
import AddProduct from './src/screens/products/AddProduct';
import EditProduct from './src/screens/products/EditProduct';
import Premisess from './src/screens/premises/Premisess';
import myPremisess from './src/screens/premises/MyPremisess';
import addPremisess from './src/screens/premises/AddPremisess';
import editPremisess from './src/screens/premises/EditPremisess';
import { DrawerContent } from './src/screens/DrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login" drawerContent={props => <DrawerContent {...props}/>}>
        <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="Login" component={Login}/>
        <Drawer.Screen name="Register" component={Register}/>
        <Drawer.Screen name="Profile" component={Profile}/>
        <Drawer.Screen name="Products" component={Products}/>
        <Drawer.Screen name="MyProducts" component={MyProducts}/>
        <Drawer.Screen name="AddProduct" component={AddProduct}/>
        <Drawer.Screen name="EditProduct" component={EditProduct}/>
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

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, Pressable,FlatList, TextInput, View } from 'react-native';

import {Card } from 'react-native-elements';

export default function Products({navigation}:any) {
  const addProduct = ()=>{

  }

  const Item = ( {nombre, descripcion, urifoto , precio}:any ) => (

      <View>
        <Card>
            <Card.Divider/>
              <Card.Title>{nombre}</Card.Title>
            <Card.Divider/>
            <Image
              style={styles.image}
              resizeMode="center"
              source={{ uri: urifoto }}
            />
            <Card.Divider/>
            <Text>Precio: {precio}$</Text>
            <Text>Descripcion: {descripcion}</Text>
            <View style={styles.buttonView}>
              <TouchableOpacity 
                  //onPress={submit}
                  style={styles.button}
                  >
                  <Text style={styles.buttonText}>+Añadir</Text>
              </TouchableOpacity>
            </View>
          </Card>
      </View>  
    );
  
    const renderItem = ({item}:any ) => (
      <Item 
        nombre={item.nombre}
        descripcion={item.descripcion}
        urifoto={item.urifoto}
        precio={item.precio}
      />    
    );


    const data= [
      {
          nombre:'Hambuerguesa 1',
          descripcion:'tiene queso',
          precio:110.3,
          urifoto:'https://www.hogar.mapfre.es/media/2018/09/hamburguesa-sencilla-1280x720.jpg'
      },
      {
        nombre:'Sopa 1',
        descripcion:'tiene tomate',
        precio:150.3,
        urifoto:'https://www.hogar.mapfre.es/media/2018/09/hamburguesa-sencilla-1280x720.jpg'
      },
      {
        nombre:'Ramen 1',
        descripcion:'tiene picante',
        precio:10.3,
        urifoto:'https://www.hogar.mapfre.es/media/2018/09/hamburguesa-sencilla-1280x720.jpg'
      },
    ];
  

  return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
            <Text style={styles.title}>Productos</Text>
        </View>
      <View style={styles.input}>
          <TextInput
          //style={styles.input}
          //onChangeText={setText}
          //value={text}
          placeholder={"Producto"}
          //onSubmitEditing={ ()=>search(text)}
          />
      </View>
      <View style={styles.list}>
        <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'space-between',
  },
  containerTitle: {
      padding: 10,
      //backgroundColor: "#AD20A5"
  },
  list: {
    width: '100%',
    flex:2
  },
  text:{
    color: 'black',
    fontSize: 15
  },
  input: {
    width:'80%',
    height: 40,
    margin: 20,
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
      color:'black',
      marginTop: 60,
      paddingVertical: 8,
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold"
    },
    image:{
      width: "100%",
      height: 125,
    },
    button:{
      backgroundColor:'cadetblue',
      padding: 7,
      marginTop: 10,
      width: 150,
    },
    buttonText:{
      color: 'white',
      fontSize: 20,
      textAlign: "center",
    },
    buttonView:{
      alignContent:'center',
      alignItems: 'center',
    }
});

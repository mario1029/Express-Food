import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, FlatList, Image } from 'react-native';
import {Card } from 'react-native-elements'

const Premisess= ({navigation}:any)=>{

    const data= [
    {
        titulo:'lobo 1',
        image:'https://th.bing.com/th/id/OIP.pD9m7CfeyptsBmHPkpbq9AHaD2?pid=ImgDet&rs=1'
    },
    {
        titulo:'lobo 2',
        image:'https://th.bing.com/th/id/OIP.pD9m7CfeyptsBmHPkpbq9AHaD2?pid=ImgDet&rs=1'
    },
    {
        titulo:'lobo 3',
        image:'https://th.bing.com/th/id/OIP.pD9m7CfeyptsBmHPkpbq9AHaD2?pid=ImgDet&rs=1'
    },
    {
        titulo:'lobo 3',
        image:'https://th.bing.com/th/id/OIP.pD9m7CfeyptsBmHPkpbq9AHaD2?pid=ImgDet&rs=1'
    }, {
        titulo:'lobo 3',
        image:'https://th.bing.com/th/id/OIP.pD9m7CfeyptsBmHPkpbq9AHaD2?pid=ImgDet&rs=1'
    }, {
        titulo:'lobo 3',
        image:'https://th.bing.com/th/id/OIP.pD9m7CfeyptsBmHPkpbq9AHaD2?pid=ImgDet&rs=1'
    },
    {
        titulo:'lobo 3',
        image:'https://th.bing.com/th/id/OIP.pD9m7CfeyptsBmHPkpbq9AHaD2?pid=ImgDet&rs=1'
    }, {
        titulo:'lobo 3',
        image:'https://th.bing.com/th/id/OIP.pD9m7CfeyptsBmHPkpbq9AHaD2?pid=ImgDet&rs=1'
    }, 
    ];

    const Item = ( {title, image, id, onRefresh}:any ) => (
        <Pressable
        onPress={()=>{navigation.navigate('Products')}}
        //onLongPress={()=>{console.log('funciona')}}
        >
           <View>
              <Card>
              <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: image }}
          />
                <Card.Divider/>
                <Card.Title>{title}</Card.Title>
                <Card.Divider/>
              </Card>
          </View>  
        </Pressable>
        );
      
        const renderItem = ({item}:any ) => (
          <Item title={item.titulo} image={item.image} />    
        );
    
    console.log(data)

    return(
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Establecimientos</Text>
            </View>
            <View style={styles.input}>
                <TextInput
                //style={styles.input}
                //onChangeText={setText}
                //value={text}
                placeholder={"Direccion"}
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
    )

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
      //borderColor: "#20232a",
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
      }
  });
  

export default Premisess;
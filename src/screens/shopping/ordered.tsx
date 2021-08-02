import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, Dimensions,RefreshControl, Image, ScrollView,FlatList, TextInput, View, TouchableOpacity } from 'react-native';

import {Card } from 'react-native-elements';
import { producto } from '../../interfaces/producto';
import { getProduct } from '../../utils/product.comm';

import MapView from 'react-native-maps';

export default function Ordered({navigation, route}:any) {
 
  const [productos,setProductos] = React.useState([{nombre:'', descripcion:'', precio:0, urlfoto:''}]);
  const [refresh, setRefresh]= React.useState(false);

  const loadProducts = async ()=>{
    //const products:producto[] = await getProduct(route.params.id);
    //setProductos(products);
    setRefresh(false);    
}

const onRefresh= ()=>{
  // setLoading(true)
  setRefresh(true);
  loadProducts(); 
 }

 useEffect(()=>{
  loadProducts(); 
}, [])
  const Item = ( {nombre, descripcion, urifoto , precio}:any ) => (
    
      <View>
        <Card>
            <Card.Divider/>
              <Card.Title>{nombre}</Card.Title>
            <Card.Divider/>
            {!urifoto?(<>
                    <Image
            style={{ width: "100%", height: 125 }}
            resizeMode="cover"
            source={require('../../assets/productos.jpg')}
          />
                            </>):
                            (<>
                                <Image
                        style={{ width: "100%", height: 125 }}
                        resizeMode="cover"
                        source={{uri:urifoto}}
                      />
                                        </>)}
            <Card.Divider/>
            <Text>Precio: {precio}$</Text>
            <Text>Descripcion: {descripcion}</Text>
            <View style={styles.buttonView}>
              
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

  return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
            <Text style={styles.title}>Ordenado:</Text>
        </View>
      <View style={styles.list}>
        <View style={styles.buttonView}>
              <TouchableOpacity 
                  onPress={()=>navigation.navigate('Tracking')}
                  style={styles.button}
                  >
                  <Text style={styles.buttonText}>Mapa</Text>
              </TouchableOpacity>
        </View>
        <FlatList
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
        data={productos}
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
    },
    checkout:{
        backgroundColor:'cadetblue',
        padding: 7,
        width: 150,
        marginBottom:40,
    },
    total:{
        color:'black',
        marginBottom:10,
        paddingVertical: 8,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
});

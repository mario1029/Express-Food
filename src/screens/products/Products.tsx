import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity,RefreshControl, Image, Pressable,FlatList, TextInput, View, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card } from 'react-native-elements';
import { Product } from '../../interfaces/Product';
import { getListProduct } from '../../utils/product.comm';
import { insertOrderProduct, newOrder } from '../../utils/order.comm';

export default function Products({navigation, route}:any) {
 
  const [productos,setProductos] = React.useState([{nombre:'', descripcion:'', precio:0, urlfoto:''}]);
  const [refresh, setRefresh]= React.useState(false);
  const [visible, setVisible]= React.useState(false);
  const [cantidad, setCantidad]= React.useState("");
  const [id, setID]= React.useState(0);

  const loadProducts = async ()=>{
    const products:Product[] = await getListProduct(route.params.id);
    setProductos(products);
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

const insertProductOrder = async({id, cantidad}:{id:number, cantidad:number})=>{
  let order= await AsyncStorage.getItem('order');
  if(!order){
    const result = await newOrder();
    console.log(result)
    if(result.status==200){
      await AsyncStorage.setItem('order', result.order.idPedido.toString());
      order= await AsyncStorage.getItem('order');
    }
    else if (result.status==400){
      Alert.alert("Su sesion ha finalizado, vuelva a ingresar");
      navigation.navigate('Login');
    }else{
      Alert.alert("Su sesion ha finalizado, vuelva a ingresar");
      navigation.navigate('Home');
    }
  }
  const resultInsert= await insertOrderProduct({idPedido:+order, idProducto:id, cantidad:cantidad});
  if(resultInsert.status==200){
    Alert.alert('producto ingresado en el pedido')
  }else if(resultInsert.status==400){
    Alert.alert("Su sesion ha finalizado, vuelva a ingresar");
    navigation.navigate('Login');
  }else{
    Alert.alert("Ha ocurrido un error", "Posiblemente el producto que trata de ingresar ya se encuentra en su carrito");
    navigation.navigate('Cart');
  }
  console.log(cantidad, id);
  setVisible(false);
}
  const Item = ( {nombre, descripcion, urifoto , precio, id}:any ) => (

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
              <TouchableOpacity 
                  onPress={()=>{
                    setVisible(true);
                    setID(id)
                  }}
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
        id={item.id_producto}
      />    
    );

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
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
        data={productos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        />
        </View>
        <View>
          <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setVisible(!visible);
                }}
            >
              <View style={styles.modalView}>
                <Text style={styles.title}> Elige la cantidad del producto</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setCantidad}
                  value={cantidad}
                  placeholder="Cantidad"
                  autoCompleteType="off"
                  keyboardType="numeric"
                  textAlign="center"
                />
                <TouchableOpacity 
                    onPress={()=>{
                      insertProductOrder({id:id, cantidad:+cantidad});
                      setCantidad(null);
                    }}
                    style={styles.buttonAdd}
                >
                  <Text style={styles.buttonText}>Entendido</Text>
                </TouchableOpacity>
              </View>
            </Modal>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonAdd:{
    backgroundColor:'#32BB14',
    padding: 7,
    width: 250,
    marginBottom:15,
  },
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

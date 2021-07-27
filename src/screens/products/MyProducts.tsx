import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, Alert, RefreshControl, TouchableOpacity, Image, Pressable,FlatList, TextInput, View } from 'react-native';

import {Card } from 'react-native-elements';
import { producto } from '../../interfaces/producto';
import { deleteProduct, getMyProduct } from '../../utils/product.comm';

export default function Products({navigation, route}:any) {

  const [productos,setProductos] = React.useState([{nombre:'', descripcion:'', precio:0, urlfoto:''}]);
  const [refresh, setRefresh]= React.useState(false);

  const loadProducts = async ()=>{
    const products:producto[] = await getMyProduct(route.params.id);
    
    setProductos(products);
    setRefresh(false);
 //   setLoading(false);
    
}

const onRefresh= ()=>{
  // setLoading(true)
  setRefresh(true);
  loadProducts(); 
 }

 useEffect(()=>{
  loadProducts(); 
}, [])

  const addProduct = ()=>{
    navigation.navigate('AddProduct', {id:route.params.id});
  }

  const deleteProducto = (id:number)=>{
    deleteProduct(id);
    onRefresh();
    console.log("borrar product")
  }

  const editProduct= (data:any)=>{
    navigation.navigate('EditProduct', {data});
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
                  onPress={()=>{deleteProducto(id)}}
                  style={styles.buttonDelete}
                  >
                  <Text style={styles.buttonText}>Borrar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                  onPress={()=>{editProduct({nombre, descripcion, urifoto , precio})}}
                  style={styles.buttonEdit}
                  >
                  <Text style={styles.buttonText}>Editar</Text>
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
            <Text style={styles.title}>Mis Productos</Text>
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
      <TouchableOpacity 
                  onPress={addProduct}
                  style={styles.buttonAdd}
                  >
                  <Text style={styles.buttonText}>Añadir Nuevo</Text>
              </TouchableOpacity>
      <View style={styles.list}>
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
    buttonEdit:{
      backgroundColor:'#93B417',
      padding: 7,
      marginTop: 10,
      width: 150,
    },
    buttonDelete:{
        backgroundColor:'#E32727',
        padding: 7,
        marginTop: 10,
        width: 150,
      },
      buttonAdd:{
        backgroundColor:'#32BB14',
        padding: 7,
        width: 250,
        marginBottom:15,
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

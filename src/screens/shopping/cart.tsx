import { CardField, useStripe, useConfirmPayment, } from '@stripe/stripe-react-native';
import React, {useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, Alert ,FlatList, TextInput, View, Modal, RefreshControl, Button, } from 'react-native';
import WebView from 'react-native-webview'
import {Card } from 'react-native-elements';
import { deleteOrderProduct, getOrderDetail, approvedPayment, deprecatedPayment, invoiceOrder, payOrder, terminateOrder } from '../../utils/order.comm';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart({navigation}:any) {
 
  const [productos,setProductos] = React.useState([{id:0, producto:'', cantidad:0, precio:0, precioTotal:0}]);
  const [refresh, setRefresh]= React.useState(false);
  const [total, setTotal]= React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalDowland, setModalDowland] = React.useState(false);
  const [uri, setUri] = React.useState('');
  const [cardDetails, setCardDetails] = React.useState(CardField.arguments);
  const { confirmPayment, loading } = useConfirmPayment();
  
    const handlePayPress = async () => {
      const id= await AsyncStorage.getItem('order');
      if (!cardDetails?.complete) {
        Alert.alert("Debe de ingresar todos los detalles de la tarjeta");
        return;
      }
      try {
        const { status ,client, error } = await payOrder(+id);
        if(status==400){
          Alert.alert("Notificacion","inicie sesion");
        }else if(status==200){
          const { paymentIntent, error } = await confirmPayment(client.client, {
            type: "Card",
          });
          if (error) {
            Alert.alert("Payment Error", `${error.message}`);
            const pago= await deprecatedPayment(client.idPago);
            console.log(pago);
          } else if (paymentIntent) {
            const pago= await approvedPayment(client.idPago);
            const factura=await invoiceOrder(+id);
            if(factura.status==200){
              setModalVisible(false);
              setModalDowland(true);
              const usuario=await AsyncStorage.getItem('login')
              setUri(`https://expressfoodserver.herokuapp.com/views/${usuario}_Invoice${id}.pdf`);
              console.log("Payment successful ", paymentIntent);
              console.log(pago); 
              await terminateOrder(+id);
              await AsyncStorage.removeItem('order');
              setProductos(null);
              setTotal(null)
            }else{
              Alert.alert("Notificacion", "El pago ha ocurrido correctamente, pero se genero un error en la factura")
            }
                       
          }
        }
        else{
          console.log(error);
        }
      } catch (e) {
        console.log(e);
      }
    };

  const loadProducts = async ()=>{
    const idOrder = await AsyncStorage.getItem('order');
    if(idOrder){
      const products = await getOrderDetail(+idOrder);
      console.log(products)
      setProductos(products.order);
      let total=0;
      products.order.forEach((rows)=>{
        total+=+rows.precioTotal;
        console.log(total, rows.precioTotal)
      });
      const usuario=await AsyncStorage.getItem('login')
      console.log(usuario);
      console.log(total)
      setTotal(total);
    }else{
      setProductos(null);
      setTotal(null);
      Alert.alert('Notificacion','No hay un pedido actualmente');
      navigation.navigate('Premisess')
    }
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

const deleteProduct = async(id:number)=>{
  const idOrder = await AsyncStorage.getItem('order');
  console.log(idOrder, id)
  deleteOrderProduct({idPedido:+idOrder, idProducto:id});
  onRefresh();
}
  const Item = ( {id, nombre, cantidad, precio, precioTotal}:any ) => (

      <View>
        <Card>
            <Card.Divider/>
              <Card.Title>{nombre}</Card.Title>
            <Card.Divider/>
              <Image
                style={{ width: "100%", height: 125 }}
                resizeMode="cover"
                source={require('../../assets/productos.jpg')}
              />
            <Card.Divider/>
            <Text>Precio Unitario: {precio}$</Text>
            <Text>cantidad: {cantidad}</Text>
            <Text>Total: {precioTotal}</Text>
            <View style={styles.buttonView}>
              <TouchableOpacity 
                  onPress={()=>deleteProduct(id)}
                  style={styles.button}
                  >
                  <Text style={styles.buttonText}>+Borrar</Text>
              </TouchableOpacity>
            </View>
          </Card>
      </View>  
    );
  
    const renderItem = ({item}:any ) => (
      <Item 
        id={item.idProducto}
        nombre={item.producto}
        cantidad={item.cantidad}
        precio={item.precio}
        precioTotal={item.precioTotal}
      />    
    );

  return (
    <View style={styles.container}>
        <View style={styles.containerTitle}>
            <Text style={styles.title}>Tu carrito</Text>
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
        <Text style={styles.total}>Total: {total}$</Text>
        <View style={styles.buttonView}>
              <TouchableOpacity 
                  onPress={()=>setModalVisible(true)}
                  style={styles.checkout}
                  >
                  <Text style={styles.buttonText}>+Pagar</Text>
              </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.title}>Pago</Text>
            <CardField
                postalCodeEnabled={true}
                placeholder={{
                number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
                borderRadius:10,
                borderColor:'black',
                borderWidth:2
                }}
                style={{
                width: '105%',
                height: 50,
                marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                    setCardDetails(cardDetails);
                    console.log(cardDetails)
                }}
                onFocus={(focusedField) => {
                console.log('focusField', focusedField);
                }}
            />
            <TouchableOpacity
                onPress={()=>setModalVisible(false)}
                style={styles.button}
            >
                <Text>Cancelar</Text>
            </TouchableOpacity>
            <Button onPress={handlePayPress} title="Pagar" disabled={loading} />
          </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDowland}
        onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalDowland(!modalDowland);
        }}
      >
      <View style={styles.modalView}>
        <Text style={styles.title}>Payment Successful</Text>
        <Text style={styles.text}>Pago realizado exitozamente, se le ha enviado una actura del mismo</Text>
        <TouchableOpacity 
            onPress={()=>{setModalDowland(false); onRefresh()}}
            style={styles.buttonAdd}
        >
          <Text style={styles.buttonText}>Entendido</Text>
        </TouchableOpacity>
        <WebView
          source={{uri:uri}}
        />
      </View>
    </Modal>
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
    }
});

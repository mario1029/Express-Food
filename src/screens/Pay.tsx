import { CardField, useStripe, useConfirmPayment, } from '@stripe/stripe-react-native';
import React, {useEffect} from 'react';
import { StyleSheet, Text, Modal, Alert, RefreshControl, Button,TouchableOpacity, Image, Pressable,FlatList, TextInput, View } from 'react-native';
import { approvedPayment, deprecatedPayment, invoiceOrder, payOrder } from '../utils/order';
import WebView from 'react-native-webview'
const pay= ({navigation}:any)=>{

    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalDowland, setModalDowland] = React.useState(false);
    const [uri, setUri] = React.useState('');
    const [cardDetails, setCardDetails] = React.useState(CardField.arguments);
    const { confirmPayment, loading } = useConfirmPayment();
    
      const handlePayPress = async () => {
        if (!cardDetails?.complete) {
          Alert.alert("Debe de ingresar todos los detalles de la tarjeta");
          return;
        }
        try {
          const { status ,client, error } = await payOrder(1);
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
              const factura=await invoiceOrder(1);
              if(factura.status==200){
                setModalVisible(false);
                setModalDowland(true);
                setUri('https://expressfoodserver.herokuapp.com/views/josemartinjr22@gmail.com_Invoice1.pdf');
                console.log("Payment successful ", paymentIntent);
                console.log(pago); 
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

    return(
        <View style= {styles.container}>
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
                        style={styles.buttonDelete}
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
                    onPress={()=>{setModalDowland(false)}}
                    style={styles.buttonAdd}
                >
                  <Text style={styles.buttonText}>Entendido</Text>
                </TouchableOpacity>
                <WebView
                  source={{uri:uri}}
                />
              </View>
            </Modal>
            <View>
                <TouchableOpacity 
                    onPress={()=>{setModalVisible(true)}}
                    style={styles.buttonEdit}
                    >
                    <Text style={styles.buttonText}>Pagar</Text>
                </TouchableOpacity>
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
        justifyContent: 'center',
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
    modalContainer:{
      backgroundColor: "black",
      alignItems: "center",
      justifyContent: 'center',
      opacity:0.5,
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

  export default pay;
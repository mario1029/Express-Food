import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
const editPremisess= ({navigation}:any)=> {
  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.title}>Editar establecimiento</Text>
        </View>
        <View>
            <Text style={styles.text}>Nombre</Text>
            <TextInput
                style={styles.input}
                placeholder="ingrese un nombre para el establecimiento"
                autoCompleteType="name"
                keyboardType="default"
                textAlign="center"
            />
            <Text style={styles.text}>Correo</Text>
            <TextInput
                style={styles.input}
                placeholder="ingrese un correo"
                autoCompleteType="email"
                keyboardType="email-address"
                textAlign="center"
            />
            <Text style={styles.text}>Direccion</Text>
            <TextInput
                style={styles.input}
                placeholder="ingrese la direccion"
                keyboardType="default"
                textAlign="center"
            />
            <Text style={styles.text}>Numero (Opcional)</Text>
            <TextInput
                style={styles.input}
                placeholder="ingrese un Numero para contactarlos"
                autoCompleteType="tel"
                keyboardType="numeric"
                textAlign="center"
            />
            <Text style={styles.text} >Pagina web (Opcional)</Text>
            <TextInput
                style={styles.input}
                placeholder="ingrese la url de su pagina web"
                keyboardType="default"
                textAlign="center"
            />
        </View>
        {/* fotos */}
        <View >
            <TouchableOpacity 
                //onPress={submit}
                onPress={()=>{navigation.navigate('myPremisess')}}
                style={styles.button}
                >
                <Text style={styles.buttonText}>Actualizar</Text>
            </TouchableOpacity>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 50,
  },
  containerInter: {
    backgroundColor: '#AD20A5',
    justifyContent: 'space-between',
  },
  text:{
    color: 'black',
    fontSize: 20
  },
  logo:{
    height:200,
    width:200,
    margin:15
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
  title: {
      marginTop: 16,
      paddingVertical: 8,
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold"
    },
    input: {
      height: 40,
      borderWidth: 2,
      backgroundColor: '#ffffff',
      fontSize: 20,
      borderRadius: 15,
    },
    conteinerTop:{
      backgroundColor: '#AD20A5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    conteinerHigh:{
      backgroundColor: '#AD20A5',
      alignItems: 'center',
      marginBottom: 30,
    },
    content:{
      height: 240,
      borderWidth: 2,
      backgroundColor: '#ffffff',
      fontSize: 20,
    },
});

export default editPremisess;
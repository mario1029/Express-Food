import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
export default function Login() {
  
  const submit = ()=>{

  }
  
  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.title}>Inicio de Sesion</Text>
        </View>
        <View >
            <Text style={styles.text}>Correo</Text>
            <TextInput
                style={styles.input}
                placeholder="algo@gmail.com"
                autoCompleteType="email"
                keyboardType="email-address"
                textAlign="center"
            />
            <Text style={styles.text} >Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="**********"
                autoCompleteType="password"
                keyboardType="default"
                textAlign="center"
            />
        </View>
        <View >
            <TouchableOpacity 
                //onPress={submit}
                style={styles.button}
                >
                <Text style={styles.buttonText}>Iniciar Sesion</Text>
            </TouchableOpacity>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
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
      width:250,
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

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { register } from '../../utils/user.comm';

export default function App({navigation}:any) {
    const [nombre, setNombre] = React.useState("");
    const [pass, setPass] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [numero, setNumero] = React.useState("");
    const [direccion, setDireccion] = React.useState("");

    const submit = async ()=>{
        console.log('Se envia el registro con',nombre, pass, email)
        const result= await register({
            nombre:nombre,
            correo:email,
            contrasenia:pass,
            numero:numero,
            direccion:direccion
        })
        if(result.status==200){
            Alert.alert("Notificacion",result.message)
            navigation.navigate('Login');
        }else if(result.status==400){
            Alert.alert("Error de credenciales", result.error.msg)
        }else if(result.status==500){
            Alert.alert(result.message, "Posiblemente el correo que esta intentando usar ya se encuentre siendo utilizado")
        }

    }
  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.title}>Registro</Text>
        </View>
        <View>
            <Text style={styles.text}>Correo</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="ingrese un correo"
                autoCompleteType="email"
                keyboardType="email-address"
                textAlign="center"
            />
            <Text style={styles.text}>Nombre</Text>
            <TextInput
                style={styles.input}
                onChangeText={setNombre}
                value={nombre}
                placeholder="ingrese su nombre"
                autoCompleteType="name"
                keyboardType="default"
                textAlign="center"
            />
            <Text style={styles.text}>Numero (Opcional)</Text>
            <TextInput
                style={styles.input}
                onChangeText={setNumero}
                value={numero}
                placeholder="ingrese su Numero"
                autoCompleteType="tel"
                keyboardType="numeric"
                textAlign="center"
            />
            <Text style={styles.text}>Direccion</Text>
            <TextInput
                style={styles.input}
                onChangeText={setDireccion}
                value={direccion}
                placeholder="ingrese su direccion"
                keyboardType="default"
                textAlign="center"
            />
            <Text style={styles.text} >Contraseña</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPass}
                value={pass}
                secureTextEntry={true}
                placeholder="ingrese su Contraseña"
                autoCompleteType="password"
                keyboardType="default"
                textAlign="center"
            />
        </View>
        <View >
            <TouchableOpacity 
                onPress={submit}
                style={styles.button}
                >
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.text}>Ya tienes una cuenta?</Text>
          <Text style={{color:'blue', fontSize:20, textAlign:'center'}} 
          onPress={()=> navigation.navigate('Login')}>Inicia sesion!</Text>
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

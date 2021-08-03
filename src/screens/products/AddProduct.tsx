import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View,Alert, TextInput, TouchableOpacity, Image} from 'react-native';
import { insertProduct } from '../../utils/product.comm';

export default function AddProduct({navigation, route}:any) {
    const [image, setImage] = React.useState("");
    const [nombre, setNombre] = React.useState("");
    const [descripcion, setDescripcion] = React.useState("");
    const [precio, setPrecio] = React.useState("");

  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(result.granted){
      alert('Permisos de Camara requeridos');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log("ayuda")
    if(pickerResult.cancelled === true){
      return;
    }

    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
      console.log('Hola:',image);
    }
  };    

    const submit = async ()=>{
      const result= await insertProduct({
        product:{
          nombre:nombre,
          descripcion:descripcion,
          precio:+precio,
          urlfoto:'',
          disponible:true
        },id:route.params.id
      })
      if(result.status==304){
        Alert.alert("Notificacion", result.response);
      }else if(result.status==400){
          Alert.alert("Error de credenciales", result.error.msg)
      }else if(result.status==200){
          //await storeData(usuario);
          Alert.alert("Producto Agregado","Produto agregado existosamente");
          navigation.navigate('Home');
          console.log(result);
          setNombre('');
          setDescripcion('');
          setPrecio('');
          console.log("saliendo")
          navigation.navigate('MyProducts',{id:route.params.id});
      }
      
    }
  
  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.title}>Crear Producto</Text>
        </View>
        <View >
            <Text style={styles.text}>Nombre</Text>
            <TextInput
                style={styles.input}
                onChangeText={setNombre}
                value={nombre}
                placeholder="Hamburguesa"
                autoCompleteType="off"
                keyboardType="default"
                textAlign="center"
            />
            <Text style={styles.text} >Descripcion</Text>
            <TextInput
                style={styles.inputDescrip}
                onChangeText={setDescripcion}
                value={descripcion}
                placeholder="Contiene lecha, tomate, mayonesa y carne molida"
                autoCompleteType="off"
                keyboardType="default"
                textAlign="left"
            />
            <View>
            {image !== '' ?
                            (<>
                            <View style={styles.conteinerTop}>
                                <TouchableOpacity onPress={pickImage}>
                                <Image
                                        source={{ uri: image !== '' ? image : 'https://picsum.photos/id/237/200/300'}}
                                        style={styles.logo}
                                    />
                                </TouchableOpacity>
                            </View></>)
                        : (<>
                            <View style={styles.conteinerTop}>
                                <TouchableOpacity onPress={pickImage} style={styles.button}>
                                    <Text style={styles.buttonText}>Set image</Text>
                                </TouchableOpacity>
                            </View></>)
                        }
            </View>
            <Text style={styles.text} >Precio:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPrecio}
                value={precio}
                placeholder="1.41$"
                autoCompleteType="off"
                keyboardType="number-pad"
                textAlign="center"
            />
        </View>
        <View >
            <TouchableOpacity 
                onPress={submit}
                style={styles.button}
                >
                <Text style={styles.buttonText}>Guardar Producto</Text>
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
    inputDescrip: {
        height: 180,
        width:250,
        borderWidth: 2,
        backgroundColor: '#ffffff',
        fontSize: 20,
        borderRadius: 15,
      },
    conteinerTop:{
      alignItems: 'center',
      justifyContent: 'center',
    },
    conteinerHigh:{
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

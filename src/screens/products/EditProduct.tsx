import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, ScrollView,View, TextInput, Alert, TouchableOpacity, RefreshControl, Image} from 'react-native';
import { getProduct, updateProduct } from '../../utils/product.comm';
import { Product } from '../../interfaces/Product';
export default function AddProduct({navigation, route}:any) {
    const [image, setImage] = React.useState("");
    const [nombre, setNombre] = React.useState("");
    const [descripcion, setDescripcion] = React.useState("");
    const [precio, setPrecio] = React.useState("");
    const [refresh, setRefresh]= React.useState(false);

    const detailProduct = async ()=>{
      console.log(route.params.id)
      const data:Product = await getProduct(route.params.id);
      console.log(data)
      setNombre(data.nombre)
      setPrecio(data.precio+'')
      setDescripcion(data.descripcion)
      setImage(data.urlfoto||'')
      setRefresh(false)
   //   setLoading(false);  
    }

  const onRefresh= ()=>{
      // setLoading(true)
      setRefresh(true);
       detailProduct(); 
     }

  useEffect(()=>{
     //Aqui se guardan los valores de route dentro de las variables
          detailProduct()
  }, [])

    console.log(route.params.data)
    const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(result.granted === false){
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
      const result= await updateProduct({
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
          Alert.alert("Producto Actualizado","Produto ha sido actualizado existosamente");
          console.log(result);
          navigation.navigate('myPremisess');
      }
    }
  
  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
    >
      <View style={styles.container}>
        <View>
            <Text style={styles.title}>Editar Producto</Text>
        </View>
        <View >
            <Text style={styles.text}>Nombre</Text>
            <TextInput
                style={styles.input}
                placeholder="Hamburguesa"
                autoCompleteType="off"
                keyboardType="default"
                textAlign="center"
                value={nombre}
                onChangeText={setNombre}
            />
            <Text style={styles.text} >Descripcion</Text>
            <TextInput
                style={styles.inputDescrip}
                placeholder="Contiene lecha, tomate, mayonesa y carne molida"
                autoCompleteType="off"
                keyboardType="default"
                textAlign="left"
                value={descripcion}
                onChangeText={setDescripcion}
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
                placeholder="1.41$"
                autoCompleteType="off"
                keyboardType="number-pad"
                textAlign="center"
                value={precio+''}
                onChangeText={setPrecio}
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
  </ScrollView>
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

import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {insertPremisess} from '../../utils/premisess.comm'
import { filePremisess } from '../../utils/file.comm';

import MapView, {Marker} from 'react-native-maps';

const addPremisess= ({navigation}:any)=> {
    const [nombre, setNombre] = React.useState("");
    const [urlPagina, setUrl] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [numero, setNumero] = React.useState("");
    const [direccion, setDireccion] = React.useState("");
    const [image, setImage] = React.useState("");
    const [imagename, setImageName] = React.useState("");
    const [type, setImageType] = React.useState("");
    const [data, setData]= React.useState(Array)

    
  const [state, setState] = React.useState({
    focusedLocation: {
      latitude: 10.66654595514716,
      longitude: -71.75502985025665,
      latitudeDelta: 0.0122,
      longitudeDelta:
        Dimensions.get('window').width /
        Dimensions.get('window').height *
        0.0122
    },
    locationChosen: false
  });

  const [map, setMap] = React.useState(null);

  const reset = () => {
    setState({
      focusedLocation: {
        latitude: 10.66654595514716,
        longitude: -71.75502985025665,
        latitudeDelta: 0.0122,
        longitudeDelta:
          Dimensions.get('window').width /
          Dimensions.get('window').height *
          0.0122
      },
      locationChosen: false
    });
  }

  const pickLocationHandler = (event)=> {
    const coords = event.nativeEvent.coordinate;
    console.log("latitud:",map.__lastRegion.latitude)
    console.log("longitud:",map.__lastRegion.longitude)
    map.animateToRegion({
      ...state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });
    /*this.props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude
    });*/
  };

    const submit = async ()=>{
        console.log('Se envio un establecimieno con',nombre, direccion, email)
        const result= await insertPremisess({
            nombre:nombre,
            correoE:email,
            numeroContacto:numero,
            direccion:direccion,
            urlPagina:urlPagina,
            urlFoto:'',
            latitud:state.focusedLocation.longitude,
            longitud:state.focusedLocation.latitude
        });
        console.log('aqui  ', image)
        if(result.status==200){
            Alert.alert("Notificacion",result.message)
            console.log(result);
            // if(image){
            //     const res= await filePremisess({
            //         id:result.establecimientos.id_establecimientos,
            //         data:data
            //     })
            //     console.log(image)
            //     if(res.status==200){
            //       Alert.alert("Imagen guardada")
            //     }
            // }
            setNombre('');
            setDireccion('');
            setEmail('');
            setNumero('');
            setUrl('');
            setImage('')
            navigation.navigate('myPremisess');
        }else if(result.status==400){
            Alert.alert("Error en los datos", result.error.msg)
        }else if(result.status==500){
            Alert.alert(result.message, "Ocurrio un error")
        }

    }

    

    const pickImage = async () => {
        let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if(result.granted === false){
          alert('Permisos de Camara requeridos');
          return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        if(pickerResult.cancelled === true){
          return;
        }
    
        if (!pickerResult.cancelled) {
            setImage(pickerResult.uri)
            let data= [];
            let localUri = pickerResult.uri;
            let filename = localUri.split('/').pop()!;
            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            data.push('images', { uri:localUri, name:filename, type:type,});
            console.log(data)
          setData(data);
        //   setImage(pickerResult.uri);
        //   setImageName(nombre);
        //   setImageType(fileType)
          console.log('Hola:',image);
        }
    };


  return (
    <ScrollView>
    <View style={styles.container}>
        <View>
            <Text style={styles.title}>Crear establecimiento</Text>
        </View>
        <View>
            <Text style={styles.text}>Nombre</Text>
            <TextInput
                style={styles.input}
                onChangeText={setNombre}
                value={nombre}
                placeholder="ingrese un nombre para el establecimiento"
                autoCompleteType="name"
                keyboardType="default"
                textAlign="center"
            />
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
            <Text style={styles.text}>Direccion</Text>
            <TextInput
                style={styles.input}
                onChangeText={setDireccion}
                value={direccion}
                placeholder="ingrese la direccion"
                keyboardType="default"
                textAlign="center"
            />
            <Text style={styles.text}>Numero (Opcional)</Text>
            <TextInput
                style={styles.input}
                onChangeText={setNumero}
                value={numero}
                placeholder="ingrese un Numero para contactarlos"
                autoCompleteType="tel"
                keyboardType="numeric"
                textAlign="center"
            />
            <Text style={styles.text} >Pagina web (Opcional)</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUrl}
                value={urlPagina}
                placeholder="ingrese la url de su pagina web"
                autoCompleteType="password"
                keyboardType="default"
                textAlign="center"
            />
        </View>
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
                        <View style={styles.box}>
                              <Text style={styles.titleMap}>Ubicacion del pedido:</Text>
                              <MapView
                                style={styles.map}
                                initialRegion={state.focusedLocation}
                                onPress={pickLocationHandler}
                                showsUserLocation={true}
                                ref={ref => setMap(ref)}
                                >
                                    <Marker coordinate={state.focusedLocation} />
                                </MapView>
                                <Text style={styles.titleMap}>Latitud:{state.focusedLocation.latitude}</Text>
                                <Text style={styles.titleMap}>Latitud:{state.focusedLocation.longitude}</Text>
                            </View>
                        </View>
        <View >
            <TouchableOpacity 
                //onPress={submit}
                onPress={()=>{
                    submit()
                }}
                style={styles.button}
                >
                <Text style={styles.buttonText}>Enviar Solicitud</Text>
            </TouchableOpacity>
        </View>
      <StatusBar style="auto" />
    </View>
    </ScrollView>
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
    map: {
      width: Dimensions.get('window').width*3/4,
      height: Dimensions.get('window').width*3/4,
    },
    box:{
      width:  Dimensions.get('window').width*4/5,
      height:  Dimensions.get('window').width,
      borderColor:"black",
      borderWidth:1,
      backgroundColor:"green",
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:30,
    },
    titleMap:{
      color:"white"
    }
});

export default addPremisess;
import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View,ScrollView, TextInput, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { Premisess } from '../../interfaces/Premisess';
import { getPremissesByID, updatePremisess } from '../../utils/premisess.comm';

const editPremisess= ({navigation, route}:any)=> {
    const [nombre, setNombre] = React.useState("");
    const [urlPagina, setUrl] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [numero, setNumero] = React.useState("");
    const [direccion, setDireccion] = React.useState("");
    const [image, setImage] = React.useState("");
    const [refresh, setRefresh]= React.useState(false);

    const detailPremisess = async ()=>{
        console.log(route.params.id)
        const data:Premisess = await getPremissesByID(route.params.id);
        setNombre(data.nombre)
        setEmail(data.correoE)
        setDireccion(data.direccion)
        setNumero(data.numeroContacto)
        setUrl(data.urlPagina)
        setRefresh(false)
     //   setLoading(false);
        
    }

    const onRefresh= ()=>{
        // setLoading(true)
        setRefresh(true);
         detailPremisess(); 
       }

    useEffect(()=>{
       //Aqui se guardan los valores de route dentro de las variables
            detailPremisess()
    }, [])

    const submit = async ()=>{
        console.log('Se envio un establecimieno con',nombre, direccion, email, route.params.id)
        const result= await updatePremisess({
            establecimiento:{
                nombre:nombre,
                correoE:email,
                numeroContacto:numero,
                direccion:direccion,
                urlPagina:urlPagina,
                urlFoto:''
        },id:route.params.id
        });
        console.log(result)
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

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
    >
      <View style={styles.container}>
        <View>
            <Text style={styles.title}>Editar establecimiento</Text>
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
                keyboardType="default"
                textAlign="center"
            />
        </View>
        {/* fotos */}
        <View >
            <TouchableOpacity 
                onPress={submit}
                style={styles.button}
                >
                <Text style={styles.buttonText}>Actualizar</Text>
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
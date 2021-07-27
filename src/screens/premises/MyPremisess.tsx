import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, SectionList, Image, Alert, RefreshControl } from 'react-native';
import {Card } from 'react-native-elements'
import { establecimiento } from '../../interfaces/establecimientos';
import { getPremissesByEmail, deletePremisses } from '../../utils/premisess.comm';

const Premisess= ({navigation}:any)=>{

    const [aprobadas, setAprobadas] = React.useState([{nombre:'', direccion:'', correoE:'', numeroContacto:'', urlPagina:'', urlFoto:''}]);
    const [enEspera, setEspera] = React.useState([{ nombre:'', direccion:'', correoE:'', numeroContacto:'', urlPagina:'', urlFoto:''}]);
    const [refresh, setRefresh]= React.useState(false);

    const loadPremisess = async ()=>{
        const premisess:establecimiento[] = await getPremissesByEmail();
        
        setAprobadas(premisess.filter((rows)=>{
          return rows.aprobado==true
        }));
        setEspera(premisess.filter((rows)=>{
          return rows.aprobado==false
        }));
        setRefresh(false);
     //   setLoading(false);
        
    }
  
    const filterNotes = async (filter:string)=>{
        const premisess:establecimiento[] = await getPremissesByEmail();
      setAprobadas(premisess.filter((rows)=>{
        return rows.aprobado==true
      }));
      setEspera(premisess.filter((rows)=>{
        return rows.aprobado==false
      }));
  
      setRefresh(false);
   //   setLoading(false);
      
  }
  
    const search=(titulo:string)=>{
      setRefresh(true);
      filterNotes(titulo);
    }
  
    const onRefresh= ()=>{
      // setLoading(true)
      setRefresh(true);
      loadPremisess(); 
     }
  
      useEffect(()=>{
        loadPremisess();
        //   const getData = async () => {
        //     try {
        //       const jsonValue = await AsyncStorage.getItem('login')
        //       if(jsonValue==null){
        //         navigation.navigate('Login')
        //       }
        //     } catch(e) {
        //       // error reading value
        //     }
        //   }
        //   getData();        
      }, [])


    const onLongPress= (id:number)=>{
        Alert.alert(
          "Options",
          "Que desea realizar",
          [
            {
              text: "cancel",
              onPress:()=>{console.log('cancelado')},
              style: "cancel"
            },
            {
                text: "Editar",
                onPress: () =>navigation.navigate('editPremisess',{id} ) //deleteT(id)
            },
            {
              text: "Borrar",
              onPress: () => {
                deletePremisses(id)
                onRefresh()
              }
            }]
        );}

    const Item = ( {title, image, aprobado, id, onRefresh}:any ) => (
        <Pressable
        onPress={()=> navigation.navigate('MyProducts',{id})}
        onLongPress={()=>{
            onLongPress(+id)
            console.log(id)
        }}
        >
           <View>
              <Card>
                  {!image?(<>
                    <Image
            style={{ width: "100%", height: 125 }}
            resizeMode="cover"
            source={require('../../assets/negocio.jpg')}
          />
                            </>):
                            (<>
                                <Image
                        style={{ width: "100%", height: 125 }}
                        resizeMode="cover"
                        source={{uri:image}}
                      />
                                        </>)}
                <Card.Divider/>
                <Card.Title>{title}</Card.Title>
                <Card.Divider/>
              </Card>
          </View>  
        </Pressable>
        );
      
        const renderItem = ({item}:any ) => (
          <Item title={item.nombre} image={item.urlFoto} aprobado={item.aprobado} id={item.id_establecimiento}/>    
        );
    
    return(
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}> Mis Establecimientos</Text>
            </View>
            <View style={styles.input}>
                <TextInput
                //style={styles.input}
                //onChangeText={setText}
                //value={text}
                placeholder={"Direccion"}
                //onSubmitEditing={ ()=>search(text)}
                />
            </View>
            <View style={styles.list}>
            <SectionList
            refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
            sections={[
                {title: 'Aprobados', data: aprobadas },
                {title: 'En espera', data: enEspera},
              ]}
              renderItem={renderItem}
              renderSectionHeader={({ section: { title , data} }) => (
                  (data.length>0)? <Text style={styles.listHeaderText} >{title}</Text> : null
              )}
            keyExtractor={(item, index) => index.toString()}
            />
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
    listHeaderText: {
        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10,
        padding: 10,
        color: 'black',
        fontSize:20
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
      //borderColor: "#20232a",
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
      }
  });
  

export default Premisess;
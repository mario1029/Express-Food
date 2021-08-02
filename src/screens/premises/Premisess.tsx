import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, FlatList, Image, RefreshControl } from 'react-native';
import {Card } from 'react-native-elements'
import { Premisess } from '../../interfaces/Premisess';
import { getPremisses} from '../../utils/premisess.comm';

const premisess= ({navigation}:any)=>{

    const [establecimientos, setEstablecimientos] = React.useState([{nombre:'', direccion:'', correoE:'', numeroContacto:'', urlPagina:'', urlFoto:''}]);
    const [refresh, setRefresh]= React.useState(false);

    const loadPremisess = async ()=>{
        const premisess:Premisess[] = await getPremisses();
        setEstablecimientos(premisess)
        setRefresh(false);
     //   setLoading(false);
        
    }

    const onRefresh= ()=>{
        // setLoading(true)
        setRefresh(true);
        loadPremisess(); 
    }

    const Item = ( {title, image, id, onRefresh}:any ) => (
        <Pressable
        onPress={()=>{navigation.navigate('Products', {id})}}
        //onLongPress={()=>{console.log('funciona')}}
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

        const renderItem = ({item}:any ) => (
          <Item title={item.nombre} image={item.urlFoto} id={item.id_establecimiento} />    
        );
    
    return(
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Establecimientos</Text>
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
            <FlatList
            refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
            data={establecimientos}
            renderItem={renderItem}
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
  

export default premisess;
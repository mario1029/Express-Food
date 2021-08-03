import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';


export default function Tracking() {

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
    //console.log("latitud:",map.__lastRegion.latitude)
    //console.log("longitud:",map.__lastRegion.longitude)
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


  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Ubicacion del pedido:</Text>
        <MapView
          style={styles.map}
          initialRegion={state.focusedLocation}
          onPress={pickLocationHandler}
          showsUserLocation={true}
          ref={ref => setMap(ref)}
          >
              <Marker coordinate={state.focusedLocation} />
          </MapView>
          <Text style={styles.title}>Latitud:{state.focusedLocation.latitude}</Text>
          <Text style={styles.title}>Latitud:{state.focusedLocation.longitude}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  title:{
    color:"white"
  }
});

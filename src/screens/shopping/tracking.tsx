import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView from 'react-native-maps';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Mapa</Text>
      <MapView
        style={styles.map}
        initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
        />
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
});

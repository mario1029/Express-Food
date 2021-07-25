import {StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

export const colors = {
    primary: '#2ECC71',
    secondary: '#04CA7C',
    tertiary: '#B3E759',
    black: '#284B37',
  };
  
  export const styles = StyleSheet.create({
    containerCenter: {
      flex: 1,
      backgroundColor: '#AD20A5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
      color: 'white',
      fontSize: 30
    },
    logo:{
      height:200,
      width:200,
      margin:15
    },
    button:{
      backgroundColor:'#000',
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
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#ffffff",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
      },
      input: {
        height: 40,
        borderWidth: 2,
        backgroundColor: '#ffffff',
        fontSize: 20,
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
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 50,
      },
  });

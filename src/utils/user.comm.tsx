import {User, UserComplete} from '../interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const register= async(usuario:UserComplete)=>{
    console.log(usuario)
    const response= await fetch(`https://expressfoodserver.herokuapp.com/session/signup`,
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });
    const data= await response.json();
    return data;
};

export const login= async(usuario:UserComplete)=>{
    console.log(usuario)
    const response= await fetch(`https://expressfoodserver.herokuapp.com/session/user`,
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });
    const data= await response.json();
    console.log(data)
    return data;
};

export const logout = async()=>{
    const response= await fetch('https://expressfoodserver.herokuapp.com/session/logout',
    {
        method: 'GET'
    });
    const data= await response.json();
    console.log(data);
    await AsyncStorage.removeItem('login')
    return data;
};
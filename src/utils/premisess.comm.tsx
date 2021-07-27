import {establecimiento} from '../interfaces/establecimientos';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const insertPremisess = async(establecimiento:establecimiento)=>{
    console.log(establecimiento);
    const response= await fetch('https://expressfoodserver.herokuapp.com/premisses/new',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(establecimiento)
    });
    const result= await response.json();
    return result;
};

export const getPremisses = async()=>{
    const response= await fetch('https://expressfoodserver.herokuapp.com/premisses',{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    });
    const result= await response.json();
    return result.establecimientos;
}

export const getPremissesByEmail = async()=>{
    const response= await fetch('https://expressfoodserver.herokuapp.com/premisses/correo',{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    });
    const result= await response.json();
    return result.establecimientos;
}

export const getPremissesByID = async(id:number)=>{
    const response= await fetch(`https://expressfoodserver.herokuapp.com/premisses/detail/${id}`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    });
    const result= await response.json();
    return result.establecimiento;
}

export const deletePremisses= async(id:number)=>{
    const response= await fetch(`https://expressfoodserver.herokuapp.com/premisses/${id}`,{
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    });
    const result= await response.json();
    return result.establecimientos;
}

export const updatePremisess = async({establecimiento, id}:{establecimiento:establecimiento, id: number})=>{
    console.log(establecimiento);
    const response= await fetch(`https://expressfoodserver.herokuapp.com/premisses/${id}`,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(establecimiento)
    });
    const result= await response.json();
    return result;
};
import {producto} from '../interfaces/producto';

export const getMyProduct= async(id:number)=>{
    const response= await fetch(`https://expressfoodserver.herokuapp.com/product/lista/${id}`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    });
    const result= await response.json();
    return result.productos;
}

export const getProduct= async(id:number)=>{
    const response= await fetch(`https://expressfoodserver.herokuapp.com/product/lista/filtrar/${id}`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    });
    const result= await response.json();
    return result.productos;
}

export const insertProduct= async({product, id}:{product:producto, id:number})=>{
    const response= await fetch(`https://expressfoodserver.herokuapp.com/product/new/${id}`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });
    const result= await response.json();
    return result;
}

export const deleteProduct= async(id:number)=>{
    const response= await fetch(`https://expressfoodserver.herokuapp.com/product/${id}`,{
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    });
    const result= await response.json();
    return result;
}
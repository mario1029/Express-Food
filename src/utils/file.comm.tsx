export const filePremisess= async({data, id}:{data:any, id: number})=>{
    const result = await fetch(`https://expressfoodserver.herokuapp.com/file/establecimiento/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: new FormData(data)
    });
    const dato= await result.json();
    return dato;
}
export const getOrders = async()=>{
  const response = await fetch(`https://expressfoodserver.herokuapp.com/order`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json();
    return result;
}

export const newOrder = async()=>{
  const response = await fetch(`https://expressfoodserver.herokuapp.com/order/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json();
    return result;
}

export const getOrderDetail = async(id:number)=>{
  const response = await fetch(`https://expressfoodserver.herokuapp.com/order/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json();
    return result;
}

export const deleteOrder = async(id:number)=>{
  const response = await fetch(`https://expressfoodserver.herokuapp.com/order/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json();
    return result;
}

export const insertOrderProduct = async({idPedido, idProducto, cantidad}:{idPedido:number, idProducto:number, cantidad:number})=>{
  const response = await fetch(`https://expressfoodserver.herokuapp.com/order/${idPedido}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        idProducto, cantidad
      })
    });
    const result = await response.json();
    return result;
}

export const updateOrderProduct = async({idPedido, idProducto, cantidad}:{idPedido:number, idProducto:number, cantidad:number})=>{
  const response = await fetch(`https://expressfoodserver.herokuapp.com/order/${idPedido}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        idProducto, cantidad
      })
    });
    const result = await response.json();
    return result;
}

export const deleteOrderProduct = async({idPedido, idProducto}:{idPedido:number, idProducto:number})=>{
  const response = await fetch(`https://expressfoodserver.herokuapp.com/order/${idPedido}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        idProducto
      })
    });
    const result = await response.json();
    return result;
}


export const payOrder = async (id:number) => {
    const response = await fetch(`https://expressfoodserver.herokuapp.com/order/pay/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json();
    return result;
};

export const approvedPayment = async(id:number)=>{
  const response = await fetch(`https://expressfoodserver.herokuapp.com/payment/approved/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    });
  const result = await response.json();
  return result;
}

export const deprecatedPayment = async(id:number)=>{
  const response = await fetch(`https://expressfoodserver.herokuapp.com/payment/deprecated/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    });
  const result = await response.json();
  return result;
}

export const invoiceOrder = async(id:number)=>{
  const response = await fetch(`https://expressfoodserver.herokuapp.com/order/invoice/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      }
    });
  const result = response.json();
  return result;
}
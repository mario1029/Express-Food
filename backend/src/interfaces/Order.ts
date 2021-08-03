export interface Order{
    idPedido: number,
    correoU?: string,
    idConductor?: number,
    fecha?: string
}

export interface DetailOrder{
    idProducto?:number,
    producto: string,
    cantidad: number,
    precio:number,
    precioTotal:number
} 
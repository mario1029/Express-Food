export interface Product{
    id_producto: number,
    nombre: string,
    descripcion: string
    precio: number,
    disponible?:boolean,
    urlfoto?:string
}
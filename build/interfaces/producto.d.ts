export interface producto {
    id_producto: number;
    nombre: string;
    descripcion: string;
}
export interface productoPorEstablecimiento extends producto {
    precio: number;
    disponible: boolean;
}
//# sourceMappingURL=producto.d.ts.map
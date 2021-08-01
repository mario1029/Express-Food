import { pedido, detallesPedido } from '@interfaces/pedido';
export declare const createOrder: (correo: string) => Promise<pedido>;
export declare const getOrder: (correo: string) => Promise<pedido[]>;
export declare const getOrderDetail: (id: number) => Promise<detallesPedido[]>;
export declare const insertOrderDetail: ({ idPedido, idProducto, cantidad }: {
    idPedido: number;
    idProducto: number;
    cantidad: number;
}) => Promise<boolean>;
export declare const updateOrderDetail: ({ idPedido, idProducto, cantidad }: {
    idPedido: number;
    idProducto: number;
    cantidad: number;
}) => Promise<boolean>;
export declare const deleteOrderDetail: ({ idPedido, idProducto }: {
    idPedido: number;
    idProducto: number;
}) => Promise<boolean>;
export declare const deleteOrder: (idPedido: number) => Promise<boolean>;
export declare const montOrder: (idPedido: number) => Promise<number>;
//# sourceMappingURL=order.d.ts.map
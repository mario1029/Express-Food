import { Order, DetailOrder } from '@interfaces/Order';
export declare const createOrder: (correo: string) => Promise<Order>;
export declare const getOrder: (correo: string) => Promise<Order[]>;
export declare const getOrderDetail: (id: number) => Promise<DetailOrder[]>;
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
export declare const terminateOrder: (idPedido: number) => Promise<boolean>;
export declare const deleteOrderDetail: ({ idPedido, idProducto }: {
    idPedido: number;
    idProducto: number;
}) => Promise<boolean>;
export declare const deleteOrder: (idPedido: number) => Promise<boolean>;
export declare const montOrder: (idPedido: number) => Promise<number>;
//# sourceMappingURL=order.d.ts.map
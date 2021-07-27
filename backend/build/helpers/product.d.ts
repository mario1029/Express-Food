import { producto } from '@interfaces/producto';
export declare const getProduct: (idEstablecimieto: number) => Promise<producto[]>;
export declare const getProductFilter: (idEstablecimiento: number) => Promise<producto[]>;
export declare const insertProduct: ({ producto, idEstablecimiento }: {
    producto: producto;
    idEstablecimiento: number;
}) => Promise<producto>;
export declare const updateProduct: ({ producto, idProducto }: {
    producto: producto;
    idProducto: number;
}) => Promise<producto>;
export declare const setAvailability: (idProducto: number) => Promise<producto>;
export declare const deleteProducto: (idProducto: number) => Promise<boolean>;
//# sourceMappingURL=product.d.ts.map
import { Product } from '@interfaces/Product';
export declare const getProductDetail: (idProducto: number) => Promise<Product>;
export declare const getProduct: (idEstablecimieto: number) => Promise<Product[]>;
export declare const getProductFilter: (idEstablecimiento: number) => Promise<Product[]>;
export declare const insertProduct: ({ producto, idEstablecimiento }: {
    producto: Product;
    idEstablecimiento: number;
}) => Promise<Product>;
export declare const updateProduct: ({ producto, idProducto }: {
    producto: Product;
    idProducto: number;
}) => Promise<Product>;
export declare const setAvailability: (idProducto: number) => Promise<Product>;
export declare const deleteProducto: (idProducto: number) => Promise<boolean>;
//# sourceMappingURL=product.d.ts.map
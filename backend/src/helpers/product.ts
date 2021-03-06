import Pool from '@utils/pool';
import { queriesProduct } from '@utils/queries';
import { Product } from '@interfaces/Product';

const pool = Pool.getInstance();

export const getProductDetail = async(idProducto:number): Promise<Product>=>{
    const client = await pool.connect();
    try {
        const response = (await client.query(queriesProduct.GET_PRODUCT, [idProducto])).rows[0];
        const product: Product = {
            id_producto: response.id_producto,
            nombre: response.nombre,
            descripcion: response.descripcion,
            precio: response.precio,
            disponible:response.disponible,
            urlfoto:response.urlfoto
        }
        return product;
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
};

export const getProduct= async(idEstablecimieto:number): Promise<Product[]>=>{
    const client = await pool.connect();
    try {
        const response = (await client.query(queriesProduct.GET_PRODUCT_BY_PREMISESS, [idEstablecimieto])).rows;
        const product: Product[] = response.map((rows)=>{
            return {
                id_producto: rows.id_producto,
                nombre: rows.nombre,
                descripcion: rows.descripcion,
                precio: rows.precio,
                disponible:rows.disponible,
                urlfoto:rows.urlfoto
            }
        })
        return product;
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
};

export const getProductFilter= async(idEstablecimiento:number): Promise<Product[]>=>{
    const client = await pool.connect();
    try {
        const response = (await client.query(queriesProduct.GET_PRODUCT_BY_PREMISESS_FILTER,[idEstablecimiento])).rows;
        const product: Product[] = response.map((rows)=>{
            return {
                id_producto: rows.id_producto,
                nombre: rows.nombre,
                descripcion: rows.descripcion,
                precio: rows.precio,
                urlfoto:rows.urlfoto
            }
        })
        return product;
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
};

export const insertProduct= async({producto, idEstablecimiento}:{producto:Product, idEstablecimiento:number}): Promise<Product>=>{
    const client = await pool.connect();
    const {nombre, descripcion, precio, disponible}= producto;
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesProduct.INSERT_PRODUCT,[nombre, descripcion, precio, disponible, idEstablecimiento])).rows[0];
        const product: Product= {
            id_producto: response.id_producto,
            nombre: response.nombre,
            descripcion: response.descripcion,
            precio: response.precio,
            disponible: response.disponible
        }
        await client.query('COMMIT');
        return product;
    } catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
};

export const updateProduct= async({producto, idProducto}:{producto:Product, idProducto:number}): Promise<Product>=>{
    const client = await pool.connect();
    const {nombre, descripcion, precio}= producto;
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesProduct.UPDATE_PRODUCT,[nombre, descripcion, precio, idProducto])).rows[0];
        const product: Product= {
            id_producto: response.id_producto,
            nombre: response.nombre,
            descripcion: response.descripcion,
            precio: response.precio
        }
        await client.query('COMMIT');
        return product;
    } catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
}

export const setAvailability=async(idProducto:number): Promise<Product>=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesProduct.SET_AVAILABILITY,[idProducto])).rows[0];
        const product: Product= {
            id_producto: response.id_producto,
            nombre: response.nombre,
            descripcion: response.descripcion,
            precio: response.precio
        }
        await client.query('COMMIT');
        return product;
    } catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
}

export const deleteProducto= async(idProducto:number)=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesProduct.DELETE_PRODUCT,[idProducto])).rowCount>0;
        await client.query('COMMIT');
        return response;
    } catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
}
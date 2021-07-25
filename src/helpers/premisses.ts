import Pool from '@utils/pool';
import { queriesPremisess } from '@utils/queries';
import { establecimiento } from '@interfaces/establecimientos';

const pool = Pool.getInstance();

export const getPremisess= async ():Promise<establecimiento[]> =>{
    const client = await pool.connect();
    try {
        const response = (await client.query(queriesPremisess.GET_PREMISESS)).rows;
        const user: establecimiento[] = response.map((rows)=>{
            return {
                nombre: rows.nombre,
                correoE: rows.correoe,
                numeroContacto: rows.numerocontacto,
                direccion: rows.direccion,
                urlPagina: rows.urlpagina,
                aprobado: rows.aprobado,
                urlFoto: rows.urlfoto
            }
        })
        return user;
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
};

export const getPremisessByAddress= async (direccion:string):Promise<establecimiento[]> =>{
    const client = await pool.connect();
    try {
        const response = (await client.query(queriesPremisess.GET_PREMISESS_BY_ADDRESS, [direccion])).rows;
        const user: establecimiento[] = response.map((rows)=>{
            return {
                nombre: rows.nombre,
                correoE: rows.correoe,
                numeroContacto: rows.numerocontacto,
                direccion: rows.direccion,
                urlPagina: rows.urlpagina,
                urlFoto: rows.urlfoto
            }
        })
        return user;
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
};

export const insertPremisess= async ({promisse,correo}:{promisse:establecimiento, correo: string}):Promise<establecimiento> =>{
    const client = await pool.connect();
    const {nombre, direccion, correoE, numeroContacto, urlPagina}= promisse;
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesPremisess.INSERT_PREMISESS,[nombre, direccion, correoE, numeroContacto, urlPagina, correo])).rows[0];
        const user: establecimiento = {
            nombre: response.nombre,
            correoE: response.correoe,
            numeroContacto: response.numerocontacto,
            direccion: response.direccion,
            urlPagina: response.urlpagina
        }
        await client.query('COMMIT');
        return user;
    } catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
};

export const updatePremisses=async({promisse,id}:{promisse:establecimiento, id: number}):Promise<establecimiento>=>{
    const client = await pool.connect();
    const {nombre, direccion, correoE, numeroContacto, urlPagina}= promisse;
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesPremisess.UPDATE_PREMISSES,[nombre, direccion, correoE, numeroContacto, urlPagina, id])).rows[0];
        const user: establecimiento = {
            nombre: response.nombre,
            correoE: response.correoe,
            numeroContacto: response.numerocontacto,
            direccion: response.direccion,
            urlPagina: response.urlpagina
        }
        await client.query('COMMIT');
        return user;
    } catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
};

export const approvedPremisses=async(id: number):Promise<establecimiento>=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesPremisess.SET_APPROVED,[id])).rows[0];
        const user: establecimiento = {
            nombre: response.nombre,
            correoE: response.correoe,
            numeroContacto: response.numerocontacto,
            direccion: response.direccion,
            urlPagina: response.urlpagina,
            aprobado: response.aprobado
        }
        await client.query('COMMIT');
        return user;
    } catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
};

export const deletePremisses= async(id:number): Promise<boolean>=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesPremisess.DELETE_PREMISSE,[id])).rowCount>0;
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
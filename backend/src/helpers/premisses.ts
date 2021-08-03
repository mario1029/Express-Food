import Pool from '@utils/pool';
import { queriesPremisess } from '@utils/queries';
import { Premisess } from '@interfaces/Premisess';

const pool = Pool.getInstance();

export const getPremisess= async ():Promise<Premisess[]> =>{
    const client = await pool.connect();
    try {
        const response = (await client.query(queriesPremisess.GET_PREMISESS)).rows;
        const user: Premisess[] = response.map((rows)=>{
            return {
                id_establecimiento:rows.id_establecimiento,
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

export const getPremisessByEmail= async (correo:string):Promise<Premisess[]> =>{
    const client = await pool.connect();
    try {
        const response = (await client.query(queriesPremisess.GET_PREMISESS_BY_EMAIL,[correo])).rows;
        const user: Premisess[] = response.map((rows)=>{
            return {
                id_establecimiento:rows.id_establecimiento,
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

export const getPremisessById= async (id:number):Promise<Premisess> =>{
    const client = await pool.connect();
    try {
        const response = (await client.query(queriesPremisess.GET_PREMISESS_BY_ID,[id])).rows[0];
        const user: Premisess =  {
            id_establecimiento:response.id_establecimiento,
            nombre: response.nombre,
            correoE: response.correoe,
            numeroContacto: response.numerocontacto,
            direccion: response.direccion,
            urlPagina: response.urlpagina,
            aprobado: response.aprobado,
            urlFoto: response.urlfoto
        }
        return user;
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
};

export const getPremisessByAddress= async (direccion:string):Promise<Premisess[]> =>{
    const client = await pool.connect();
    try {
        const response = (await client.query(queriesPremisess.GET_PREMISESS_BY_ADDRESS, [direccion])).rows;
        const user: Premisess[] = response.map((rows)=>{
            return {
                id_establecimiento:rows.id_establecimiento,
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

export const insertPremisess= async ({promisse,correo}:{promisse:Premisess, correo: string}):Promise<Premisess> =>{
    const client = await pool.connect();
    const {nombre, direccion, correoE, numeroContacto, urlPagina}= promisse;
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesPremisess.INSERT_PREMISESS,[nombre, direccion, correoE, numeroContacto, urlPagina, correo])).rows[0];
        const user: Premisess = {
            id_establecimiento:response.id_establecimiento,
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

export const updatePremisses=async({promisse,id}:{promisse:Premisess, id: number}):Promise<Premisess>=>{
    const client = await pool.connect();
    const {nombre, direccion, correoE, numeroContacto, urlPagina}= promisse;
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesPremisess.UPDATE_PREMISSES,[nombre, direccion, correoE, numeroContacto, urlPagina, id])).rows[0];
        const user: Premisess = {
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

export const approvedPremisses=async(id: number):Promise<Premisess>=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesPremisess.SET_APPROVED,[id])).rows[0];
        const user: Premisess = {
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
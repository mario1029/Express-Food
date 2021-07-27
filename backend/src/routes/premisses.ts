import { Router } from 'express';
import { premisessValidation, checkResult } from '@validations/fields';
import { approvedPremisses, deletePremisses, getPremisess, getPremisessByAddress, getPremisessByEmail, getPremisessById, insertPremisess, updatePremisses } from '@helpers/premisses';
import { establecimiento } from '@interfaces/establecimientos';

const router = Router();

router.get('',async (req:any, res)=>{
    try {
        const establecimiento:establecimiento[]= await getPremisess();
        res.status(200).json({ status: 200, establecimientos: establecimiento, message: 'Establecimientos encontrados correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al buscar los establecimientos' });
    }
});

router.get('/correo',async (req:any, res)=>{
    try {
        const establecimiento:establecimiento[]= await getPremisessByEmail(req.user.correo);
        res.status(200).json({ status: 200, establecimientos: establecimiento, message: 'Establecimientos encontrados correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al buscar los establecimientos' });
    }
});

router.get('/address/:address', async(req, res)=>{
    try {
        const establecimiento:establecimiento[]= await getPremisessByAddress(req.params.address);
        res.status(200).json({ status: 200, establecimientos: establecimiento, message: 'Establecimientos encontrados correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al buscar los establecimientos' });
    }
});

router.get('/detail/:id', async(req, res)=>{
    try {
        const establecimiento:establecimiento= await getPremisessById(+req.params.id);
        res.status(200).json({ status: 200, establecimiento: establecimiento, message: 'Establecimientos encontrados correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al buscar los establecimientos' });
    }
});

router.post('/new', premisessValidation, checkResult,async(req:any, res)=>{
    try {
        const establecimiento:establecimiento= await insertPremisess({
            promisse:req.body,
            correo:req.user.correo
        });
        res.status(200).json({ status: 200, establecimientos: establecimiento, message: 'Establecimiento creado correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al crear el establecimiento' });
    }
});

router.put('/approved/:id', async(req, res)=>{
    try {
        const establecimiento:establecimiento= await approvedPremisses(+req.params.id);
        res.status(200).json({ status: 200, establecimientos: establecimiento, message: 'Establecimiento aprobado correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al aprobar el establecimiento' });
    }
})

router.put('/:id', premisessValidation, checkResult, async(req, res)=>{
    try {
        const establecimiento:establecimiento= await updatePremisses({
            promisse:req.body,
            id:+req.params.id
        });
        res.status(200).json({ status: 200, establecimientos: establecimiento, message: 'Establecimientos actualizado correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el establecimiento' });
    }
});

router.delete('/:id', async(req, res)=>{
    try {
        const resultado:boolean= await deletePremisses(+req.params.id)
        res.status(200).json({ status: 200, resultado: resultado, message: 'Establecimientos borrado correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al borrar el establecimiento' });
    }
})

export default router;
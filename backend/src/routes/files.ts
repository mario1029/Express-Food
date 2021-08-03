import { Router } from 'express';
import { Product } from '@interfaces/Product';
import multer from 'multer';
import multerconfig from '@utils/multer'
import { filePremisses, fileProduct } from '@helpers/files';

const uploads= multer(multerconfig);
const router = Router();

router.put('/product/:id_producto', uploads.single('image') ,async(req:any, res)=>{
    try {
        const resultado: boolean=await fileProduct({
            url:req.file?.filename,
            id:+req.params.id_producto
        });
        res.status(200).json({ status: 200, resultado: resultado, message: 'producto actualizado correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar los productos' });
    }
});

router.put('/establecimiento/:id_establecimiento', uploads.single('image') ,async(req:any, res)=>{
    try {
        const resultado: boolean=await filePremisses({
            url:req.file?.filename,
            id:+req.params.id_establecimiento
        });
        res.status(200).json({ status: 200, resultado: resultado, message: 'producto actualizado correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar los productos' });
    }
});

export default router;
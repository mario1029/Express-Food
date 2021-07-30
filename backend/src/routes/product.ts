import { Router } from 'express';
import { productValidation, updateProductValidation, checkResult } from '@validations/fields';
import { deleteProducto, getProduct, getProductFilter, insertProduct, setAvailability, updateProduct } from '@helpers/product';
import { producto } from '@interfaces/producto';

const router = Router();

router.get('/lista/:idEstabecimirnto',async(req, res)=>{
    try {
        const producto: producto[]=await getProduct(+req.params.idEstabecimirnto);
        res.status(200).json({ status: 200, productos: producto, message: 'productos encontrados correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al buscar los productos' });
    }
});

router.get('/lista/filtrar/:idEstablecimiento', async(req, res)=>{
    try {
        const producto: producto[]=await getProductFilter(+req.params.idEstablecimiento);
        res.status(200).json({ status: 200, productos: producto, message: 'productos encontrados correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al buscar los productos' });
    }
});

router.post('/new/:idEstablecimiento', productValidation, checkResult, async(req, res)=>{
    try {
        const producto: producto=await insertProduct({
            producto:req.body,
            idEstablecimiento:+req.params.idEstablecimiento
        });
        res.status(200).json({ status: 200, producto: producto, message: 'producto creado correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al crear el producto' });
    }
});

router.put('/disponible/:idProducto',async(req, res)=>{
    try {
        const producto: producto=await setAvailability(+req.params.idProducto);
        res.status(200).json({ status: 200, producto: producto, message: 'productos actualizado correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar los productos' });
    }
});

router.put('/:idProducto', updateProductValidation, checkResult, async(req, res)=>{
    try {
        const producto: producto=await updateProduct({
            producto:req.body,
            idProducto:+req.params.idProducto
        });
        res.status(200).json({ status: 200, producto: producto, message: 'producto actualizado correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el producto' });
    }
});

router.delete('/:idProducto', async(req, res)=>{
    try {
        const producto: boolean=await deleteProducto(+req.params.idProducto);
        res.status(200).json({ status: 200, producto: producto, message: producto?'producto eliminado correctamente' : 'no se ha eliminada ningun producto'});
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al eliminar el producto' });
    }
});

export default router;
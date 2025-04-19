import express from 'express';
import {deleteProduct, getProducts, createProduct, updateProduct} from '../controller/product.controller.js';

const router = express.Router(); 

router.post('/', createProduct);

router.delete('/:id', deleteProduct);

router.get('/', getProducts);

router.put('/:id', updateProduct);

export default router;
import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: 'Please fill all the fields'});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, message: 'Product created successfully', data: newProduct});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, message: 'Server error'});
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const product = await Product.findByIdAndDelete(id);
        return res.status(200).json({success: true, message: 'Product deleted successfully'});
    } catch (error) {
        console.error(error.message);
        return res.status(404).json({success: false, message: "Product not found"});
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({success: true, data: products});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({success: false, message: 'Server error'});
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(400).json({success: false, message: 'Invalid product ID'});
    }

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: 'Please fill all the fields'});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        return res.status(200).json({success: true, message: 'Product updated successfully', data: updatedProduct});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({success: false, message: 'Server error'});
    }
}
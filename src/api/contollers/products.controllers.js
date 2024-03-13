const { deleteImgCloudinary } = require('../../middlewares/deleteFile.middleware');
const Product = require('../models/products.model');

// Método para recuperar todos los productos de la DB
const getAll = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        return next(error);
    }
}

// Método para recuperar un producto de la DB por su id
const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        return next(error);
    }
}

// Método para crear un nuevo producto
const postOne = async (req, res, next) => {
    try {
        const picture = req.file ? req.file.path : null
        const { name, description, price, category } = req.body;
        const newProduct = new Product({ name, description, price, category, picture });
        const productDB = await newProduct.save();
        return res.status(201).json(productDB);
    } catch (error) {
        return next(error);
    }
}


const patchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price, category } = req.body;
        
        let updatedProduct;

        if (req.file) {
            // Si hay un archivo adjunto, actualiza la propiedad 'picture'
            const picture = req.file.path;
            updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price, category, picture }, { new: true });
        } else {
            // Si no hay archivo adjunto, actualiza el resto de propiedades
            updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price, category }, { new: true });
        }

        return res.status(200).json(updatedProduct);
    } catch (error) {
        return next(error);
    }
};

// Método para eliminar un producto en base a su id
const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (deletedProduct.picture) deleteImgCloudinary(deletedProduct.picture)
        return res.status(200).json(deletedProduct);
    } catch (error) {
        return next(error);
    }
}


module.exports = {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
}

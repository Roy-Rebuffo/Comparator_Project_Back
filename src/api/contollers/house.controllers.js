const { deleteImgCloudinary } = require('../../middlewares/deleteFile.middleware');
const House = require('../models/house.model');

// Método para recuperar todos los productos de la DB
const getAll = async (req, res, next) => {
    try {
        const allHouses = await House.find();
        console.log(allHouses);
        res.status(200).json(allHouses);
    } catch (error) {
        return next(error);
    }
}

// Método para recuperar un producto de la DB por su id
const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const house = await House.findById(id);
        res.status(200).json(house);
    } catch (error) {
        return next(error);
    }
}

//Método para crear un nuevo producto
const postOne = async (req, res, next) => {
    try {
        const picture = req.file ? req.file.path : null
        const { name, description, foundation } = req.body;
        const newHouse = new House({ name, description, foundation, picture });
        const houseDB = await newHouse.save();
        return res.status(201).json(houseDB);
    } catch (error) {
        return next(error);
    }
}


// // Método para eliminar un producto en base a su id
const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const deletedHouse = await House.findByIdAndDelete(id);
        if (deletedHouse.picture) deleteImgCloudinary(deletedHouse.picture)
        return res.status(200).json(deletedHouse);
    } catch (error) {
        return next(error);
    }
}


module.exports = { getAll, getOne, postOne, deleteOne }



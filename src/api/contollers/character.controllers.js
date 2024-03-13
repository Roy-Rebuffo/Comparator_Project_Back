const { deleteImgCloudinary } = require('../../middlewares/deleteFile.middleware');
const Character = require('../models/character.model');

// Método para recuperar todos los productos de la DB
const getAll = async (req, res, next) => {
    try {
        const allCharacters = await Character.find();
        console.log(allCharacters);
        res.status(200).json(allCharacters);
    } catch (error) {
        return next(error);
    }
}

// Método para recuperar un producto de la DB por su id
const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const character = await Character.findById(id);
        res.status(200).json(character);
    } catch (error) {
        return next(error);
    }
}

//Método para crear un nuevo producto
const postOne = async (req, res, next) => {
    try {
        const picture = req.file ? req.file.path : null
        const { name, description, actor } = req.body;
        const newCharacter = new Character({ name, description, actor, picture });
        const characterDB = await newCharacter.save();
        return res.status(201).json(characterDB);
    } catch (error) {
        return next(error);
    }
}


// // Método para eliminar un producto en base a su id
const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const deletedCharacter = await Character.findByIdAndDelete(id);
        if (deletedCharacter.picture) deleteImgCloudinary(deletedCharacter.picture)
        return res.status(200).json(deletedCharacter);
    } catch (error) {
        return next(error);
    }
}


module.exports = { getAll, getOne, postOne, deleteOne }



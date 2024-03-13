const express = require('express');
const CharacterRoutes = express.Router();
const { getAll, getOne, postOne, deleteOne } = require('../contollers/character.controllers');
const { isAuth } = require('../../middlewares/auth.middleware');
const upload = require('../../middlewares/updateFile.middleware');

CharacterRoutes.get('/', getAll);
CharacterRoutes.get('/:id', getOne);
CharacterRoutes.post('/post', [isAuth], upload.single('picture'), postOne);
//ProductRoutes.patch('/edit/:id', upload.single('image'),  patchOne);
CharacterRoutes.delete('/delete/:id', deleteOne);

module.exports = CharacterRoutes;
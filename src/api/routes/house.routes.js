const express = require('express');
const HouseRoutes = express.Router();
const { getAll, getOne, postOne, deleteOne } = require('../contollers/house.controllers');
const { isAuth } = require('../../middlewares/auth.middleware');
const upload = require('../../middlewares/updateFile.middleware');

HouseRoutes.get('/', getAll);
HouseRoutes.get('/:id', getOne);
HouseRoutes.post('/post', [isAuth], upload.single('picture'), postOne);
//ProductRoutes.patch('/edit/:id', upload.single('image'),  patchOne);
HouseRoutes.delete('/delete/:id', deleteOne);

module.exports = HouseRoutes;
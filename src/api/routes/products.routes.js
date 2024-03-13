const express = require('express');
const ProductRoutes = express.Router();
const { getAll, getOne, postOne, patchOne, deleteOne } = require('../contollers/products.controllers');
const { isAuth } = require('../../middlewares/auth.middleware');
const upload = require('../../middlewares/updateFile.middleware');

ProductRoutes.get('/', getAll);
ProductRoutes.get('/:id', getOne);
ProductRoutes.post('/post', [isAuth], upload.single('picture'), postOne);
//ProductRoutes.patch('/edit/:id', upload.single('picture'),  patchOne);
ProductRoutes.delete('/delete/:id', deleteOne);

module.exports = ProductRoutes;
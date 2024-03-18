const ScrapingRoutes = require('express').Router();
const { getDataCarrefour, getDataAhorramas } = require('../contollers/scraping.controllers');

ScrapingRoutes.get('/scrapedatacarrefour', getDataCarrefour);
ScrapingRoutes.get('/scrapedataahorramas', getDataAhorramas);

module.exports = ScrapingRoutes;
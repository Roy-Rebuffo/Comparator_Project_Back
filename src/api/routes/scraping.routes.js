const ScrapingRoutes = require('express').Router();
const { getData, getDataAhorramas } = require('../contollers/scraping.controllers');

ScrapingRoutes.get('/scrapedatacarrefour', getData);
ScrapingRoutes.get('/scrapedataahorramas', getDataAhorramas);

module.exports = ScrapingRoutes;
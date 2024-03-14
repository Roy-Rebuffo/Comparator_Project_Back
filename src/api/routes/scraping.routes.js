const ScrapingRoutes = require('express').Router();
const { getData, getDataAlcampo } = require('../contollers/scraping.controllers');

ScrapingRoutes.get('/scrapedata', getData);
ScrapingRoutes.get('/scrapedataalcampo', getDataAlcampo);

module.exports = ScrapingRoutes;
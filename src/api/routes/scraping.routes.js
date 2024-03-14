const ScrapingRoutes = require('express').Router();
const { getData, getDataAhorramas } = require('../contollers/scraping.controllers');

ScrapingRoutes.get('/scrapedata', getData);
ScrapingRoutes.get('/scrapedataahorramas', getDataAhorramas);

module.exports = ScrapingRoutes;
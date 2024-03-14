const ScrapingRoutes = require('express').Router();
const { getData } = require('../contollers/scraping.controllers');

ScrapingRoutes.get('/scrapedata', getData);

module.exports = ScrapingRoutes;
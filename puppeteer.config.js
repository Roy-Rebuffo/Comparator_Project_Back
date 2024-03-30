const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Cambia la ubicación de la caché para Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};

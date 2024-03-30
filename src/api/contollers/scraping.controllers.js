const scrapeDataCarrefour= require('../../utils/scraping/scrapeCarrefour');
const scrapeDataWithPuppeteer = require('../../utils/scraping/scrapeAhorramas');

const getDataCarrefour = async (req, res) => {
    try {
        const urls = [
            'https://www.carrefour.es/supermercado?q=refrescos&scroll=0000740000'
        ];

        const scrapedDataJSON = await scrapeDataCarrefour(urls);
        
        res.json(scrapedDataJSON);

    } catch (error) {
        console.error('Error al obtener los datos raspados:', error);
        res.status(500).json({ error: 'Error al obtener los datos raspados' });
    }
};

const getDataAhorramas = async (req, res) => {
    try {
        const urls = [
            'https://www.ahorramas.com/bebidas/refrescos/' 
        ];

        // Pasar todas las URLs como un solo array a la función scrapeDataWithPuppeteer
        const scrapedDataJSON = await scrapeDataWithPuppeteer(urls);
        
        res.json(scrapedDataJSON);

    } catch (error) {
        console.error('Error al obtener los datos raspados con Puppeteer:', error);
        // res.status(500).json({ error: 'Error al obtener los datos raspados' });
        res.status(500).json(error);
    }
};

module.exports = {getDataCarrefour, getDataAhorramas};


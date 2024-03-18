const scrapeDataCarrefour= require('../../utils/scraping/scrapeCarrefour');
const scrapeDataWithPuppeteer = require('../../utils/scraping/scrapeAhorramas');

const getDataCarrefour = async (req, res) => {
    try {
        const urls = [
            'https://www.carrefour.es/supermercado/perfumeria-e-higiene/bano-e-higiene-corporal/desodorantes/cat20206/c',
            'https://www.carrefour.es/supermercado/perfumeria-e-higiene/cabello/champus/cat20222/c'
            
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
            'https://www.ahorramas.com/buscador?q=desodorante&search-button=&lang=null',
            'https://www.ahorramas.com/cuidado-personal/cuidado-del-cabello/champu/?pmin=0.01&q=champu&start=0&sz=12'
        ];

        // Pasar todas las URLs como un solo array a la función scrapeDataWithPuppeteer
        const scrapedDataJSON = await scrapeDataWithPuppeteer(urls);
        
        res.json(scrapedDataJSON);

    } catch (error) {
        console.error('Error al obtener los datos raspados con Puppeteer:', error);
        res.status(500).json({ error: 'Error al obtener los datos raspados' });
    }
};

module.exports = {getDataCarrefour, getDataAhorramas};


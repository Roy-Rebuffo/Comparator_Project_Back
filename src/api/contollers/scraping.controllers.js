const scrapeData = require('../../utils/scraping/scrapeCarrefour');
const scrapeDataWithPuppeteer = require('../../utils/scraping/scrapeAhorramas');

const getData = async (req, res) => {
    try {
        const urls = [
            'https://www.carrefour.es/supermercado/perfumeria-e-higiene/bano-e-higiene-corporal/desodorantes/cat20206/c',
            'https://www.carrefour.es/supermercado/perfumeria-e-higiene/cabello/champus/cat20222/c'
            
        ];

        // Realizar múltiples solicitudes al mismo tiempo
        const scrapingPromises = urls.map(url => scrapeData(url));

        // Esperar a que todas las solicitudes de datos se completen
        const scrapedDataJSON = await Promise.all(scrapingPromises);
        
        // Enviar los datos JSON como respuesta
        res.json(scrapedDataJSON[0]);

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

module.exports = {getData, getDataAhorramas};


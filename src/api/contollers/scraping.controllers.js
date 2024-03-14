const scrapeData = require('../../utils/scraping/scrapeCarrefour');

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

const getDataAlcampo = async (req, res) => {
    try {
        const urls = [
            'https://www.ahorramas.com/buscador?q=desodorante&search-button=&lang=null',
            
        ];

        // Realizar múltiples solicitudes al mismo tiempo
        const scrapingPromises = urls.map(url => scrapeData(url));

        // Esperar a que todas las solicitudes de datos se completen
        const scrapedData = await Promise.all(scrapingPromises);
        
        // Enviar los datos JSON como respuesta
        res.json(scrapedData);

    } catch (error) {
        console.error('Error al obtener los datos raspados:', error);
        res.status(500).json({ error: 'Error al obtener los datos raspados' });
    }
};

module.exports = {getData, getDataAlcampo};

//no funciona el alcampo
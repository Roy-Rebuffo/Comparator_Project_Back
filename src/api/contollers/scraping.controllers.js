const scrapeDataCarrefour= require('../../utils/scraping/scrapeCarrefour');
const scrapeDataWithPuppeteer = require('../../utils/scraping/scrapeAhorramas');

const getDataCarrefour = async (req, res) => {
    try {
        const urls = [
            // 'https://www.carrefour.es/supermercado/perfumeria-e-higiene/bano-e-higiene-corporal/desodorantes/cat20206/c?q=desodorantes&scroll=VC4AECOMM-668822',
            'https://www.carrefour.es/?gad_source=1&gclid=CjwKCAjwkuqvBhAQEiwA65XxQNiLwDgetnVFFmk-XCYBpDvsIFWcv0zYazLtBwZuODURGf1dVBrvjhoCEGwQAvD_BwE&gclsrc=aw.ds&q=champu+hs&scroll=VC4AECOMM-336877',
            // 'https://www.carrefour.es/supermercado/perfumeria-e-higiene-promocion/F-107gZ13rjo/c?q=Gel+de+ba%C3%B1o&page=2&scroll=VC4AECOMM-623671'
            // 'https://www.carrefour.es/supermercado/perfumeria-e-higiene/bano-e-higiene-corporal/cat20028/c?q=ba%C3%B1o+e+higiene+corporal&scroll=VC4AECOMM-478334',
            // 'https://www.carrefour.es/supermercado?q=refrescos&scroll=0000740000'
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
            'https://www.ahorramas.com/cuidado-personal/cuidado-del-cabello/champu/?pmin=0.01&q=champu&start=0&sz=12',
            // 'https://www.ahorramas.com/bebidas/refrescos/'
            
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


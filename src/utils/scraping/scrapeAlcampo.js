const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeData(url) {
    try {
        const headersList = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        ];

        const productsData = []; // Array para almacenar los datos de los productos

        for (const userAgent of headersList) {
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': userAgent
                }
            });

            const html = response.data;
            const $ = cheerio.load(html);

            $('.product-tile').each((index, element) => {
                const product = $(element);

                // Extarer título
                const title = product.find('.product-name-gtm').text().trim();

                // Extarer precio
                const price = product.find('.tile-body price value').text().trim();

                // Extarer imagen
                const image = product.find('.tile-image').attr('src');

                // Crear un objeto con los datos del producto
                const productObj = {
                    title: title,
                    price: price,
                    image: image
                };
                // Agregar el objeto del producto al array de datos de productos

                productsData.push(productObj);
            });
        }

        return productsData;

    } catch (error) {
        console.error('Error al obtener el HTML:', error);
        return ({ error: 'Error al obtener los datos' });
    }
}


module.exports = scrapeData;


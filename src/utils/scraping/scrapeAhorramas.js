const puppeteer = require('puppeteer');


async function scrapeDataWithPuppeteer(urls) {
    const browser = await puppeteer.launch();
    const productsData = [];

    try {
        await Promise.all(urls.map(async (url) => {
            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            
            // Esperamos la carga de la página
            await page.waitForNetworkIdle();

            // Aceptar cookies si aparece el botón
            let buttonAcceptCookies = await page.$('#onetrust-accept-btn-handler');
            if (buttonAcceptCookies) {
                await buttonAcceptCookies.click();
                await page.waitForNetworkIdle();
            }

            // Hacemos click en el botón "Más resultados" hasta que no haya más
            let buttonMore = await page.$('button.more');
            while (buttonMore) {
                await buttonMore.click();
                await page.waitForNetworkIdle();
                buttonMore = await page.$('button.more');
            }

            const products = await page.evaluate(() => {
                const products = Array.from(document.querySelectorAll('.product-tile'));

                return products.map(product => {
                    const title = product.querySelector('.product-name-gtm').textContent.trim();
                    const price = product.querySelector('.price .sales .value').textContent.trim();
                    const image = product.querySelector('.tile-image').getAttribute('src');

                    return {
                        title,
                        price,
                        image,
                        supermarket: "Ahorramas"
                    };
                });
            });

            productsData.push(...products);

            await page.close();
        }));

        return productsData;

    } catch (error) {
        console.error('Error al obtener los datos con Puppeteer:', error);
        return { error: 'Error al obtener los datos' };

    } finally {
        await browser.close();
    }
}


module.exports = scrapeDataWithPuppeteer;









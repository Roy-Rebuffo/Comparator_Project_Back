const puppeteer = require('puppeteer');


async function scrapeDataWithPuppeteer(urls) {
    const browser = await puppeteer.launch();
    const productsData = [];

    try {
        await Promise.all(urls.map(async (url) => {
            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
            await page.goto(url, { waitUntil: 'domcontentloaded' });

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
                        supermarket: "ahorramas"
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

// const puppeteer = require('puppeteer');

// async function scrapeDataWithPuppeteer(urls) {
//     const browser = await puppeteer.launch({ headless: false }); // Aquí se establece headless en false para abrir el navegador con interfaz gráfica
//     const productsData = [];

//     async function navigateToNextPage(page) {
//         const nextButton = await page.$('button.more');
//         if (nextButton) {
//             await nextButton.click();
//             await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
//             return true;
//         } else {
//             return false;
//         }
//     }

//     try {
//         for (const url of urls) {
//             const page = await browser.newPage();
//             await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
//             await page.goto(url, { waitUntil: 'domcontentloaded' });

//             let nextPageExists = true;
//             while (nextPageExists) {
//                 const products = await page.evaluate(() => {
//                     const products = Array.from(document.querySelectorAll('.product-tile'));

//                     return products.map(product => {
//                         const title = product.querySelector('.product-name-gtm').textContent.trim();
//                         const price = product.querySelector('.price .sales .value').textContent.trim();
//                         const image = product.querySelector('.tile-image').getAttribute('src');

//                         return {
//                             title,
//                             price,
//                             image,
//                             supermarket: "ahorramas"
//                         };
//                     });
//                 });

//                 productsData.push(...products);

//                 nextPageExists = await navigateToNextPage(page);
//             }

//             await page.close();
//         }

//         return productsData;

//     } catch (error) {
//         console.error('Error al obtener los datos con Puppeteer:', error);
//         return { error: 'Error al obtener los datos' };

//     } finally {
//         await browser.close();
//     }
// }

// module.exports = scrapeDataWithPuppeteer;





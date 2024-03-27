const puppeteer = require('puppeteer');

async function scrapeDataCarrefour(urls) {
  const browser = await puppeteer.launch();
  const productsData = [];

  try {
    await Promise.all(
      urls.map(async (url) => {
        const page = await browser.newPage();
        await page.setUserAgent(
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        );
        /*
        await page.setRequestInterception(true);
        page.on('request', (request) => {
          if (
            request.resourceType() === 'stylesheet' ||
            request.resourceType() === 'font'
          ) {
            request.abort();
          } else {
            request.continue();
          }
        });
*/
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // Espero a que cargue la página. Los elementos que necesito son dinámicos
        await page.waitForNetworkIdle();

        // Función para hacer scroll en la página
        async function scrollDown() {
          await page.evaluate(() => {
            // El elemento con la clase ebx-scroll es el que tiene el scroll
            const scroll = document.querySelector('.ebx-scroll');
            scroll.scrollBy(0, scroll.scrollHeight);
          });
        }

        // Hago scroll en la página
        // Usamos tryCount para reintentar el scroll si no se cargan más productos
        let tryCount = 0;

        // Incializo el total de productos y el nuevo total de productos
        let totalProducts = 0;
        let newTotalProducts = (await page.$$('.article-citrus')).length;

        // Mientras el total de productos sea distinto al nuevo total de productos
        while (totalProducts !== newTotalProducts || tryCount < 3) {

          // Hago scroll
          await scrollDown();

          // Espero a que cargue la página. Los elementos que necesito son dinámicos
          await page.waitForNetworkIdle();

          // Obtengo los productos
          const products = await page.$$('.article-citrus');

          // Hago hover en el último lote de productos cargados en el scroll para que se carguen todas sus propiedades al DOM
          for (let i = totalProducts; i < products.length; i++) {
            await products[i].hover();
          }

          // Actualizo el total de productos
          totalProducts = newTotalProducts;

          // Calculo el nuevo total de productos
          newTotalProducts = products.length;

          // Si el total de productos es igual al nuevo total de productos, incremento tryCount,
          // si no, lo reinicio a 0
          totalProducts === newTotalProducts ? tryCount++ : (tryCount = 0);
        }

        // Espero a que cargue la página. Los elementos que necesito son dinámicos
        await page.waitForNetworkIdle();

        const products = await page.evaluate(() => {
          const products = Array.from(
            document.querySelectorAll('.article-citrus')
          );
          return products.map((product) => {
            const title = product
              .querySelector('.ebx-result__title')
              .textContent.trim();
            const price = product
              .querySelector('.ebx-result-price__value')
              .textContent.trim();
            const image = product.querySelector('img')
              ? product.querySelector('img').getAttribute('src')
              : 'no se encontró la imagen';
            return {
              title,
              price,
              image,
              supermarket: 'carrefour',
            };
          });
        });

        productsData.push(...products);

        await page.close();
      })
    );

    return productsData;
  } catch (error) {
    console.error('Error al obtener los datos con Puppeteer:', error);
    return { error: 'Error al obtener los datos' };
  } finally {
    console.log('ready');
    await browser.close();
  }
}

module.exports = scrapeDataCarrefour;

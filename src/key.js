const publicKeyProd =
  'pk_live_51Huk90BbDeRYiB9tviB7TIaYaMB0uYOyK7wIPE6Q4LNOhuSyJTY7rxW9M30YFkIOp2RDOngiLmGnp5uBh00EirHF00tQNCRo3i';
const publicKeyDev =
  'pk_test_51PNcn6RrQfUQC5MYaOchK1YrrDtBrxRDbyzQ2rfUIw7QhiIPmOU0vLYBq17pyMSQKAw99bqVnmeYGELIq2KOncST00ysRkRCO0';
const url = 'https://iqmazestripe-myfirst27.amvera.io';
const urlDev = 'https://stripeiq-frantunn.amvera.io';
const urlLocal = 'http://localhost:4242';

const priceIdProd = 'price_1PQ8NfBbDeRYiB9tRjkx9Mcf';
const priceIdDev = 'price_1PQBhPRrQfUQC5MYqbQ7MyWh';

const currentUrl = window.location.href;

const publicKey = currentUrl.includes('iq-check140')
  ? publicKeyProd
  : publicKeyDev;

const priceId = currentUrl.includes('iq-check140') ? priceIdProd : priceIdDev;

const apiUrl = currentUrl.includes('iq-check140')
  ? url
  : currentUrl.includes('localhost')
  ? urlLocal
  : urlDev;

export { publicKey, priceId, apiUrl };

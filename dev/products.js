var faker = require("faker");
var products = [];

for (var i = 0; i < 1000 * 1000; i++) {
    products.push({
        sku: i,
        upc: i + 2,
        mpn: i + 10,
        brand: faker.company.companyName(),
        name: faker.commerce.productName()
    });
}

console.log(products);

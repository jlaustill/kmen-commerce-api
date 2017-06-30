const path = require("path");
global.__appRoot = path.normalize(__dirname + "/../..");
const
    environment = require(__appRoot + "/config/environment.js"),
    faker = require("faker"),
    Product = require(__appRoot + "/v1/models/productModel.js"),
    MongoClient = require("mongodb").MongoClient,
    products = [];

MongoClient.connect(environment.connectionString, function (err, db) {
    "use strict";
    // assert.equal(null, err);

    for (let i = 0; i < 1000; i++) {
        let product = new Product({
            sku: i,
            name: faker.commerce.productName()
        });

        console.log(product.asJSON());
        products.push(
            db
                .db(environment.database)
                .collection("products")
                .insertOne(product.asJSON())
        );
    }

    Promise.all(products).then(() => {
        db.close();
    })


}); //MongoClient.connect
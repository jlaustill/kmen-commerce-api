"use strict";

const path = require("path");
const __appRoot = path.normalize(__dirname + "/../..");
const
    environment = require(__appRoot + "/config/environment.js"),
    faker = require("faker"),
    Product = require(__appRoot + "/v1/models/productModel.js"),
    MongoClient = require("mongodb").MongoClient,
    products = [];

function getStores () {
    let results = [];
    let selection = ["Store", "FlyShop", "Plumbers Stuff"];
    let numberOfStores = faker.random.number({ min: 1, max: selection.length - 1 });

    for (let i = 0; i < numberOfStores; i++) {
        let store =faker.random.arrayElement(selection);

        if (results.indexOf(store) === -1) {
            results.push(store);
        }
    }

    return results;
}

function getImages() {
    let results = [];
    let numberOfImages = faker.random.number({min: 1, max:10});

    for (let i = 0; i < numberOfImages; i++) {
        results.push(faker.image.imageUrl(300,300));
    }

    return results;
}

MongoClient.connect(environment.connectionString, function (err, db) {
    // assert.equal(null, err);
    db
        .db(environment.database)
        .collection("products")
        .drop();

    for (let i = 0; i < 1000; i++) {
        let product = new Product({
            sku: i,
            name: faker.commerce.productName(),
            websites: getStores(),
            images: getImages()
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
    });


}); //MongoClient.connect
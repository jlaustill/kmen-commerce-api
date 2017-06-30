/** global: require**/
/**
 * Created by Joshua Austill on 3/2/2017.
 */

// create the Product Model
const productModel = function (product) {
    let self = this;
    product = product || {};
    product.date = product.date || {};

    self.sku = product.sku;
    self.name = product.name;
    self.date = {
        updated: product.date.updated || new Date(),
        created: new Date()
    };
    self.websites = product.websites;
    self.images = product.images;

    self.asJSON = function () {
        self.date.updated = new Date();
        return {
            sku: self.sku.toString(),
            name: self.name.toString(),
            date: {
                updated: self.date.updated,
                created: self.date.created
            },
            websites: self.websites,
            images: self.images
        };
    }
};

// make this available to our users in our Node applications
module.exports = productModel;
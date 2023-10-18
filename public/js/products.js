
const products = [];

function getProducts() {
    return products;
}

function addProduct(newProduct) {
    products.push(newProduct);
}

module.exports = {
    getProducts,
    addProduct,
};
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productID: String,
    productName: String,
    productImage: [
        {
            image:[String],
            image_URL: [String],  
            image_ALT: [String],
        },
        {
            image:[String],
            image_URL: [String],  
            image_ALT: [String],
        },
        {
            image:[String],
            image_URL: [String],  
            image_ALT: [String],
        },
        {
            image:[String],
            image_URL: [String],  
            image_ALT: [String],
        },
        {
            image:[String],
            image_URL: [String],  
            image_ALT: [String],
        },
    ],
    productPrice: String,
    productAvailability: Boolean,
    productAvailableSizes: [String],
    productDescription: String,
    productMaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Maker',
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
const mongoose = require('mongoose');

const productMaker = new mongoose.Schema({
    makerName: String,
    makerLocation: String,
});

const Maker = mongoose.model('Maker', productMaker);

module.exports = Maker;
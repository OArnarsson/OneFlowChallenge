const mongoose = require('mongoose');

let SeriesSchema = new mongoose.Schema({});
let Series = mongoose.model('Series', SeriesSchema);

module.exports = {Series};
const moogose = require('mongoose');
const Schema = moogose.Schema;
const ObjectId = Schema.Types.ObjectId;


const html = new Schema({
    id: { type: String, index: true },
    htmlString: String
})

const Html = moogose.model('html', html)

module.exports = Html
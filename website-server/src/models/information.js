const moogose = require('mongoose');
const Schema = moogose.Schema;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema({
    id: { type: String, index: true },
    title: String,
    company: String,
    date: Date
})

const ListInformation = moogose.model('listInformation', messageSchema)

module.exports = ListInformation

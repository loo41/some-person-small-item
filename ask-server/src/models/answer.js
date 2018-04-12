const moogose = require('mongoose');
const Schema = moogose.Schema;
const ObjectId = Schema.Types.ObjectId;

const answer = new Schema({
    answer: {type: Array, default: []},
    askID: {type: String},
    ask: {type: ObjectId, ref: 'Ask'}
})

const Answer = moogose.model('answer', answer)

module.exports = Answer
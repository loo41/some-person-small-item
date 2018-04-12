const moogose = require('mongoose');
const Schema = moogose.Schema;
const ObjectId = Schema.Types.ObjectId;


const user = new Schema({
    id: { type: String, index: true },
    username: String,
    password: String
})

const User = moogose.model('user', user)

module.exports = User
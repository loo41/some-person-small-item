const moogose = require('mongoose');
const Schema = moogose.Schema;
const ObjectId = Schema.Types.ObjectId;

const client = new Schema({
    openid: {type: String, index: true},
    nickname: {type: String, index: true},
    sex: String,
    province: String,
    city: String,
    country: String,
    headimgurl: String,
    privilege: String,
    unionid: {type: String, default: 'null'}
})

const Client = moogose.model('client', client)

module.exports = Client
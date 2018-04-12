const moogose = require('mongoose');
const Schema = moogose.Schema;
const ObjectId = Schema.Types.ObjectId;


const userI = new Schema({
    id: { type: String, index: true },
    username: String,
    discription: String,
    avatar: String
})

const UserInformation = moogose.model('userInformation', userI)

module.exports = UserInformation
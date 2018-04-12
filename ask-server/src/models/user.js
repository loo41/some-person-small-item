const moogose = require('mongoose');
const Schema = moogose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * 
 * @param {username}     管理用户名字
 * @param {password}     管理用户密码
 * @param {sex}          管理用户性别
 * @param {grade}        管理用户等级
 * @param {discription}  管理用户描述
 * 
 * 
 */

const user = new Schema({
    username: String,
    password: String,
    sex: String,
    grade: Number,
    discription: String
})

const User = moogose.model('user', user)

module.exports = User
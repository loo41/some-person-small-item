const moogose = require('mongoose');
const Schema = moogose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * 
 * @param {id}           对应问卷id(外键)
 * @param {reword}       奖品设置({index: 0, rewordName: 'adad', rewordNumber: 100, rwordChance: 123})
 * @param {noreword}     谢谢参与数量
 * @param {awardAddress} 领奖地址
 * 
 */

const reword = new Schema({
    askID: {type: String},
    reword: Array,
    noreword: Number,
    awardAddress: String,
    isSetReword: {type: Boolean, default: false}
})

const Reword = moogose.model('reword', reword)

module.exports = Reword
const moogose = require('mongoose');
const Schema = moogose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * @param {lotteryDraw} 抽奖次数
 * @param {rewordData}  分数信息
 * @param {winNotes}    获奖记录
 * 
 */

const note = new Schema({
    openid: {type: String, index: true},
    state: {type: String, index: true},
    expireTime: {type: String},
    lotteryDraw: {type: Number, default: 0},
    rewordData: {type: Array, default: []},
    winNotes: {type: Array, default: []}
})

const Note = moogose.model('note', note)

module.exports = Note